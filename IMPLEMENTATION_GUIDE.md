# COMPREHENSIVE IMPLEMENTATION GUIDE
## Backend Configuration + Frontend Integration

This guide provides complete step-by-step instructions for implementing:
1. New submission forms (BookChapter, Book, MastersDissertation, PhDThesis)
2. Consolidated home page infographics (Theses with graduation-cap icon)
3. Access status badges (Open Access, Embargoed, Published, Peer-reviewed, Post-print, Controlled Access)
4. Multilingual support (i18n translation keys)
5. Item type labeling on frontend

---

## PHASE 1: BACKEND CONFIGURATION (DSpace Server)

### Step 1.1: Update `/dspace/config/submission-forms.xml`

**Purpose:** Add new submission form definitions for BookChapter, Book, MastersDissertation, PhDThesis, and access-status metadata field.

**Location:** `/dspace/config/submission-forms.xml`

**Actions:**
1. Open the file in text editor
2. Navigate to the end, just before `</form-definitions>` closing tag
3. Copy the provided form definitions from the supplementary files:
   - bookchapter-form.xml (4 forms: main + indexing + bibliographic + references)
   - book-form.xml (4 forms: main + indexing + bibliographic + references)
   - mastersdissertation-form.xml (3 forms: main + indexing + bibliographic)
   - phdthesis-form.xml (3 forms: main + indexing + bibliographic)
   - access-status-form.xml (metadata field definition)

4. Paste all form definitions before the closing tag
5. **Critical:** Ensure all `value-pairs-name` attributes match exactly between:
   - Form field definitions
   - value-pairs declarations at end of file

**Validation:**
- All form names must be unique
- All dc-schema/dc-element/dc-qualifier combinations must be valid Dublin Core
- All input-type values must match defined vocabulary names
- No duplicate field definitions within a form

**Commit Message:** "Add submission forms for BookChapter, Book, MastersDissertation, PhDThesis"

---

### Step 1.2: Update `/dspace/config/item-submission.xml`

**Purpose:** Add step definitions and submission processes for new form types.

**Location:** `/dspace/config/item-submission.xml`

**Actions:**
1. Open the file in text editor
2. **Part A - Add Step Definitions:**
   - Navigate to `<step-definitions>` section (near top)
   - Find the last existing `<step-definition>` element
   - After it, add 14 new step definitions from provided XML:
     - bookchapter (4 steps)
     - book (4 steps)
     - mastersdissertation (3 steps)
     - phdthesis (3 steps)

3. **Part B - Add Submission Processes:**
   - Navigate to `<submission-definitions>` section (lower in file)
   - Find the last existing `<submission-process>` element
   - After it, add 4 new submission processes:
     - bookchapter & bookchapter-edit
     - book & book-edit
     - mastersdissertation & mastersdissertation-edit
     - phdthesis & phdthesis-edit

**Critical Matching:**
- Each `<step id="..."/>` in submission-process must have corresponding `<step-definition id="...">` in step-definitions
- All step IDs must be lowercase and hyphen-separated
- Heading values must match i18n translation keys (see Phase 3)

**Validation Checklist:**
- [ ] All 14 step definitions added
- [ ] All 4 submission processes added
- [ ] All step ID references resolve to definitions
- [ ] No duplicate step or process names
- [ ] All heading values are valid i18n keys

**Commit Message:** "Add submission workflow steps and processes for new entity types"

---

### Step 1.3: Update `/dspace/config/spring/api/discovery.xml`

**Purpose:** Add discovery configurations for counting and browsing new entity types.

**Location:** `/dspace/config/spring/api/discovery.xml`

**Actions:**
1. Open the file in text editor
2. Find the existing discovery configurations section
3. Add four new configuration entries (see discovery-config-new-entities.xml):
   - Entry key="bookchapter"
   - Entry key="book"
   - Entry key="masters_output"
   - Entry key="phd_output"
   - Entry key="theses" (combined masters + phd with OR logic)

4. Each configuration should include:
   - Facet definitions (sidebar facets for browsing)
   - Search filters (for advanced search)
   - Sort configuration
   - Default filter queries
   - Default results per page

**Filter Query Considerations:**
- Include: `-withdrawn:true AND -discoverable:false` to exclude withdrawn items
- For masters_output: add `dc.type:master thesis`
- For phd_output: add `dc.type:doctoral thesis`
- For theses: use OR logic to combine both master thesis AND doctoral thesis

**Commit Message:** "Add discovery configurations for new entity types and theses aggregation"

---

### Step 1.4: Update `/dspace/config/spring/api/cris-sections.xml`

**Purpose:** Consolidate home page infographics - combine Masters/PhD into "Theses & Dissertations" and update icons.

**Location:** `/dspace/config/spring/api/cris-sections.xml`

**Actions:**
1. Open the file (or create if it doesn't exist)
2. Replace the CrisLayoutCountersComponent bean configuration with:
   - Replace old "Masters Research Output" and "PhD Research Output" entries
   - Add single "Theses & Dissertations" counter with:
     - discoveryConfigurationName: "theses"
     - label: "Theses & Dissertations"
     - icon: "fas fa-graduation-cap fa-3x"
     - link: "/explore/theses"
   
3. Update Scholarly Publications counter:
   - Change icon from "fas fa-book" to "fas fa-file-alt"
   - Ensure label is "Scholarly Publications"

4. Keep Datasets and Profiles counters unchanged

**Icon Mappings (Font Awesome):**
- Scholarly Publications: `fas fa-file-alt` (document/article)
- Theses & Dissertations: `fas fa-graduation-cap` (graduation cap)
- Datasets: `fas fa-database` (database)
- Profiles: `fas fa-users` (people)

**Validation:**
- All icons use "fas" prefix (Font Awesome Solid)
- All discovery configuration names match those in discovery.xml
- Bootstrap grid classes (col-12, col-md-6, col-lg-3) are consistent

**Commit Message:** "Consolidate home page infographics: combine Theses & update icons"

---

### Step 1.5: Add Access Status Metadata to Submission Form

**Location:** `/dspace/config/submission-forms.xml`

**Actions:**
1. For each new submission form (bookchapter, book, mastersdissertation, phdthesis):
   - Add access-status field before upload step:
   ```xml
   <field>
       <dc-schema>dspace</dc-schema>
       <dc-element>access-status</dc-element>
       <label>item.access-status.label</label>
       <input-type value-pairs-name="access_status">dropdown</input-type>
       <repeatable>false</repeatable>
       <required>false</required>
       <hint>item.access-status.hint</hint>
   </field>
   ```

2. Ensure value-pairs at end of file includes:
   ```xml
   <value-pairs value-pairs-name="access_status" dc-term="access_status">
       <pair><displayed-value>Open Access</displayed-value><stored-value>open access</stored-value></pair>
       <pair><displayed-value>Embargoed</displayed-value><stored-value>embargoed</stored-value></pair>
       <pair><displayed-value>Published</displayed-value><stored-value>published</stored-value></pair>
       <pair><displayed-value>Peer Reviewed</displayed-value><stored-value>peer reviewed</stored-value></pair>
       <pair><displayed-value>Post-Print</displayed-value><stored-value>post-print</stored-value></pair>
       <pair><displayed-value>Controlled Access</displayed-value><stored-value>controlled access</stored-value></pair>
   </value-pairs>
   ```

**Commit Message:** "Add access status metadata field to new submission forms"

---

## PHASE 2: VALIDATION & TESTING

### Step 2.1: DSpace Configuration Validation

**Commands to run on DSpace server:**

```bash
# Validate XML syntax (all configuration files)
xmllint /dspace/config/submission-forms.xml
xmllint /dspace/config/item-submission.xml
xmllint /dspace/config/spring/api/discovery.xml
xmllint /dspace/config/spring/api/cris-sections.xml

# Clear DSpace caches
/dspace/bin/dspace cleanup -v

# Rebuild search indices
/dspace/bin/dspace index-discovery
```

### Step 2.2: Verify Configuration Registration

Log into DSpace admin interface and verify:
1. New submission types appear in submission process list
2. New discovery configurations are indexed
3. Home page shows updated counters with correct icons

---

## PHASE 3: FRONTEND CONFIGURATION

### Step 3.1: Create i18n Translation Files

**Files to create/update:**
- `src/assets/i18n/en.json`
- `src/assets/i18n/[other-languages].json`

**Content to add:**

```json
{
  "submit": {
    "progressbar": {
      "describe": {
        "bookchapter": "Book Chapter Details",
        "bookchapter_indexing": "Book Chapter Indexing",
        "bookchapter_bibliographic_details": "Bibliographic Details",
        "bookchapter_references": "References & Funding",
        "book": "Book Details",
        "book_indexing": "Book Indexing",
        "book_bibliographic_details": "Bibliographic Details",
        "book_references": "References & Funding",
        "mastersdissertation": "Masters Dissertation Details",
        "mastersdissertation_indexing": "Dissertation Indexing",
        "mastersdissertation_bibliographic_details": "Institutional Details",
        "phdthesis": "PhD Thesis Details",
        "phdthesis_indexing": "Thesis Indexing",
        "phdthesis_bibliographic_details": "Institutional Details"
      }
    }
  },
  "item": {
    "access-status": {
      "label": "Access Status",
      "open-access": "Open Access",
      "embargoed": "Embargoed",
      "published": "Published",
      "peer-reviewed": "Peer Reviewed",
      "post-print": "Post-Print",
      "pre-print": "Pre-Print",
      "controlled-access": "Controlled Access",
      "restricted": "Restricted"
    }
  },
  "cris": {
    "item": {
      "form": {
        "bookchapter": "Book Chapter",
        "book": "Book",
        "mastersdissertation": "Masters Dissertation",
        "phdthesis": "PhD Thesis"
      }
    }
  }
}
```

**Actions:**
1. Open `src/assets/i18n/en.json`
2. Add all keys from submission-forms.en.json
3. Repeat for all supported languages
4. Commit changes

**Validation:**
- All i18n keys referenced in step definitions match exactly
- All access status values have corresponding translation keys
- All form names have translation keys for submission progress bar

---

### Step 3.2: Update Frontend Configuration

**File:** `src/config/default-app-config.ts`

**Actions:**
1. Add discovery configurations for new entity types:
   ```typescript
   discovery: {
     search: [
       { name: 'theses', configurationName: 'RELATION.theses', label: '...', icon: 'fa-graduation-cap' },
       { name: 'bookchapter', configurationName: 'RELATION.bookchapter', ... },
       { name: 'book', configurationName: 'RELATION.book', ... },
       // ... existing configurations
     ]
   }
   ```

2. Add access status metadata configuration:
   ```typescript
   itemPage: {
     accessStatusConfig: {
       'open access': { label: 'Open Access', badgeClass: 'badge-success', ... },
       'embargoed': { label: 'Embargoed', badgeClass: 'badge-warning', ... },
       // ... all access status values
     }
   }
   ```

3. Add item type mapping:
   ```typescript
   itemTypeMapping: {
     'bookchapter': { label: 'Book Chapter', icon: 'fa-book' },
     'book': { label: 'Book', icon: 'fa-book' },
     'mastersdissertation': { label: 'Masters Dissertation', icon: 'fa-graduation-cap' },
     'phdthesis': { label: 'PhD Thesis', icon: 'fa-graduation-cap' },
     // ... other types
   }
   ```

---

### Step 3.3: Update Item Display Components

**File locations:**
- `src/app/item-page/item-detail/item-detail.component.ts`
- `src/app/item-page/item-detail/item-detail.component.html`
- `src/app/search/search-result/search-result.component.ts`
- `src/app/search/search-result/search-result.component.html`

**Component Methods to Add:**

```typescript
// Get access status badges from metadata
getAccessStatusBadges(): Badge[] {
  const accessStatus = this.item['dc.rights.access'];
  if (!accessStatus) return [];
  
  return accessStatus.map(status => 
    this.accessStatusConfig[status.value.toLowerCase()]
  ).sort((a, b) => a.priority - b.priority);
}

// Get item type label
getItemTypeLabel(): ItemTypeLabel {
  const itemType = this.item.type || this.item['cris.item.form'];
  return this.itemTypeMapping[itemType];
}

// Render individual badge
displayBadge(badge: Badge): string {
  return `<span class="badge ${badge.badgeClass}">
    <i class="fa ${badge.icon}"></i>
    ${badge.label}
  </span>`;
}
```

**Template Updates:**

```html
<!-- Item Detail Page Hero Section -->
<div class="item-detail-hero">
  <h1>{{ item.name }}</h1>
  
  <!-- Item Type Badge -->
  <span class="item-type-badge" [ngClass]="getItemTypeLabel().icon">
    <i class="fa" [ngClass]="'fa-' + getItemTypeLabel().icon"></i>
    {{ getItemTypeLabel().label }}
  </span>
  
  <!-- Access Status Badges -->
  <div class="access-status-badges">
    <span *ngFor="let badge of getAccessStatusBadges()" 
          [class]="'badge ' + badge.badgeClass">
      <i class="fa" [ngClass]="'fa-' + badge.icon"></i>
      {{ badge.label }}
    </span>
  </div>
</div>
```

---

### Step 3.4: Add CSS Styling

**File:** `src/styles/global.scss` or `src/styles/item-detail.scss`

**Content:**
```scss
.access-status-badges {
  display: flex;
  gap: 8px;
  margin: 12px 0;
  flex-wrap: wrap;
  
  .badge {
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 4px;
    
    i { margin-right: 4px; }
  }
  
  .badge-success { background-color: #28a745; color: white; }
  .badge-warning { background-color: #ffc107; color: #212529; }
  .badge-info { background-color: #17a2b8; color: white; }
  .badge-primary { background-color: #007bff; color: white; }
  .badge-danger { background-color: #dc3545; color: white; }
}

.item-type-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}
```

---

## PHASE 4: BUILD & DEPLOYMENT

### Step 4.1: Build Frontend

```bash
# Install dependencies
npm install

# Build production bundle
npm run build

# Or for development with watch
npm run serve
```

### Step 4.2: Deploy & Restart Services

```bash
# Backend: Restart Tomcat
sudo systemctl restart tomcat

# Frontend: Deploy built artifacts
# Copy dist/ contents to appropriate web root
```

### Step 4.3: Verify Deployment

**Checklist:**
- [ ] Home page displays updated infographics (Theses icon, Publications icon)
- [ ] New submission forms appear in submission process selection
- [ ] New submission processes complete without errors
- [ ] New items show access status badges on item detail page
- [ ] Item type labels appear correctly on items
- [ ] Search results display access status badges
- [ ] i18n translations display correctly in UI
- [ ] Discovery indexing completes successfully
- [ ] No console errors in browser DevTools

---

## FILES REFERENCE

**Generated Configuration Files:**
1. `submission-forms.en.json` - i18n translation keys
2. `discovery-config-new-entities.xml` - Discovery configurations
3. `access-status-config.xml` - Access status metadata definitions
4. `cris-sections-updated.xml` - Updated home page infographics
5. `item-display-config.ts` - Frontend item display configuration

**DSpace Configuration Files (to be updated):**
1. `/dspace/config/submission-forms.xml`
2. `/dspace/config/item-submission.xml`
3. `/dspace/config/spring/api/discovery.xml`
4. `/dspace/config/spring/api/cris-sections.xml`

**Angular Frontend Files (to be updated):**
1. `src/assets/i18n/en.json` (and other language files)
2. `src/config/default-app-config.ts`
3. `src/app/item-page/item-detail/item-detail.component.ts`
4. `src/app/item-page/item-detail/item-detail.component.html`
5. `src/app/search/search-result/search-result.component.ts`
6. `src/app/search/search-result/search-result.component.html`
7. `src/styles/item-detail.scss` (or `global.scss`)

---

## TROUBLESHOOTING

### Issue: "Step ID not found" error
**Solution:** Verify all `<step id="..."/>` references in submission-processes match `<step-definition id="...">` definitions. IDs must be exactly matching.

### Issue: Access status values not appearing
**Solution:** Check that access-status field is added to submission forms and value-pairs are defined at end of submission-forms.xml.

### Issue: Icons not displaying on home page
**Solution:** Verify Font Awesome CSS is loaded in templates. Check icon class names use "fas fa-" prefix. Ensure Bootstrap grid classes are consistent.

### Issue: i18n keys showing as undefined
**Solution:** Verify i18n JSON keys exactly match those used in XML heading attributes. Check language files are loaded in Angular module.

### Issue: New discovery configs not indexed
**Solution:** Clear DSpace cache and reindex: `/dspace/bin/dspace cleanup -v && /dspace/bin/dspace index-discovery`

---

## NEXT STEPS

After implementing all phases:
1. Monitor error logs for any configuration mismatches
2. Gather user feedback on UI changes
3. Consider performance impact of new discovery configurations
4. Plan multilingual content review with native speakers
5. Document any custom customizations for future maintenance
