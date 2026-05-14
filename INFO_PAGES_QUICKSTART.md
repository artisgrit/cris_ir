# Quick Start Guide - Information Pages

## 🚀 Getting Started in 5 Minutes

### Step 1: Verify Files Created
Check that these directories exist:
```bash
src/app/info/how-to-deposit/
src/app/info/data-reuse/
src/app/info/governance-policies/
src/app/home-page/home-infographics/
```

### Step 2: Check Routing
File: `src/app/info/info-routes.ts`
- Imports 3 themed components ✓
- 3 new routes added ✓

File: `src/app/info/info-routing-paths.ts`
- 3 path constants defined ✓
- 3 getter functions added ✓

### Step 3: Verify Home Page Integration
File: `src/app/home-page/home-page.component.ts`
- ✓ ThemedHomeInfographicsComponent imported
- ✓ Added to imports array

File: `src/app/home-page/home-page.component.html`
- ✓ home-infographics-section-wrapper added

### Step 4: Check i18n Keys
File: `src/assets/i18n/info-pages.en.json`
- ✓ 24 translation keys defined
- ✓ Ready for use in templates

### Step 5: Build & Test
```bash
# Compile TypeScript
ng build

# Run tests (if applicable)
ng test

# Serve locally
ng serve

# Visit pages:
# http://localhost:4200/info/how-to-deposit
# http://localhost:4200/info/data-reuse
# http://localhost:4200/info/governance-policies
```

---

## 📁 File Structure Quick Reference

```
How to Deposit Page:
├── Component: src/app/info/how-to-deposit/how-to-deposit.component.ts
├── HTML: src/app/info/how-to-deposit/how-to-deposit.component.html
├── Styles: src/app/info/how-to-deposit/how-to-deposit.component.scss
├── Content: src/app/info/how-to-deposit/how-to-deposit-content/
└── Theme: src/app/info/how-to-deposit/themed-how-to-deposit.component.ts

Data Reuse Page:
├── Component: src/app/info/data-reuse/data-reuse.component.ts
├── HTML: src/app/info/data-reuse/data-reuse.component.html
├── Styles: src/app/info/data-reuse/data-reuse.component.scss
├── Content: src/app/info/data-reuse/data-reuse-content/
└── Theme: src/app/info/data-reuse/themed-data-reuse.component.ts

Governance & Policies Page:
├── Component: src/app/info/governance-policies/governance-policies.component.ts
├── HTML: src/app/info/governance-policies/governance-policies.component.html
├── Styles: src/app/info/governance-policies/governance-policies.component.scss
├── Content: src/app/info/governance-policies/governance-policies-content/
└── Theme: src/app/info/governance-policies/themed-governance-policies.component.ts

Home Infographics:
├── Component: src/app/home-page/home-infographics/home-infographics.component.ts
├── HTML: src/app/home-page/home-infographics/home-infographics.component.html
├── Styles: src/app/home-page/home-infographics/home-infographics.component.scss
├── Tests: src/app/home-page/home-infographics/home-infographics.component.spec.ts
└── Theme: src/app/home-page/home-infographics/themed-home-infographics.component.ts

Routing:
├── Routes: src/app/info/info-routes.ts
└── Paths: src/app/info/info-routing-paths.ts

i18n:
└── Keys: src/assets/i18n/info-pages.en.json

Documentation:
├── README: INFO_PAGES_README.md
├── Checklist: INFO_PAGES_IMPLEMENTATION_CHECKLIST.md
├── Summary: INFO_PAGES_SUMMARY.md
├── Visual: INFO_PAGES_VISUAL_REFERENCE.md
└── QuickStart: INFO_PAGES_QUICKSTART.md
```

---

## 🎯 Key URLs After Deployment

```
How to Deposit:        /info/how-to-deposit
Data Reuse:            /info/data-reuse
Governance & Policies: /info/governance-policies
Home (with infographics): /
```

---

## 🎨 Styling Quick Reference

### Colors
```scss
Primary Blue:  #0b3d91    // Headings, text
UCU Pink:      #d7014d    // Hover, accents
UCU Gold:      #ffd932    // Hover text
Light BG:      #f8f9fa    // Info boxes
Border:        #e0e0e0    // Dividers
```

### Typography
```scss
h1: Trebuchet MS, 2.5rem, bold
h2: Trebuchet MS, 1.75rem, bold
h3: Trebuchet MS, 1.25rem, bold
body: System font, 1rem, regular
```

### Common Classes
```scss
.deposit-tabs / .reuse-tabs / .policies-tabs
.tab-content-wrapper
.deposit-info-box / .reuse-info-box / .policy-info-box
.contact-section / .citation-example-box
.infographics-section / .infographic-card
```

---

## 📝 Common Tasks

### Add a New Tab
1. Edit content HTML component
2. Add new `<li [ngbNavItem]="'new-id'">` block
3. Update component `activeTab` default if needed
4. Add translation keys to i18n file
5. Update component styles if needed

Example:
```html
<li [ngbNavItem]="'new-tab'">
  <button ngbNavLink class="tab-title">New Tab</button>
  <ng-template ngbNavContent>
    <div class="tab-content-wrapper">
      <!-- Content here -->
    </div>
  </ng-template>
</li>
```

### Update Content Text
1. Open component HTML file
2. Edit text within the tab content
3. No styling changes needed
4. Save and rebuild

### Change Colors
1. Edit component SCSS file
2. Update color variables at top
3. Check contrast for accessibility
4. Test on all screen sizes

### Add Navigation Link
1. In your navigation template
2. Add link with [routerLink]
3. Use getter function from routing-paths.ts:

```html
<a [routerLink]="getHowToDepositPath()">How to Deposit</a>
```

### Enable Additional Language
1. Create new i18n file: `info-pages.[lang].json`
2. Copy structure from `info-pages.en.json`
3. Translate all keys to target language
4. Configure in Angular i18n settings

---

## 🧪 Testing Checklist

### Before Deploying:
- [ ] No TypeScript errors (`ng build`)
- [ ] Routing works (`/info/how-to-deposit` loads)
- [ ] Tabs switch on click
- [ ] Content displays correctly
- [ ] Styling renders correctly
- [ ] Links are functional
- [ ] Responsive on mobile (< 768px)
- [ ] No console errors
- [ ] Home page loads with infographics

### Verify:
- [ ] Page titles appear correctly
- [ ] Breadcrumbs display
- [ ] UCU colors visible
- [ ] Trebuchet MS font loaded
- [ ] Icons render (Font Awesome)
- [ ] Buttons have hover effects

---

## 🐛 Troubleshooting

### Tabs Not Showing
**Problem**: Empty page or tabs not rendering  
**Solution**: Check that ng-bootstrap is imported in component
```typescript
imports: [NgbNav, NgbNavItem, NgbNavContent, ...]
```

### Styling Not Applied
**Problem**: Page looks plain/unstyled  
**Solution**: 
1. Check SCSS file exists and is referenced
2. Verify CSS is properly scoped with `:host`
3. Run `ng build` to compile SCSS
4. Clear browser cache (Ctrl+Shift+Delete)

### Links Not Working
**Problem**: Links don't navigate correctly  
**Solution**:
1. Check routing configuration in `info-routes.ts`
2. Verify path constants in `info-routing-paths.ts`
3. Use `[routerLink]` not `href` for internal links

### Component Not Found
**Problem**: "Cannot find component" error  
**Solution**:
1. Verify import statement in parent component
2. Check component is exported from module
3. Verify file path is correct

### i18n Keys Not Working
**Problem**: Keys show as `info.how-to-deposit.title` instead of text  
**Solution**:
1. Check translation key exists in JSON file
2. Verify key path matches template usage
3. Ensure `| translate` pipe is used

---

## 📚 Documentation Files

### Which File to Read?

| Question | File |
|----------|------|
| "What was built?" | INFO_PAGES_SUMMARY.md |
| "How do I customize?" | INFO_PAGES_README.md |
| "What's the status?" | INFO_PAGES_IMPLEMENTATION_CHECKLIST.md |
| "How does it look?" | INFO_PAGES_VISUAL_REFERENCE.md |
| "How do I get started?" | INFO_PAGES_QUICKSTART.md (this file) |

---

## 🚀 Deployment Steps

### 1. Pre-Deployment
```bash
# Verify no errors
ng build --prod

# Run tests
ng test

# Check bundle size
ng build --prod --stats-json
webpack-bundle-analyzer dist/dspace/stats.json
```

### 2. Staging Deployment
```bash
# Deploy to staging server
# Test all functionality
# Verify responsive design
# Check with real data
```

### 3. Production Deployment
```bash
# Backup current production
cp -r prod/ prod.backup

# Deploy new code
ng build --prod
# ... copy dist files to production

# Verify deployment
# - Check routes work
# - Test pages load
# - Monitor error logs
```

### 4. Post-Deployment
- [ ] Monitor analytics for new pages
- [ ] Collect user feedback
- [ ] Track page performance
- [ ] Fix any issues
- [ ] Plan next features

---

## 💡 Tips & Best Practices

### Navigation Integration
Add these pages to your main navigation:
- Main menu "Help" section
- Footer "About" links
- Support/FAQ areas

### Content Maintenance
- Keep policies updated regularly
- Review for accuracy quarterly
- Update contact information as needed
- Fix broken links promptly

### User Experience
- Use breadcrumbs for context
- Keep pages under 2000 words
- Break content into logical tabs
- Include clear calls-to-action

### Performance
- Page load: Target < 2 seconds
- Animation FPS: Maintain 60 FPS
- Mobile-first design approach
- Optimize images and assets

---

## 📞 Support & Questions

### For Technical Issues:
1. Check this Quick Start guide
2. Review INFO_PAGES_README.md
3. Check component source files
4. Review implementation checklist

### For Content Changes:
1. Edit HTML files in component directories
2. Update i18n keys in info-pages.en.json
3. Test changes locally
4. Deploy to production

### For Styling Customization:
1. Edit SCSS files in component directories
2. Update color variables
3. Test responsive design
4. Verify accessibility

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] All 3 info pages accessible
- [ ] Home page shows infographics
- [ ] Tabs switch smoothly
- [ ] Routing works correctly
- [ ] Styling displays properly
- [ ] Mobile responsive
- [ ] Links functional
- [ ] Breadcrumbs present
- [ ] Page titles correct
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Accessibility compliant

---

## 🎓 Learning Resources

### Angular
- [Angular Documentation](https://angular.io/docs)
- [Angular Routing](https://angular.io/guide/routing)
- [Angular i18n](https://angular.io/guide/i18n)

### ng-bootstrap
- [ng-bootstrap Tabs](https://ng-bootstrap.github.io/#/components/nav)
- [ng-bootstrap Components](https://ng-bootstrap.github.io/)

### CSS/SCSS
- [SCSS Guide](https://sass-lang.com/guide)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

## 📅 Timeline Reference

| Phase | Duration | Status |
|-------|----------|--------|
| Design & Planning | - | ✅ Complete |
| Component Development | - | ✅ Complete |
| Routing Configuration | - | ✅ Complete |
| Styling & Theme | - | ✅ Complete |
| i18n Integration | - | ✅ Complete |
| Documentation | - | ✅ Complete |
| Testing & QA | TBD | ⏳ Next |
| Staging Deployment | TBD | ⏳ TBD |
| Production Deployment | TBD | ⏳ TBD |

---

## 🎉 You're Ready!

Everything is set up and ready to deploy. Follow the testing checklist, run through the verification steps, and you'll be good to go!

**Questions?** Check the other documentation files or review the source code comments.

**Need to customize?** Start with INFO_PAGES_README.md for detailed guidance.

**Something broken?** See the Troubleshooting section above.

---

**Last Updated**: May 2026  
**Status**: ✅ Ready for Testing & Deployment  
**Questions?**: Review documentation files or check source code

Good luck! 🚀
