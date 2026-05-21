import { Router } from 'express';

import { fakeDemoRedisCache } from './cache';
import BITSTREAMS from './data/bitstreams.json';
import BUNDLES from './data/bundles.json';
import COLLECTIONS from './data/collections.json';
import COMMUNITIES from './data/communities.json';
import ITEMS from './data/items.json';
import { fakeDataBase } from './db';

// you would use cookies/token etc
const USER_ID = 'f9d98cf1-1b96-464e-8755-bcc2a5c09077'; // hardcoded as an example

// Our API for demos only
export function serverApi(req, res) {
  const key = USER_ID + '/data.json';
  const cache = fakeDemoRedisCache.get(key);
  if (cache !== undefined) {
    console.log('/data.json Cache Hit');
    return res.json(cache);
  }
  console.log('/data.json Cache Miss');

  fakeDataBase.get()
    .then((data) => {
      fakeDemoRedisCache.set(key, data);
      return data;
    })
    .then((data) => res.json(data));
}

function toHALResponse(req, data, included?) {
  const result = {
    _embedded: data,
    _links: {
      self: req.protocol + '://' + req.get('host') + req.originalUrl,
    },
  };
  if (included && Array.isArray(included) && included.length > 0) {
    Object.assign(result, {
      included: included,
    });
  }
  return result;
}

export function createMockApi() {

  // Helper: derive a simple access status for an item from available data
  function deriveAccessStatus(item) {
    try {
      // 1. If any bitstream in any bundle has a public `url` or a `retrieve` link -> Open Access
      if (item && item._embedded && Array.isArray(item._embedded.bundles)) {
        for (const bundle of item._embedded.bundles) {
          if (bundle && bundle._embedded && Array.isArray(bundle._embedded.bitstreams)) {
            for (const bs of bundle._embedded.bitstreams) {
              // bitstream may have a `url` or `retrieve` in its links
              if (bs.url || (bs._links && bs._links.retrieve)) {
                return 'open access';
              }
            }
          }
        }
      }

      // 2. Fall back to collection-level rights text: if it contains 'rights reserved' assume restricted
      if (item && item._embedded && Array.isArray(item._embedded.parents)) {
        for (const parent of item._embedded.parents) {
          if (parent && Array.isArray(parent.metadata)) {
            const rights = parent.metadata.find((m) => m.key === 'dc.rights');
            if (rights && typeof rights.value === 'string') {
              const txt = rights.value.toLowerCase();
              if (txt.includes('all rights reserved') || txt.includes('rights reserved')) {
                return 'restricted access';
              }
            }
          }
        }
      }

      // 3. Default to unknown
      return 'unknown';
    } catch (e) {
      return 'unknown';
    }
  }

  function ensureAccessMetadataOnItem(item) {
    if (!item) return item;
    const status = deriveAccessStatus(item);
    if (!Array.isArray(item.metadata)) item.metadata = [];
    const existingIndex = item.metadata.findIndex((m) => m.key === 'dc.rights.access');
    const entry = { key: 'dc.rights.access', value: status, language: null };
    if (existingIndex >= 0) {
      item.metadata[existingIndex] = entry;
    } else {
      item.metadata.push(entry);
    }
    return item;
  }

  function ensureAccessStatusLinkOnItem(item) {
    if (!item || !item._links) {
      return item;
    }
    item._links.accessStatus = {
      href: `/items/${item.id}/accessStatus`,
    };
    return item;
  }

  function enrichItem(item) {
    if (!item) {
      return item;
    }
    ensureAccessMetadataOnItem(item);
    ensureAccessStatusLinkOnItem(item);
    return item;
  }

  function createAccessStatusObject(item) {
    const status = deriveAccessStatus(item);
    return {
      type: { value: 'accessStatus' },
      status,
      embargoDate: null,
      _links: {
        self: {
          href: `/items/${item.id}/accessStatus`,
        },
      },
    };
  }

  const router = Router();

  router.route('/communities').get((req, res) => {
    console.log('GET');
    // 70ms latency
    setTimeout(() => {
      res.json(toHALResponse(req, COMMUNITIES));
    }, 0);
  });

  router.param('community_id', (req, res, next, communityId) => {
    // ensure correct prop type
    const id = req.params.community_id;
    try {
      req.community_id = id;
      req.community = COMMUNITIES.communities.find((community) => {
        return community.id === id;
      });
      next();
    } catch (e) {
      next(new Error('failed to load community'));
    }
  });

  router.route('/communities/:community_id').get((req, res) => {
    res.json(toHALResponse(req, req.community));
  });

  router.route('/collections').get((req, res) => {
    console.log('GET');
    // 70ms latency
    setTimeout(() => {
      res.json(toHALResponse(req, COLLECTIONS));
    }, 0);
  });

  router.param('collection_id', (req, res, next, collectionId) => {
    // ensure correct prop type
    const id = req.params.collection_id;
    try {
      req.collection_id = id;
      req.collection = COLLECTIONS.collections.find((collection) => {
        return collection.id === id;
      });
      next();
    } catch (e) {
      next(new Error('failed to load collection'));
    }
  });

  router.route('/collections/:collection_id').get((req, res) => {
    res.json(toHALResponse(req, req.collection));
  });

  router.route('/items').get((req, res) => {
    console.log('GET');
    // 70ms latency
    setTimeout(() => {
      // Do not mutate original ITEMS; create a deep copy and enrich metadata and HAL links
      try {
        const enriched = JSON.parse(JSON.stringify(ITEMS));
        if (enriched && Array.isArray(enriched.items)) {
          enriched.items = enriched.items.map((it) => enrichItem(it));
        }
        res.json(toHALResponse(req, enriched));
      } catch (e) {
        res.json(toHALResponse(req, ITEMS));
      }
    }, 0);
  });

  router.param('item_id', (req, res, next, itemId) => {
    // ensure correct prop type
    const id = req.params.item_id;
    try {
      req.item_id = id;
      req.itemRD$ = ITEMS.items.find((item) => {
        return item.id === id;
      });
      next();
    } catch (e) {
      next(new Error('failed to load item'));
    }
  });

  router.route('/items/:item_id').get((req, res) => {
    try {
      const itemCopy = JSON.parse(JSON.stringify(req.itemRD$));
      enrichItem(itemCopy);
      res.json(toHALResponse(req, itemCopy));
    } catch (e) {
      res.json(toHALResponse(req, req.itemRD$));
    }
  });

  router.route('/items/:item_id/accessStatus').get((req, res) => {
    const item = req.itemRD$;
    if (!item) {
      return res.status(404).json({ status: 404, message: 'Item not found' });
    }
    const accessStatus = createAccessStatusObject(item);
    res.json(toHALResponse(req, accessStatus));
  });

  router.route('/bundles').get((req, res) => {
    console.log('GET');
    // 70ms latency
    setTimeout(() => {
      res.json(toHALResponse(req, BUNDLES));
    }, 0);
  });

  router.param('bundle_id', (req, res, next, bundleId) => {
    // ensure correct prop type
    const id = req.params.bundle_id;
    try {
      req.bundle_id = id;
      req.bundle = BUNDLES.bundles.find((bundle) => {
        return bundle.id === id;
      });
      next();
    } catch (e) {
      next(new Error('failed to load item'));
    }
  });

  router.route('/bundles/:bundle_id').get((req, res) => {
    // console.log('GET', util.inspect(req.bundle, { colors: true }));
    res.json(toHALResponse(req, req.bundle));
  });

  router.route('/bitstreams').get((req, res) => {
    console.log('GET');
    // 70ms latency
    setTimeout(() => {
      res.json(toHALResponse(req, BITSTREAMS));
    }, 0);
  });

  router.param('bitstream_id', (req, res, next, bitstreamId) => {
    // ensure correct prop type
    const id = req.params.bitstream_id;
    try {
      req.bitstream_id = id;
      req.bitstream = BITSTREAMS.bitstreams.find((bitstream) => {
        return bitstream.id === id;
      });
      next();
    } catch (e) {
      next(new Error('failed to load item'));
    }
  });

  router.route('/bitstreams/:bitstream_id').get((req, res) => {
    // console.log('GET', util.inspect(req.bitstream, { colors: true }));
    res.json(toHALResponse(req, req.bitstream));
  });

  return router;
}
