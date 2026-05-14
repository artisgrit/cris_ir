import {
  Inject,
  Injectable,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  APP_CONFIG,
  AppConfig,
} from '../../../config/app-config.interface';
import { FileService } from '../../core/shared/file.service';
import { URLCombiner } from '../../core/url-combiner/url-combiner';

@Injectable({ providedIn: 'root' })
export class PdfViewerService {
  constructor(
    private sanitizer: DomSanitizer,
    private fileService: FileService,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {}

  /**
   * Convert a UI bitstream download route to the REST API "content" endpoint so that PDFs can be rendered inline.
   *
   * Example:
   * `/bitstreams/<uuid>/download?accessToken=...` -> `<rest.baseUrl>/api/core/bitstreams/<uuid>/content?accessToken=...`
   */
  toApiContentUrl(url: string): string {
    const match = url.match(/\/bitstreams\/([^/]+)\/download(\?.*)?$/);
    if (!match) {
      return this.toAbsoluteRestUrl(url);
    }
    const uuid = match[1];
    const query = match[2] ?? '';
    const base = new URLCombiner(
      this.appConfig.rest.baseUrl,
      this.appConfig.rest.nameSpace,
      'core/bitstreams',
      uuid,
      'content',
    ).toString();
    return `${base}${query}`;
  }

  /**
   * Ensure REST URLs are absolute so they work when UI and REST are on different origins.
   */
  private toAbsoluteRestUrl(url: string): string {
    if (!url) {
      return url;
    }
    // Already absolute
    if (/^https?:\/\//i.test(url)) {
      return url;
    }
    if (!this.appConfig?.rest?.baseUrl) {
      return url;
    }
    // Convert legacy relative REST URLs to absolute, e.g.:
    // `/server/api/core/...` or `server/api/core/...` -> `${rest.baseUrl}/api/core/...`
    const normalized = url.startsWith('/') ? url : `/${url}`;
    const serverApiPrefix = '/server/api/';
    if (normalized.startsWith(serverApiPrefix)) {
      const restPath = normalized.substring('/server'.length); // `/api/...`
      return new URLCombiner(this.appConfig.rest.baseUrl, restPath).toString();
    }
    // Generic relative path: treat as relative to REST base
    return new URLCombiner(this.appConfig.rest.baseUrl, normalized).toString();
  }

  toSafePdfUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.toAbsoluteRestUrl(url));
  }

  /**
   * Adds a short-lived auth token (when available) and returns a SafeResourceUrl for embedding.
   */
  toSafePdfUrlWithAuth(url: string): Observable<SafeResourceUrl> {
    return this.fileService.retrieveFileDownloadLink(url).pipe(
      map((resolved) => this.toSafePdfUrl(this.toAbsoluteRestUrl(resolved))),
    );
  }
}
