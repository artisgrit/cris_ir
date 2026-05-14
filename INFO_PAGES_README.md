# Repository Information Pages

## Overview

Three new comprehensive information pages have been added to Veritus eCommons:

### 1. **How to Deposit** (`/info/how-to-deposit`)
A detailed guide for researchers and content creators with 6 tabs:
- **Overview**: Eligibility criteria and requirements for deposits
- **Publications & Outputs**: Guide for depositing scholarly works
- **Research Data**: Instructions for dataset deposits
- **Theses**: Guidance for thesis and dissertation deposits
- **Batch Upload**: For large or complex submissions
- **Self-Archiving**: Self-deposit procedures with collections management

### 2. **How to Reuse Data** (`/info/data-reuse`)
Instructions for discovering, reusing, and citing research data with 3 tabs:
- **Discover**: How to find datasets across the repository and external search engines
- **Reuse**: Understanding licenses and usage rights (CC BY, CC BY-SA, CC BY-NC, CC0)
- **Citing Data**: Best practices for data citation and using the citation tool

### 3. **Governance & Policies** (`/info/governance-policies`)
Complete governance structure and policies with 6 tabs:
- **Overview**: Organizational structure and team responsibilities
- **Preservation**: Long-term digital preservation commitments
- **Persistent Identifiers**: DOI assignment criteria and benefits
- **Service Level**: Service standards and support availability
- **Terms of Use**: Rights, responsibilities, and eligibility
- **Notice & Takedown**: Intellectual property infringement procedures

## Home Page Infographics Component

A new infographic component displays repository highlights with interactive tabs:

```
┌─────────────────────────────────────────┐
│  [Recent Submissions] [Data & Software] [Theses & Dissertations] │
├─────────────────────────────────────────┤
│                                         │
│  Recent submissions                     │
│  [Explore latest research outputs]      │
│  [View Button]                          │
│                                         │
└─────────────────────────────────────────┘
```

**Features:**
- Three content sections with toggle tabs
- Responsive grid layout (stacks on mobile)
- Icon-based navigation
- UCU color scheme (Blue #0b3d91, Pink #d7014d, Gold #ffd932)
- Smooth transitions between tabs
- Direct links to explore collections

## Component Structure

```
src/app/
├── info/
│   ├── how-to-deposit/
│   │   ├── how-to-deposit.component.ts
│   │   ├── how-to-deposit.component.html
│   │   ├── how-to-deposit.component.scss
│   │   ├── how-to-deposit-content/
│   │   │   ├── how-to-deposit-content.component.ts
│   │   │   ├── how-to-deposit-content.component.html
│   │   │   └── how-to-deposit-content.component.scss
│   │   └── themed-how-to-deposit.component.ts
│   ├── data-reuse/
│   │   ├── data-reuse.component.ts
│   │   ├── data-reuse.component.html
│   │   ├── data-reuse.component.scss
│   │   ├── data-reuse-content/
│   │   │   ├── data-reuse-content.component.ts
│   │   │   ├── data-reuse-content.component.html
│   │   │   └── data-reuse-content.component.scss
│   │   └── themed-data-reuse.component.ts
│   ├── governance-policies/
│   │   ├── governance-policies.component.ts
│   │   ├── governance-policies.component.html
│   │   ├── governance-policies.component.scss
│   │   ├── governance-policies-content/
│   │   │   ├── governance-policies-content.component.ts
│   │   │   ├── governance-policies-content.component.html
│   │   │   └── governance-policies-content.component.scss
│   │   └── themed-governance-policies.component.ts
│   ├── info-routes.ts (Updated)
│   └── info-routing-paths.ts (Updated)
└── home-page/
    └── home-infographics/
        ├── home-infographics.component.ts
        ├── home-infographics.component.html
        ├── home-infographics.component.scss
        ├── home-infographics.component.spec.ts
        └── themed-home-infographics.component.ts
```

## Routing Configuration

New routes added to `/info` module:

| Path | Component | Breadcrumb Key |
|------|-----------|----------------|
| `/info/how-to-deposit` | `ThemedHowToDepositComponent` | `info.how-to-deposit` |
| `/info/data-reuse` | `ThemedDataReuseComponent` | `info.data-reuse` |
| `/info/governance-policies` | `ThemedGovernancePoliciesComponent` | `info.governance-policies` |

## Styling & Theme

All pages follow the UCU brand guidelines:

- **Primary Blue**: `#0b3d91` - Headings, navigation, links
- **UCU Pink**: `#d7014d` - Hover effects, accents, active states
- **UCU Gold**: `#ffd932` - Hover text, highlights
- **Font**: Trebuchet MS (headers and nav items)
- **Tab Styling**: Bottom border indicator with smooth transitions
- **Cards**: Gradient backgrounds with soft shadows
- **Animations**: Fade-in effects on tab content

### CSS Classes

```scss
// Info Pages
.deposit-tabs, .reuse-tabs, .policies-tabs - Tab navigation styling
.tab-content-wrapper - Animated content container
.deposit-info-box - Highlighted information boxes
.contact-section - Contact information styling
.citation-example-box - Citation examples with special styling

// Home Infographics
.infographics-section - Main container
.infographics-tabs - Tab button container
.tab-button - Individual tab button
.infographic-card - Content card with animation
.card-icon-placeholder - Icon display area
```

## i18n Translation Keys

Keys added to `src/assets/i18n/info-pages.en.json`:

```json
{
  "info": {
    "how-to-deposit": { ... },
    "data-reuse": { ... },
    "governance-policies": { ... }
  }
}
```

**Translation Keys to Implement:**
- `info.how-to-deposit.title`
- `info.data-reuse.title`
- `info.governance-policies.title`
- Tab labels and breadcrumb keys for each page

## Content Overview

### How to Deposit

**Target Audience**: Researchers, staff, content creators

**Key Information**:
- Eligibility criteria (UCU-connected research)
- Deposit requirements before submission
- Publications: Open Access upload form
- Data: Research Data Management guidance
- Theses: Mediated deposit service
- Batch uploads: Complex/extensive material
- Self-archiving: Access rights and community creation

### How to Reuse Data

**Target Audience**: Researchers using existing data

**Key Information**:
- Discovery methods (search, browse, external search engines)
- License types and usage rights
- CC BY, CC BY-SA, CC BY-NC, CC0 explanations
- Citation importance and format
- Citation tool access
- Example citations in multiple formats

### Governance & Policies

**Target Audience**: Administrators, policy stakeholders, depositors

**Key Information**:
- ORS team responsibilities
- Digital Initiatives governance
- Organizational structure
- Digital preservation strategy
- DOI assignment criteria
- Service level commitments
- Repository terms of use
- Notice and takedown procedures

## Home Page Integration

The home infographics component integrates seamlessly with the existing home page:

1. **Location**: Displays after header/news section, before other content sections
2. **Layout**: Full-width responsive grid
3. **Tabs**: Recent Submissions, Research Data & Software, Theses & Dissertations
4. **Links**: Direct navigation to collection searches

### Component Usage

```typescript
<div class="home-infographics-section-wrapper">
  <div class="container">
    <ds-themed-home-infographics></ds-themed-home-infographics>
  </div>
</div>
```

## Customization

### Adding New Tabs

Edit the content component (e.g., `how-to-deposit-content.component.html`):

```html
<li [ngbNavItem]="'new-tab'">
  <button ngbNavLink class="tab-title">New Tab Title</button>
  <ng-template ngbNavContent>
    <div class="tab-content-wrapper">
      <!-- Tab content here -->
    </div>
  </ng-template>
</li>
```

### Updating Infographic Cards

Edit `home-infographics.component.ts`:

```typescript
infographicCards: InfographicCard[] = [
  {
    id: 'new-card',
    title: 'Card Title',
    icon: 'fas fa-icon-name',
    description: 'Description',
    viewLink: '/search?query',
    viewText: 'View'
  }
];
```

## Dependencies

- **Angular**: Core framework features
- **ng-bootstrap**: NgbNav tabs component
- **Font Awesome**: Icons (fas fa-*)
- **Bootstrap Grid**: Responsive layout
- **RxJS**: Observable patterns (if future enhancements needed)

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support (ng-bootstrap tabs)
- Color contrast compliance
- Descriptive link text

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Touch-friendly tab buttons on mobile devices

## Future Enhancements

Potential improvements:

1. **Search/Filter**: Add search functionality to locate policies
2. **Export**: PDF export for policies and guides
3. **Video Tutorials**: Embedded deposit/reuse walkthrough videos
4. **Interactive Flowcharts**: Visual deposit process flows
5. **FAQs**: Expandable Q&A sections
6. **Community Feedback**: User ratings on page helpfulness

## Troubleshooting

### Tabs Not Displaying

Ensure `NgbNav` module is imported:
```typescript
import { NgbNav, NgbNavItem, NgbNavContent } from '@ng-bootstrap/ng-bootstrap';

imports: [
  NgbNav,
  NgbNavItem,
  NgbNavContent,
  // ...
]
```

### Styling Issues

Check that:
1. SCSS variables are defined (colors, fonts)
2. CSS is properly scoped (`:host` selector)
3. Bootstrap utilities are available

### Navigation Not Working

Verify routing configuration:
1. Routes defined in `info-routes.ts`
2. Path constants in `info-routing-paths.ts`
3. Themed components properly exported

## Support

For questions or enhancements:
- Check component TypeScript files for implementation details
- Review SCSS files for styling customization
- Reference HTML templates for content structure
- Consult i18n files for translation management
