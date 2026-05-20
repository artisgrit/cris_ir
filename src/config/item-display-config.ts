// ============================================================================
// FRONTEND ITEM DISPLAY CONFIGURATION
// Configuration for displaying access status badges and item type labels
// on item detail pages and item lists
// ============================================================================

/**
 * ACCESS STATUS BADGE CONFIGURATION
 * Maps access status metadata values to badge display properties
 * Place this in src/config/default-app-config.ts or separate config file
 */

export const accessStatusBadgeConfig = {
  // Access status to badge appearance mapping
  statusMapping: {
    'open access': {
      label: 'Open Access',
      badgeClass: 'badge-success',
      icon: 'fa-unlock',
      color: '#28a745',
      priority: 1
    },
    'embargoed': {
      label: 'Embargoed',
      badgeClass: 'badge-warning',
      icon: 'fa-hourglass-end',
      color: '#ffc107',
      priority: 2
    },
    'published': {
      label: 'Published',
      badgeClass: 'badge-info',
      icon: 'fa-check-circle',
      color: '#17a2b8',
      priority: 3
    },
    'peer reviewed': {
      label: 'Peer Reviewed',
      badgeClass: 'badge-primary',
      icon: 'fa-certificate',
      color: '#007bff',
      priority: 4
    },
    'post-print': {
      label: 'Post-Print',
      badgeClass: 'badge-secondary',
      icon: 'fa-print',
      color: '#6c757d',
      priority: 5
    },
    'pre-print': {
      label: 'Pre-Print',
      badgeClass: 'badge-light',
      icon: 'fa-file-text',
      color: '#e9ecef',
      priority: 6
    },
    'controlled access': {
      label: 'Controlled Access',
      badgeClass: 'badge-danger',
      icon: 'fa-lock',
      color: '#dc3545',
      priority: 7
    },
    'restricted access': {
      label: 'Restricted Access',
      badgeClass: 'badge-dark',
      icon: 'fa-ban',
      color: '#343a40',
      priority: 8
    },
    'restricted': {
      label: 'Restricted',
      badgeClass: 'badge-dark',
      icon: 'fa-ban',
      color: '#343a40',
      priority: 8
    },
    'metadata only': {
      label: 'Metadata Only',
      badgeClass: 'badge-secondary',
      icon: 'fa-info-circle',
      color: '#6c757d',
      priority: 9
    },
    'indefinitely restricted': {
      label: 'Indefinitely Restricted',
      badgeClass: 'badge-dark',
      icon: 'fa-lock-open',
      color: '#343a40',
      priority: 10
    },
    'closed access': {
      label: 'Closed Access',
      badgeClass: 'badge-dark',
      icon: 'fa-lock',
      color: '#343a40',
      priority: 11
    },
    'unknown': {
      label: 'Unknown',
      badgeClass: 'badge-secondary',
      icon: 'fa-question-circle',
      color: '#6c757d',
      priority: 12
    }
  },

  // Item type to label and icon mapping
  itemTypeMapping: {
    'bookchapter': {
      label: 'Book Chapter',
      icon: 'fa-book',
      color: '#8b4513'
    },
    'book': {
      label: 'Book',
      icon: 'fa-book',
      color: '#4b0082'
    },
    'mastersdissertation': {
      label: 'Masters Dissertation',
      icon: 'fa-graduation-cap',
      color: '#1f77b4'
    },
    'phdthesis': {
      label: 'PhD Thesis',
      icon: 'fa-graduation-cap',
      color: '#ff7f0e'
    },
    'article': {
      label: 'Article',
      icon: 'fa-file-text',
      color: '#2ca02c'
    },
    'dataset': {
      label: 'Dataset',
      icon: 'fa-database',
      color: '#d62728'
    }
  },

  // Multiple access statuses can be displayed (e.g., both "Open Access" AND "Peer Reviewed")
  displayMultiple: true,

  // Sort badges by priority (lower number = higher priority/displayed first)
  sortByPriority: true,

  // CSS classes for badge styling
  badgeClasses: {
    container: 'access-status-badges',
    badge: 'badge',
    separator: 'badge-separator'
  }
};

/**
 * ITEM LIST CONFIGURATION
 * Controls how items are displayed in search results and browse views
 */

export const itemListDisplayConfig = {
  // Show access status badges on item lists
  showAccessStatusBadges: true,

  // Show item type label on item lists
  showItemType: true,

  // Item type label placement: 'before-title' or 'after-title'
  itemTypePlacement: 'before-title',

  // Show multiple metadata fields
  displayFields: [
    'dc.title',
    'dc.creator',
    'dc.issued',
    'dc.description.abstract',
    'dc.rights.access'
  ],

  // Truncate abstract/description at this many characters
  truncateAbstract: 150
};

/**
 * ITEM DETAIL PAGE CONFIGURATION
 * Controls layout and display on full item view page
 */

export const itemDetailDisplayConfig = {
  // Display access status prominently at top of page
  displayAccessStatusProminently: true,

  // Section to display access status: 'hero' (large) or 'header' (inline)
  accessStatusDisplay: 'hero',

  // Show item type badge
  showItemTypeBadge: true,

  // Display access status metadata section
  showAccessStatusSection: true,

  // Metadata fields to display in main details section
  mainMetadataFields: [
    'dc.title',
    'dc.creator',
    'dc.contributor',
    'dc.issued',
    'dc.publisher',
    'dc.identifier',
    'dc.description.abstract',
    'dc.subject',
    'dc.language',
    'dc.rights.access'
  ]
};

/**
 * DISCOVERY CONFIGURATION FOR NEW ENTITIES
 * Add to src/config/default-app-config.ts discovery section
 */

export const discoveryConfiguration = {
  search: [
    {
      // Configuration key to reference in components
      name: 'theses',

      // Discovery index configuration name
      configurationName: 'RELATION.theses',

      // Translation key for label
      label: 'discover.search.filter.type.theses',

      // Icon for this entity type
      icon: 'fa-graduation-cap',

      // Sort configuration
      defaultSort: 'dc.issued',

      // Results per page
      defaultRpp: 20,

      // Search filters to show
      filters: ['dateIssued', 'author', 'language', 'subject']
    },
    {
      name: 'bookchapter',
      configurationName: 'RELATION.bookchapter',
      label: 'discover.search.filter.type.bookchapter',
      icon: 'fa-book',
      defaultSort: 'dc.issued',
      defaultRpp: 20,
      filters: ['dateIssued', 'author', 'publisher', 'language']
    },
    {
      name: 'book',
      configurationName: 'RELATION.book',
      label: 'discover.search.filter.type.book',
      icon: 'fa-book',
      defaultSort: 'dc.issued',
      defaultRpp: 20,
      filters: ['dateIssued', 'author', 'publisher', 'language']
    },
    {
      name: 'researchoutputs',
      configurationName: 'RELATION.researchoutputs',
      label: 'discover.search.filter.type.publications',
      icon: 'fa-file-alt',
      defaultSort: 'dc.issued',
      defaultRpp: 20,
      filters: ['dateIssued', 'author', 'language']
    }
  ]
};

/**
 * ITEM COMPONENT IMPLEMENTATION GUIDE
 *
 * Create/update src/app/item-page/item-detail/item-detail.component.ts
 *
 * Key methods to implement:
 *
 * 1. getAccessStatusBadges(): Get access status values from metadata
 *    - Read dc.rights.access field from item
 *    - Map to badge configuration
 *    - Sort by priority if multiple statuses exist
 *
 * 2. getItemTypeLabel(): Get item type from submission form
 *    - Read item.type or metadata field indicating form type
 *    - Map to itemTypeMapping configuration
 *    - Return label and icon
 *
 * 3. displayBadge(status): Render individual badge
 *    - Apply CSS classes from configuration
 *    - Display icon and label
 *    - Use Bootstrap badge-* classes for styling
 *
 * Template structure for item detail page:
 *
 * <div class="item-detail-hero">
 *   <h1>{{ item.name }}</h1>
 *
 *   <!-- Item Type Badge -->
 *   <span class="item-type-badge" [ngClass]="itemTypeClass">
 *     <i [ngClass]="'fa ' + itemTypeIcon"></i>
 *     {{ itemTypeLabel }}
 *   </span>
 *
 *   <!-- Access Status Badges -->
 *   <div class="access-status-badges">
 *     <span *ngFor="let badge of accessStatusBadges"
 *           [class]="'badge ' + badge.badgeClass">
 *       <i [ngClass]="'fa ' + badge.icon"></i>
 *       {{ badge.label }}
 *     </span>
 *   </div>
 * </div>
 *
 * <div class="item-detail-metadata">
 *   <!-- Display dc.rights.access separately if needed -->
 *   <div class="metadata-section" *ngIf="item['dc.rights.access']">
 *     <h3>{{ 'item.page.detail.access-status' | translate }}</h3>
 *     <p>{{ item['dc.rights.access'][0].value }}</p>
 *   </div>
 * </div>
 */

/**
 * SEARCH RESULT COMPONENT IMPLEMENTATION GUIDE
 *
 * Create/update src/app/search/search-result/search-result.component.ts
 *
 * For each item in search results:
 *
 * 1. Extract access status from dc.rights.access metadata
 * 2. Map to badge appearance using accessStatusBadgeConfig
 * 3. Display badges next to item title or under item
 * 4. Show item type label in appropriate placement (before/after title)
 *
 * Template structure:
 *
 * <div class="search-result-item">
 *   <!-- Item Type Label (optional, if placement is 'before-title') -->
 *   <div class="item-type-label" *ngIf="showItemType && itemTypePlacement === 'before-title'">
 *     {{ itemTypeLabel }}
 *   </div>
 *
 *   <!-- Item Title -->
 *   <h3>
 *     <a [href]="item.url">{{ item.name }}</a>
 *
 *     <!-- Item Type Label (if placement is 'after-title') -->
 *     <span class="item-type-label" *ngIf="showItemType && itemTypePlacement === 'after-title'">
 *       ({{ itemTypeLabel }})
 *     </span>
 *   </h3>
 *
 *   <!-- Access Status Badges -->
 *   <div class="access-status-badges" *ngIf="showAccessStatusBadges">
 *     <span *ngFor="let badge of accessStatusBadges"
 *           [class]="'badge ' + badge.badgeClass">
 *       <i [ngClass]="'fa ' + badge.icon"></i>
 *       {{ badge.label }}
 *     </span>
 *   </div>
 *
 *   <!-- Item Metadata -->
 *   <p class="item-authors">{{ item.author }}</p>
 *   <p class="item-date">{{ item.date }}</p>
 * </div>
 */

/**
 * CSS STYLING GUIDE
 *
 * Add to src/styles/global.scss or item-detail.scss:
 *
 * .access-status-badges {
 *   display: flex;
 *   gap: 8px;
 *   margin: 12px 0;
 *   flex-wrap: wrap;
 * }
 *
 * .access-status-badges .badge {
 *   padding: 6px 12px;
 *   font-size: 12px;
 *   font-weight: 500;
 *   display: inline-flex;
 *   align-items: center;
 *   gap: 6px;
 *   border-radius: 4px;
 *
 *   i {
 *     margin-right: 4px;
 *   }
 * }
 *
 * .badge-success { background-color: #28a745; color: white; }
 * .badge-warning { background-color: #ffc107; color: #212529; }
 * .badge-info { background-color: #17a2b8; color: white; }
 * .badge-primary { background-color: #007bff; color: white; }
 * .badge-secondary { background-color: #6c757d; color: white; }
 * .badge-light { background-color: #e9ecef; color: #212529; }
 * .badge-danger { background-color: #dc3545; color: white; }
 * .badge-dark { background-color: #343a40; color: white; }
 *
 * .item-type-badge {
 *   display: inline-block;
 *   padding: 8px 16px;
 *   border-radius: 4px;
 *   background-color: #f8f9fa;
 *   border: 1px solid #dee2e6;
 *   margin-right: 8px;
 *   margin-bottom: 8px;
 *   font-size: 14px;
 * }
 */
