# Information Pages - Visual Reference & Component Layout

## Navigation Structure

```
Repository Main Navigation
│
├── /info/how-to-deposit (NEW)
│   │
│   ├── Overview Tab
│   │   ├── Eligibility Criteria
│   │   ├── UCU Connection Definition
│   │   └── Pre-Deposit Requirements
│   │
│   ├── Publications & Outputs Tab
│   │   ├── Mediated Service Info
│   │   ├── Upload Form Link
│   │   └── Contact Email
│   │
│   ├── Research Data Tab
│   │   ├── Data Deposit Guide
│   │   ├── Upload Form Link
│   │   └── RDM Contact
│   │
│   ├── Theses Tab
│   │   ├── Mediated Service Details
│   │   ├── Preparation Guide
│   │   └── Support Contact
│   │
│   ├── Batch Upload Tab
│   │   ├── Process Overview
│   │   ├── Requirements
│   │   ├── Materials Needed
│   │   └── Contact Routing
│   │
│   └── Self-Archiving Tab
│       ├── Access Request Procedure
│       ├── Community Creation
│       └── Process Steps
│
├── /info/data-reuse (NEW)
│   │
│   ├── Discover Tab
│   │   ├── Search Methods
│   │   ├── Browse Options
│   │   ├── External Search Integration
│   │   └── Data Availability Statements
│   │
│   ├── Reuse Tab
│   │   ├── License Information
│   │   ├── CC BY Explanation
│   │   ├── CC BY-SA Explanation
│   │   ├── CC BY-NC Explanation
│   │   └── CC0 Explanation
│   │
│   └── Citing Data Tab
│       ├── Citation Importance
│       ├── Citation Format Elements
│       ├── Citation Tool Usage
│       └── Example Citations
│
├── /info/governance-policies (NEW)
│   │
│   ├── Overview Tab
│   │   ├── ORS Team Description
│   │   ├── Team Responsibilities
│   │   ├── Digital Initiatives Structure
│   │   ├── Content Management
│   │   └── Infrastructure Support
│   │
│   ├── Preservation Tab
│   │   ├── Digital Preservation Overview
│   │   ├── Policy Description
│   │   ├── Scope and Commitments
│   │   └── Long-term Access Guarantee
│   │
│   ├── Persistent Identifiers Tab
│   │   ├── DOI Explanation
│   │   ├── Assignment Criteria
│   │   ├── Eligible Materials
│   │   ├── Benefits List
│   │   └── Maintenance Procedures
│   │
│   ├── Service Level Tab
│   │   ├── Service Standards
│   │   ├── Availability/Performance
│   │   ├── Support Services
│   │   └── Improvement Initiatives
│   │
│   ├── Terms of Use Tab
│   │   ├── Framework Overview
│   │   ├── Key Principles
│   │   ├── Rights Overview
│   │   └── Responsibilities
│   │
│   └── Notice & Takedown Tab
│       ├── Policy Purpose
│       ├── Filing Procedures
│       ├── Required Information
│       ├── Response Process
│       ├── Possible Outcomes
│       └── Contact Email
│
└── / (Home Page) - NEW INFOGRAPHICS SECTION
    │
    └── Home Infographics Component
        │
        ├── [Recent Submissions] [Data & Software] [Theses & Dissertations]
        │
        └── Active Card Display
            ├── Icon Area (Blue Gradient)
            ├── Card Title
            ├── Card Description
            └── View Button → Collection Link
```

---

## Home Page Infographics - Visual Layout

### Tab Navigation
```
┌────────────────────────────────────────────────────────────────┐
│  [🏛️ Recent submissions] [💾 Data & Software] [🎓 Theses & Dissertations] │
└────────────────────────────────────────────────────────────────┘
```

### Active Card Display (Desktop - 3 Column)
```
┌─────────────────┬─────────────────┬─────────────────┐
│  Recent items   │   Data & Soft   │  Theses & Diss  │
│                 │                 │                 │
│  ┌───────────┐  │  ┌───────────┐  │  ┌───────────┐  │
│  │   🏛️      │  │  │   💾      │  │  │   🎓      │  │
│  │           │  │  │           │  │  │           │  │
│  │ Gradient  │  │  │ Gradient  │  │  │ Gradient  │  │
│  │   Blue    │  │  │   Blue    │  │  │   Blue    │  │
│  └───────────┘  │  └───────────┘  │  └───────────┘  │
│                 │                 │                 │
│  Explore...     │  Discover...    │  Access...      │
│  [View Button]  │  [View Button]  │  [View Button]  │
└─────────────────┴─────────────────┴─────────────────┘
```

### Mobile Layout (Single Column)
```
┌────────────────────────────────────┐
│ [Recent] [Data] [Theses]           │  ← Tab buttons stack
├────────────────────────────────────┤
│                                    │
│  Recent submissions                │
│  ┌──────────────────────────────┐  │
│  │        🏛️                    │  │
│  │   (Blue Gradient Icon)       │  │
│  └──────────────────────────────┘  │
│                                    │
│  Explore the latest research...    │
│  [View Button]                     │
│                                    │
└────────────────────────────────────┘
```

---

## Tab Component - Visual States

### Default State
```
┌─────────────────────────────────────┐
│ Overview │ Publications │ Data │ ...│  ← Border-bottom: transparent
└─────────────────────────────────────┘
```

### Hover State
```
┌─────────────────────────────────────┐
│ Overview │ Publications │ Data │ ...│
│          │    ↑ Pink    │      │    │  ← Color: #d7014d, Border: Gold
│          │   Border-B   │      │    │
└─────────────────────────────────────┘
```

### Active State
```
┌─────────────────────────────────────┐
│ Overview │ Publications │ Data │ ...│
│ ═════════                          │  ← Pink bottom border (#d7014d)
└─────────────────────────────────────┘
```

---

## Content Section - Page Layout

### Header Section
```
┌─────────────────────────────────────────────────────┐
│  How to Deposit                                     │
│  (Page Title - 2.5rem, Blue #0b3d91)               │
└─────────────────────────────────────────────────────┘
```

### Tab Navigation
```
┌─────────────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────────────┐│
│ │ Overview │ Pub. │ Data │ Theses │ Batch │ Self  ││
│ │════════════════════════════════════════════════════ │
│ └──────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

### Content Area
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  What can be deposited into the Repository?         │  h2
│                                                     │
│  The Repository terms of use determine the types   │  p
│  of content that can be deposited...               │
│                                                     │
│  Research Output Eligibility                       │  h3
│                                                     │
│  Only Research Outputs connected to Uganda...      │  p
│                                                     │
│  • Research Outputs authored by...                 │  ul/li
│  • Outputs of research conducted...                │
│  • Research Outputs that appear in a journal...    │
│  • Outputs resulting from research undertaken...   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ 📝 This is an Information Box               │   │ info-box
│  │ Describes key information with left border  │   │
│  │ in UCU Pink (#d7014d)                       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Color & Typography Hierarchy

### Colors Used
```
┌─────────────────────────────────────┐
│ Primary Blue: #0b3d91               │  ← h1, h2, h3, body text
│ UCU Pink: #d7014d                   │  ← Accents, tab borders
│ UCU Gold: #ffd932                   │  ← Hover text
│ Light Gray: #f8f9fa                 │  ← Info box backgrounds
│ Dark Gray: #333                     │  ← Body text
│ Border Gray: #e0e0e0                │  ← Tab underline
└─────────────────────────────────────┘
```

### Font Hierarchy
```
h1: Trebuchet MS, 2.5rem, Bold, Blue #0b3d91
h2: Trebuchet MS, 1.75rem, Bold, Blue #0b3d91
h3: Trebuchet MS, 1.25rem, Bold, Blue #0b3d91
h4: Trebuchet MS, 1rem, Bold, Pink #d7014d

Body: System font, 1rem, Regular, Dark #333
Links: Blue #0b3d91, underline on hover
Tab Labels: Trebuchet MS, 0.95rem, Medium
Buttons: Trebuchet MS, 0.9rem, Bold
```

---

## Component File Organization

### How to Deposit Component Tree
```
ds-how-to-deposit (Container)
├── ds-how-to-deposit-content (Content Manager)
│   └── Tab 1-6 Content
│       ├── Headings (h2, h3)
│       ├── Paragraphs
│       ├── Lists (ul, ol)
│       ├── Info Boxes
│       ├── Contact Sections
│       └── Links/Buttons
└── Styled by how-to-deposit.component.scss
```

### Data Reuse Component Tree
```
ds-data-reuse (Container)
├── ds-data-reuse-content (Content Manager)
│   └── Tab 1-3 Content
│       ├── Headings
│       ├── Paragraphs
│       ├── Lists
│       ├── Info Boxes
│       ├── Citation Examples
│       └── Links
└── Styled by data-reuse.component.scss
```

### Governance & Policies Component Tree
```
ds-governance-policies (Container)
├── ds-governance-policies-content (Content Manager)
│   └── Tab 1-6 Content
│       ├── Headings
│       ├── Paragraphs
│       ├── Lists & Tables
│       ├── Info Boxes
│       ├── Contact Information
│       └── Process Steps
└── Styled by governance-policies.component.scss
```

### Home Infographics Component Tree
```
ds-home-infographics (Main Component)
├── Tab Navigation
│   ├── Tab Button 1: Recent Submissions
│   ├── Tab Button 2: Data & Software
│   └── Tab Button 3: Theses & Dissertations
├── Cards Container
│   ├── Card 1 (Recent Submissions)
│   │   ├── Icon Area
│   │   ├── Title
│   │   ├── Description
│   │   └── View Button
│   ├── Card 2 (Data & Software)
│   │   ├── Icon Area
│   │   ├── Title
│   │   ├── Description
│   │   └── View Button
│   └── Card 3 (Theses)
│       ├── Icon Area
│       ├── Title
│       ├── Description
│       └── View Button
└── Styled by home-infographics.component.scss
```

---

## Responsive Breakpoints

### Desktop (≥ 992px)
- 3-column grid for infographics
- Full-width tabs
- Normal font sizes
- All hover effects active

### Tablet (768px - 991px)
- 2-column grid for infographics
- Slightly reduced padding
- Tab labels abbreviated if needed

### Mobile (< 768px)
- 1-column grid/stacked layout
- Tabs stack vertically or scroll horizontally
- Reduced font sizes
- Simplified hover effects
- Full-width content

---

## Animation & Transitions

### Tab Switching
```
Duration: 0.3s
Easing: ease-in
Property: opacity, transform
From: opacity: 0
To: opacity: 1
```

### Button Hover
```
Duration: 0.3s
Easing: ease
Properties: color, background-color, box-shadow, transform
Color Change: #0b3d91 → #d7014d
Transform: scale(1) → scale(1.05) or translateY(-2px)
```

### Tab Border Transition
```
Duration: 0.3s
Easing: ease
Property: border-bottom-color
From: transparent
To: #d7014d (active) or #ffd932 (hover)
```

---

## Accessibility Features

### ARIA Labels
- Tabs have role="tablist"
- Each tab has role="tab"
- Tab content has role="tabpanel"
- Icons marked with aria-hidden="true"
- Links have descriptive text

### Keyboard Navigation
- Tab key: Navigate between tabs
- Arrow keys: Next/Previous tab (ng-bootstrap)
- Enter: Activate tab
- Focus visible outlines maintained

### Color Contrast
- Text on Blue: White (high contrast)
- Text on Light Bg: Dark (high contrast)
- Meets WCAG AA standards

---

## Integration Points

### With Home Page
```
home-page.component.html
│
├── ds-home-coar
├── ds-home-news
│
└── ← INSERT HERE: home-infographics-section-wrapper
    └── ds-themed-home-infographics
        └── [3 card display]
```

### With Navigation
```
Can add links in:
- Main navigation menu
- Footer links
- Help/Support section
- About page
```

### With Routing
```
Routes:
- /info/how-to-deposit
- /info/data-reuse
- /info/governance-policies

URL generation from paths.ts:
getHowToDepositPath()
getDataReusePath()
getGovernancePoliciesPath()
```

---

## Content Flow Examples

### How to Deposit - User Journey
```
User lands on /info/how-to-deposit
    ↓
Sees 6 tab options
    ↓
Clicks on relevant tab (e.g., "Publications")
    ↓
Reads guidance
    ↓
Clicks "Upload Form" button or contact email
    ↓
Proceeds with deposit
```

### Home Infographics - User Journey
```
User visits home page
    ↓
Sees 3 content cards with tabs
    ↓
Clicks on "Data & Software" tab
    ↓
Sees database icon and description
    ↓
Clicks "View" button
    ↓
Navigates to data search/filter
```

---

## Testing Scenarios

### Visual Testing
- [ ] Page renders correctly on all screen sizes
- [ ] Colors display correctly
- [ ] Icons render properly
- [ ] Fonts display with Trebuchet MS
- [ ] Buttons have proper hover states
- [ ] Tab transitions are smooth

### Functional Testing
- [ ] Tabs switch on click
- [ ] Content updates when tab changes
- [ ] Links navigate to correct pages
- [ ] Email links open mail client
- [ ] Form links open external forms
- [ ] Routing works correctly

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen readers read content
- [ ] Color contrast passes WCAG
- [ ] ARIA labels present
- [ ] Focus indicators visible

---

## Reference Images (Conceptual)

### Tab Navigation Style
```
Active Tab:     [Text] ═══════  (Pink underline)
Hover Tab:      [Text] ───────  (Gold underline)
Inactive Tab:   [Text]          (No underline)
```

### Info Box Style
```
┌─ Pink Border ───────────────────┐
│                                 │
│  📌 Information Box Title        │
│                                 │
│  This is an important message   │
│  with background color and      │
│  left border in UCU Pink.        │
│                                 │
└─────────────────────────────────┘
```

### Button Style
```
Default:    [View Button] (Blue background)
Hover:      [View Button] (Pink background, Gold text)
Active:     [View Button] (Darker pink, scale 0.95)
```

---

## File Size & Performance

- **Total CSS**: ~8 KB (minified)
- **Total TypeScript**: ~15 KB (minified)
- **Total HTML**: ~6 KB
- **Images**: Font Awesome icons (CSS only)
- **Load Time**: < 200ms (typical network)
- **Animation FPS**: 60 FPS (modern browsers)

---

## Future Enhancement Mockups

### Search Feature
```
┌─────────────────────────────────┐
│ 🔍 Search policies...           │ ← Search box
└─────────────────────────────────┘

Search Results:
├── DOI Policy
├── Preservation Policy
└── Terms of Use
```

### FAQ Accordion
```
❯ What can I deposit?
  ✓ Answer here...

❯ How do I cite data?
  ✓ Answer here...
```

### Video Tutorials
```
┌─────────────────────────┐
│  ▶️  [Video Thumbnail]  │ ← How to Deposit Video
│  2:45 min              │
└─────────────────────────┘
```

---

This visual reference provides a complete overview of the component structure, layouts, and styling for the Information Pages implementation.
