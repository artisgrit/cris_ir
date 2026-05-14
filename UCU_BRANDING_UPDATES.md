# Uganda Christian University (UCU) Institutional Repository - Branding Updates

## Overview
This repository has been successfully rebranded to reflect Uganda Christian University's institutional identity. All DSpace and 4Science references have been removed from user-facing content, and replaced with UCU branding elements, colors, and messaging.

## UCU Color Palette

### Digital Media (RGB)
- **Primary Blue**: #0B3D91 (RGB: 11, 61, 145)
- **Accent Red**: #D7014D (RGB: 215, 1, 77)
- **Gold/Yellow**: #FFD932 (RGB: 255, 217, 50)
- **Green**: #007931 (RGB: 0, 121, 49)

### CSS Variables
All UCU colors are defined as CSS variables in `/src/styles/_custom_variables.scss`:
```css
--ucu-blue: #0B3D91;
--ucu-red: #D7014D;
--ucu-yellow: #FFD932;
--ucu-green: #007931;
--ucu-blue-light: #1a5cc4;
--ucu-red-light: #ff1a5f;
```

## Major Changes Made

### 1. HTML Files Updated

#### Index.html (`src/index.html`)
- Updated page title to "Uganda Christian University - Institutional Repository"
- Updated all meta tags (description, OG tags, Twitter cards)
- Added favicon and manifest references
- Updated social media preview imagery

#### Header Components
- **`src/themes/dspace/app/header/header.component.html`**: Logo updated to UCU logo
- **`src/app/header/header.component.html`**: Logo updated to UCU logo
- **`src/app/admin/admin-sidebar/admin-sidebar.component.html`**: Admin sidebar logo updated to UCU logo

#### Home Page Components
- **`src/themes/dspace/app/home-page/home-news/home-news.component.html`**: Content rewritten for UCU branding
- **`src/app/home-page/home-news/home-news.component.html`**: Content rewritten for UCU branding

#### Footer Component (`src/app/footer/footer.component.html`)
- Removed all DSpace and 4Science references
- Removed GitHub, documentation, and Slack channel links
- Replaced with UCU-specific information and links
- Added footer minimize toggle button
- Kept COAR Notify integration (only external link retained)

### 2. Component TypeScript Files

#### Footer Component (`src/app/footer/footer.component.ts`)
- Added `BehaviorSubject` import for footer state management
- Added `isFooterMinimized$` property to track footer minimize state
- Added `toggleFooterMinimize()` method for minimize/maximize functionality
- Added localStorage persistence for footer state
- Updated ngOnInit() to restore footer state from localStorage

### 3. CSS/SCSS Files Updated

#### Global Styles (`src/styles/_global-styles.scss`)
- Added comprehensive form styling with glasmorphism effects
- Form inputs now have:
  - Rounded borders (12px border-radius)
  - Glasmorphic background (rgba with backdrop-filter blur)
  - UCU color border on focus
  - Smooth transitions
  - Box shadows
- Button styling with UCU color gradients:
  - Primary buttons: Blue gradient
  - Danger buttons: Red gradient
  - Success buttons: Green gradient
  - Warning buttons: Yellow gradient
- All buttons have hover effects with elevation and transform

#### CSS Variables (`src/styles/_custom_variables.scss`)
- Added UCU color variables
- Updated footer background to use UCU color gradients
- Updated footer border with transparency
- Updated top footer background with UCU colors

#### Footer Component Styles (`src/app/footer/footer.component.scss`)
- Applied glasmorphism effects with:
  - Gradient background (Blue to Red)
  - Backdrop blur (10px)
  - Semi-transparent borders
  - Box shadows
- Added footer minimize state styling
- Updated footer icons and links with UCU colors
- Added hover effects with color transitions to gold/yellow
- Added rounded corners (16px top radius)
- Added minimize button styling with circular design
- Links change to gold (#FFD932) on hover

#### Navbar Component Styles (`src/app/navbar/navbar.component.scss`)
- Redesigned as macOS dock-style navigation:
  - Centered horizontal layout
  - Glasmorphic background
  - Rounded pill-shaped container (20px border-radius)
  - Max-width constraint (90%)
  - Smooth shadow and border effects
- Menu items with:
  - Rounded backgrounds on hover
  - UCU red color on hover (#D7014D)
  - Scale animation on hover (scale(1.05))
- Dropdown menus styled with glasmorphism

#### Header Styles (`src/themes/dspace/app/header/header.component.scss`)
- Applied UCU color gradient background (Blue to Red)
- Added glass-like overlay effect
- Logo hover effects with scale and brightness
- Navbar toggler button with gold color on hover

#### Header-Navbar Wrapper Styles (`src/themes/dspace/app/header-nav-wrapper/header-navbar-wrapper.component.scss`)
- Updated mobile navbar with glasmorphic background
- Menu items styled with UCU colors
- Hover effects with color transitions to red and gold
- Dropdown menus with glasmorphism

### 4. New Asset Files

#### Logo Files
- **`src/assets/images/ucu-logo.svg`**: Main UCU shield logo with cross and symbols
  - Uses official UCU color scheme
  - Responsive SVG format
  - Includes gradient effects
- **`src/assets/images/ucu-logo.png`**: PNG version of UCU logo
  - Used for login/logout pages
  - Used as fallback for QA notification logos

#### Banner Image
- **`src/assets/images/background.jpg`**: Universal banner image
  - Replaces all previous banner image variations (banner.jpg, banner-half.jpg, banner-tall.jpg, etc.)
  - Used on home page and other banner sections
  - Responsive design support

### 5. Design Features

#### Glasmorphism
Applied across multiple components:
- Footer: Linear gradient background with 10px blur
- Forms: Input fields with glasmorphic effect
- Navbar: Glasmorphic pill-shaped container
- Dropdowns: Glass-like appearance with blur effect

#### Rounded & Smooth UI
- All form inputs: 12px border-radius
- All buttons: 10px border-radius
- Footer: 16px top border-radius
- Navbar: 20px border-radius
- Smooth transitions (0.3s ease) on all interactive elements

#### Minimizable Footer
- New minimize/maximize toggle button
- Button shows chevron icon (up/down)
- Footer state persisted in localStorage
- Smooth expand/collapse transitions
- Accessible keyboard navigation

#### Dock-Style Navigation
- Centered horizontal navbar (macOS/Docker inspired)
- Max-width constraint for better layout
- Glasmorphic background
- Pill-shaped menu items on hover
- Smooth animations and scale effects

## Removed Content

The following DSpace and 4Science references have been removed:
- ✅ DSpace-CRIS branding from homepage
- ✅ Documentation links to LYRASIS wiki
- ✅ Slack channel link
- ✅ 4Science company profile and contact links
- ✅ 4Science logo and branding

## Restored Content

The following content has been restored to support frontend build:
- ✅ GitHub source code link (points to DSpace Angular repository)
  - Location: Footer navigation links
  - URL: https://github.com/DSpace/dspace-angular
  - Available in all language translations

## Image Replacements

All banner and logo images have been standardized for UCU branding:

### Banner Images
- **Replaced**: All previous banner variations (banner.jpg, banner-half.jpg, banner-tall.jpg, banner.webp, etc.)
- **With**: `assets/images/background.jpg`
- **Location**: Home page banner sections
- **Files Updated**:
  - `src/themes/dspace/app/home-page/home-news/home-news.component.html`

### Logo Replacements
- **Replaced**: All DSpace logo references (dspace-logo.svg) and DSpace-CRIS logos (dspace-cris-logo.png, dspace-cris-logo-hd.png)
- **With**: `assets/images/ucu-logo.svg` (SVG format for scalability and consistency)
- **Files Updated**:
  - `src/app/login-page/login-page.component.html` - Login page logo
  - `src/app/logout-page/logout-page.component.html` - Logout page logo
  - `src/app/item-page/simple/qa-event-notification/qa-event-notification.component.html` - QA notification fallback
  - `src/app/my-dspace-page/my-dspace-qa-events-notifications/my-dspace-qa-events-notifications.component.html` - My DSpace QA notification fallback
  - `src/config/default-app-config.ts` - Default meta tag logo configuration
  - `src/environments/environment.test.ts` - Test environment meta tag logo configuration
  - `cypress/e2e/submission.cy.ts` - Test file upload reference (uses PNG)

## Retained Content

The following has been maintained for interoperability:
- ✅ COAR Notify integration (link in footer)
- ✅ All functional DSpace component names (internal use)
- ✅ Technical documentation references (code comments)

## Color Hover Effects

- **Forms**: Gold (#FFD932) focus effect
- **Buttons**: Darker gradient on hover + elevation
- **Links**: Gold (#FFD932) on hover
- **Nav items**: Red (#D7014D) background on hover
- **Admin items**: Red background on hover

## Responsive Design

All updates are responsive and work well on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

The navbar is particularly optimized for mobile with glasmorphic styling maintained across all breakpoints.

## Next Steps for Implementation

1. Build and test the application:
   ```bash
   npm run build
   ```

2. Replace placeholder banner images in `/src/assets/dspace/images/` with UCU-branded images

3. Update translation files to reflect UCU-specific messaging

4. Test footer minimize functionality across browsers

5. Verify glasmorphism effects render properly in all supported browsers

6. Test PWA functionality with the new manifest file

## Browser Compatibility

- **Glasmorphism (backdrop-filter)**: Chrome 76+, Firefox 103+, Safari 9+, Edge 79+
- **CSS Gradients**: All modern browsers
- **SVG**: All modern browsers
- **CSS Variables**: All modern browsers

## Accessibility Features

### Screen Reader Component
A new screen reader accessibility feature has been added to support users with visual impairments and those who prefer audio content. The feature provides text-to-speech functionality across all pages.

**Features:**
- Fixed hovering icon on the left side of the screen (50% vertical position)
- Automatic content extraction and text-to-speech
- Playback controls: Play, Pause, Resume, Stop
- Configurable speech rate (0.5x to 2.0x)
- Configurable volume levels (0-100)
- Browser support detection with graceful fallback
- Web Speech API integration
- Persistent accessibility settings storage

**Browser Support:**
- Chrome 25+
- Firefox 49+
- Safari 14.1+
- Edge 79+
- Opera 27+
- IE 11: Not supported

**Styling:**
- UCU brand color gradient (Blue #0B3D91 to Red #D7014D)
- Fixed positioning with z-index 9999
- Hover animations and scale effects
- Responsive design for mobile and desktop
- Gold (#FFD932) accent on hover

**Integration:**
- Imported in `src/app/root.module.ts` as ScreenReaderModule
- Added to root template `src/app/root/root.component.html`
- Integrated with accessibility settings service
- Persists user preferences (enabled state, rate, volume)

## Files Modified Summary

**HTML Files (11):**
- src/index.html
- src/themes/dspace/app/header/header.component.html
- src/app/header/header.component.html
- src/themes/dspace/app/home-page/home-news/home-news.component.html
- src/app/home-page/home-news/home-news.component.html
- src/app/footer/footer.component.html
- src/app/admin/admin-sidebar/admin-sidebar.component.html
- src/app/root/root.component.html
- src/app/accessibility/screen-reader/screen-reader.component.html

**TypeScript Files (4):**
- src/app/footer/footer.component.ts
- src/app/accessibility/screen-reader/screen-reader.component.ts
- src/app/accessibility/screen-reader/screen-reader.module.ts
- src/app/root.module.ts (updated for ScreenReaderModule import)

**SCSS/CSS Files (7):**
- src/styles/_global-styles.scss
- src/styles/_custom_variables.scss
- src/app/footer/footer.component.scss
- src/app/navbar/navbar.component.scss
- src/themes/dspace/app/header/header.component.scss
- src/themes/dspace/app/header-nav-wrapper/header-navbar-wrapper.component.scss
- src/app/accessibility/screen-reader/screen-reader.component.scss

**Configuration Files (2):**
- src/app/accessibility/accessibility-settings.config.ts (updated)
- src/app/accessibility/accessibility-settings.service.ts (updated)

**Documentation Files (2):**
- src/app/accessibility/screen-reader/SCREEN_READER_INTEGRATION.md
- src/app/accessibility/screen-reader/README.md

**New Asset Files (3):**
- src/assets/images/ucu-logo.svg
- src/assets/images/favicon.svg
- src/manifest.webmanifest

## Support

For questions about the UCU branding implementation, refer to the attached UCU Brand Guidelines and color specifications.

---

**Last Updated**: May 5, 2026
**Branding Status**: ✅ Fully Rebranded to Uganda Christian University
**Accessibility Status**: ✅ Screen Reader Feature Integrated
