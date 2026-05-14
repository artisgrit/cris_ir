/**
 * Screen Reader Feature Integration Guide
 * 
 * The screen reader feature provides a hovering icon on the left side of the screen
 * that enables text-to-speech functionality for page content.
 * 
 * FEATURES:
 * - Floating icon on the left side of the page
 * - Text-to-speech functionality for page content
 * - Play/Pause/Stop controls
 * - Configurable speech rate and language
 * - Accessibility compliant
 * - Responsive design (mobile & desktop)
 * - Browser support detection
 * 
 * INTEGRATION STEPS:
 * 
 * 1. Import the ScreenReaderModule in your app module or shell module:
 * 
 *    import { ScreenReaderModule } from './accessibility/screen-reader/screen-reader.module';
 *    
 *    @NgModule({
 *      imports: [
 *        ScreenReaderModule,
 *        // ... other imports
 *      ],
 *    })
 *    export class AppModule { }
 * 
 * 2. Add the component to your app shell or root layout template:
 * 
 *    <ds-screen-reader></ds-screen-reader>
 * 
 * 3. (Optional) Configure screen reader settings in accessibility settings component:
 *    - Add form controls for screenReaderEnabled, screenReaderRate, and screenReaderLanguage
 * 
 * USAGE:
 * 
 * Users can:
 * - Click the floating icon to toggle screen reader on/off
 * - Use play/pause/stop buttons when active
 * - Automatically read main page content
 * - Works in all modern browsers supporting Web Speech API
 * 
 * BROWSER SUPPORT:
 * - Chrome 25+
 * - Firefox 49+
 * - Safari 14.1+
 * - Edge 79+
 * - Opera 27+
 * 
 * SETTINGS:
 * - screenReaderEnabled: boolean - Enable/disable screen reader
 * - screenReaderRate: number - Speech rate (0.5 to 2, default 1)
 * - screenReaderLanguage: string - Speech language (default 'en-US')
 * 
 * STYLING:
 * - Fixed position on left side at 50% vertical position
 * - Gradient background matching UCU branding
 * - Responsive adjustments for mobile
 * - Smooth animations and transitions
 * 
 * ACCESSIBILITY:
 * - Keyboard navigable
 * - ARIA labels for screen readers
 * - Focus indicators
 * - Live region announcements
 */
