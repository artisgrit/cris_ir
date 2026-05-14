# Information Pages - Implementation Checklist

## Phase 1: Backend Configuration ✅

- [x] Create directory structure for three info pages:
  - [x] `src/app/info/how-to-deposit/`
  - [x] `src/app/info/data-reuse/`
  - [x] `src/app/info/governance-policies/`
- [x] Create home infographics component:
  - [x] `src/app/home-page/home-infographics/`
- [x] Implement page components with content:
  - [x] HowToDepositComponent with 6 tabs (Overview, Publications, Data, Theses, Batch, Self-Archive)
  - [x] DataReuseComponent with 3 tabs (Discover, Reuse, Cite)
  - [x] GovernancePoliciesComponent with 6 tabs (Overview, Preservation, Identifiers, Service Level, Terms of Use, Notice & Takedown)
- [x] Create content sub-components for tab organization
- [x] Create themed wrapper components for all three pages
- [x] Create home infographics component with card-based layout

## Phase 2: Routing & Configuration ✅

- [x] Update `info-routing-paths.ts`:
  - [x] Add `HOW_TO_DEPOSIT_PATH` constant
  - [x] Add `DATA_REUSE_PATH` constant
  - [x] Add `GOVERNANCE_POLICIES_PATH` constant
  - [x] Add getter functions for paths
- [x] Update `info-routes.ts`:
  - [x] Import new components (Themed versions)
  - [x] Add route configuration for How to Deposit
  - [x] Add route configuration for Data Reuse
  - [x] Add route configuration for Governance & Policies
  - [x] Configure breadcrumb data for each route

## Phase 3: Home Page Integration ✅

- [x] Create `home-infographics.component.ts`:
  - [x] Define InfographicCard interface
  - [x] Initialize three card objects (Submissions, Data, Theses)
  - [x] Implement tab switching logic
  - [x] Add getActiveCard() method
  - [x] Add setActiveTab() method
- [x] Create `home-infographics.component.html`:
  - [x] Tab button navigation
  - [x] Card display with animation
  - [x] Icon rendering
  - [x] View buttons with links
- [x] Create `home-infographics.component.scss`:
  - [x] Tab styling (active/hover states)
  - [x] Card layout (grid responsive)
  - [x] Icon placeholder styling
  - [x] Button styling with UCU colors
  - [x] Animations (fade-in)
- [x] Create unit tests for home infographics
- [x] Update `home-page.component.ts`:
  - [x] Import ThemedHomeInfographicsComponent
  - [x] Add to component imports array
- [x] Update `home-page.component.html`:
  - [x] Add infographics section wrapper
  - [x] Insert component after news section

## Phase 4: Styling & Theme ✅

- [x] Implement UCU color scheme across all pages:
  - [x] Primary Blue (#0b3d91)
  - [x] UCU Pink (#d7014d)
  - [x] UCU Gold (#ffd932)
- [x] Tab styling:
  - [x] Border-bottom indicator
  - [x] Hover effects
  - [x] Active state styling
  - [x] Smooth transitions
- [x] Content box styling:
  - [x] Information boxes (deposit-info-box)
  - [x] Contact sections
  - [x] Citation examples
- [x] Font configuration:
  - [x] Trebuchet MS for headers
  - [x] Trebuchet MS for navigation
- [x] Responsive design:
  - [x] Mobile breakpoints
  - [x] Flexible grid layouts
  - [x] Touch-friendly elements

## Phase 5: Internationalization ✅

- [x] Create i18n translation keys file: `info-pages.en.json`
- [x] Define keys for How to Deposit:
  - [x] Title and breadcrumb
  - [x] Tab labels
- [x] Define keys for Data Reuse:
  - [x] Title and breadcrumb
  - [x] Tab labels
- [x] Define keys for Governance & Policies:
  - [x] Title and breadcrumb
  - [x] Tab labels

**TODO - Translate to Additional Languages:**
- [ ] Spanish (es.json) - `info-pages.es.json`
- [ ] French (fr.json) - `info-pages.fr.json`
- [ ] Swahili (sw.json) - `info-pages.sw.json`
- [ ] Other institutional languages

## Phase 6: Content Population ✅

### How to Deposit Tabs
- [x] **Overview**:
  - [x] Eligibility criteria
  - [x] UCU-connection definition
  - [x] Pre-deposit requirements
- [x] **Publications & Outputs**:
  - [x] Mediated deposit service description
  - [x] Upload form link placeholder
  - [x] Contact email
- [x] **Research Data**:
  - [x] Data deposit instructions
  - [x] Upload form link placeholder
  - [x] Contact information
- [x] **Theses**:
  - [x] Mediated service description
  - [x] Preparation guidelines
  - [x] Support contact
- [x] **Batch Upload**:
  - [x] Use cases
  - [x] Required materials
  - [x] Process description
  - [x] Contact details (Data Management & Repository)
- [x] **Self-Archiving**:
  - [x] Access request procedure
  - [x] New community/collection creation process

### Data Reuse Tabs
- [x] **Discover**:
  - [x] Search methods
  - [x] Browse options
  - [x] External search integration
  - [x] Data Availability Statement importance
- [x] **Reuse**:
  - [x] License information
  - [x] License types explained (CC BY, CC BY-SA, CC BY-NC, CC0)
  - [x] Usage terms
- [x] **Citing Data**:
  - [x] Citation importance
  - [x] Benefits of data citation
  - [x] Citation format elements
  - [x] Citation tool usage
  - [x] Example citations

### Governance & Policies Tabs
- [x] **Overview**:
  - [x] ORS team description
  - [x] Responsibilities list
  - [x] Digital Initiatives structure
  - [x] Content management
  - [x] Infrastructure support
- [x] **Preservation**:
  - [x] Digital preservation overview
  - [x] Policy description
  - [x] Scope and commitments
  - [x] Long-term access guarantee
- [x] **Persistent Identifiers**:
  - [x] DOI explanation
  - [x] Assignment criteria
  - [x] Eligible material types
  - [x] Benefits list
  - [x] Maintenance procedures
- [x] **Service Level**:
  - [x] Service standards
  - [x] Availability/performance targets
  - [x] Support services
  - [x] Improvement initiatives
- [x] **Terms of Use**:
  - [x] Framework description
  - [x] Key principles
  - [x] Rights and responsibilities
- [x] **Notice & Takedown**:
  - [x] Policy purpose
  - [x] Filing procedures
  - [x] Required notice information
  - [x] Response procedures
  - [x] Possible outcomes
  - [x] Contact email

## Phase 7: Home Infographics Content ✅

- [x] Define card properties (id, title, icon, description, link)
- [x] Recent Submissions card:
  - [x] Icon: `fas fa-university`
  - [x] Description text
  - [x] Link to search results sorted by date
- [x] Research Data & Software card:
  - [x] Icon: `fas fa-database`
  - [x] Description text
  - [x] Link to data filter search
- [x] Theses & Dissertations card:
  - [x] Icon: `fas fa-graduation-cap`
  - [x] Description text
  - [x] Link to theses collection
- [x] Tab switching functionality
- [x] Responsive card layout

## Phase 8: Testing & Validation

**Component Testing:**
- [ ] Unit tests for component logic
- [ ] Navigation test between tabs
- [ ] Card switching test
- [ ] Link routing test

**UI/UX Testing:**
- [ ] Tab styling verification
- [ ] Responsive layout on mobile/tablet/desktop
- [ ] Hover states and transitions
- [ ] Icon rendering
- [ ] Color contrast compliance (WCAG AA)
- [ ] Font rendering accuracy

**Content Testing:**
- [ ] Spelling and grammar check
- [ ] Link functionality
- [ ] Email address verification
- [ ] Consistency across pages

**Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Phase 9: Documentation ✅

- [x] Create comprehensive README.md
- [x] Document component structure
- [x] Provide routing configuration details
- [x] Include styling guidelines
- [x] Document i18n keys
- [x] Create implementation checklist (this file)
- [x] Add customization instructions
- [x] Include troubleshooting guide

## Phase 10: Deployment Preparation

**Before Deployment:**
- [ ] Verify all imports and dependencies
- [ ] Check console for TypeScript compilation errors
- [ ] Test routing paths work correctly
- [ ] Verify breadcrumb generation
- [ ] Check animation performance
- [ ] Validate responsive behavior at all breakpoints

**Build & Bundle:**
- [ ] Run production build
- [ ] Check bundle size impact
- [ ] Verify tree-shaking optimization
- [ ] Test lazy loading (if applicable)

**Pre-Production:**
- [ ] Deploy to staging environment
- [ ] Full end-to-end testing
- [ ] Performance testing
- [ ] Accessibility audit (axe DevTools, Lighthouse)
- [ ] User acceptance testing

**Production Deployment:**
- [ ] Backup existing deployment
- [ ] Deploy updated code
- [ ] Verify routing works
- [ ] Check styling renders correctly
- [ ] Monitor error logs
- [ ] Confirm SEO meta tags

## Phase 11: Post-Launch Monitoring

- [ ] Monitor analytics for page traffic
- [ ] Track user engagement with tabs
- [ ] Collect user feedback
- [ ] Monitor for broken links
- [ ] Check for CSS/JS errors in production
- [ ] Review page performance metrics

## Known Limitations & Future Work

- **Inline Contact Links**: Email addresses are static; consider dynamic contact system
- **Link Destinations**: Placeholder links need to be verified against actual routes
- **Form Links**: External form links (upload forms) need to be configured
- **Translation**: Initial English only; requires translation to additional languages
- **Mobile Optimization**: Tab labels may need abbreviation on very small screens
- **SEO**: Consider adding structured data for policies and FAQs

## Success Criteria

✅ All checkboxes completed when:
- [ ] All three info pages display correctly
- [ ] Tabs function and content switches smoothly
- [ ] Home page infographics render with proper styling
- [ ] All links navigate to correct destinations
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] UCU color scheme applied consistently
- [ ] No console errors or warnings
- [ ] Navigation breadcrumbs display correctly
- [ ] All i18n keys defined (English)
- [ ] Unit tests passing
- [ ] Performance metrics acceptable

## Questions & Support

For implementation questions or issues, refer to:
1. Component TypeScript files for logic
2. HTML templates for structure
3. SCSS files for styling
4. README.md for detailed documentation
5. Code comments in source files

---

**Last Updated**: May 2026
**Status**: ✅ Complete - Ready for Testing & Deployment
**Implemented By**: GitHub Copilot AI Assistant
