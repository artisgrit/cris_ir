import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import {
  NgbDropdown,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { ThemedLangSwitchComponent } from 'src/app/shared/lang-switch/themed-lang-switch.component';
import {
  filter,
  takeUntil,
} from 'rxjs/operators';

import { ContextHelpToggleComponent } from '../../../../app/header/context-help-toggle/context-help-toggle.component';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';
import { ThemedNavbarComponent } from '../../../../app/navbar/themed-navbar.component';
import { ThemedSearchNavbarComponent } from '../../../../app/search-navbar/themed-search-navbar.component';
import { ThemedAuthNavMenuComponent } from '../../../../app/shared/auth-nav-menu/themed-auth-nav-menu.component';
import { ImpersonateNavbarComponent } from '../../../../app/shared/impersonate-navbar/impersonate-navbar.component';
import { MenuService } from '../../../../app/shared/menu/menu.service';
import { HostWindowService } from '../../../../app/shared/host-window.service';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-themed-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
  imports: [
    ContextHelpToggleComponent,
    ImpersonateNavbarComponent,
    NgbDropdownModule,
    RouterLink,
    ThemedAuthNavMenuComponent,
    ThemedLangSwitchComponent,
    ThemedNavbarComponent,
    ThemedSearchNavbarComponent,
    TranslateModule,
  ],
})
export class HeaderComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private autoCloseTimeoutId?: ReturnType<typeof setTimeout>;

  @ViewChild('navMenu') navMenu?: NgbDropdown;

  constructor(
    protected menuService: MenuService,
    protected windowService: HostWindowService,
    protected router: Router,
  ) {
    super(menuService, windowService);
  }

  ngOnInit() {
    super.ngOnInit();

    // Close the dropdown menu after any navigation that was triggered from within it
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.navMenu?.close();
    });
  }

  ngAfterViewInit(): void {
    // Auto-close the dropdown menu after 2 seconds when opened
    this.navMenu?.openChange?.pipe(
      takeUntil(this.destroy$),
    ).subscribe((isOpen: boolean) => {
      if (this.autoCloseTimeoutId) {
        clearTimeout(this.autoCloseTimeoutId);
        this.autoCloseTimeoutId = undefined;
      }
      if (isOpen) {
        this.autoCloseTimeoutId = setTimeout(() => {
          this.navMenu?.close();
        }, 2000);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.autoCloseTimeoutId) {
      clearTimeout(this.autoCloseTimeoutId);
      this.autoCloseTimeoutId = undefined;
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
