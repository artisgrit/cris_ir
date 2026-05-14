import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessibilitySettingsService } from '../accessibility-settings.service';

/**
 * Screen Reader Component
 * Provides a hovering icon on the left side of the screen that enables text-to-speech functionality.
 * Reads the content on the page when activated.
 */
@Component({
  selector: 'ds-screen-reader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screen-reader.component.html',
  styleUrls: ['./screen-reader.component.scss'],
})
export class ScreenReaderComponent implements OnInit, OnDestroy {

  /**
   * Track if screen reader is currently speaking
   */
  isSpeaking = false;

  /**
   * Track if screen reader is currently paused
   */
  isPaused = false;

  /**
   * Whether the screen reader is currently active (speaking or paused)
   */
  get isActive(): boolean {
    return this.isSpeaking || this.isPaused;
  }

  /**
   * Track if screen reader is available (Web Speech API support)
   */
  isSupported = false;

  /**
   * Whether screen reader UI is enabled (via accessibility settings)
   */
  isEnabled = true;

  /**
   * The synth instance
   */
  private synth: SpeechSynthesis;

  /**
   * Stop the observable subscriptions
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Current utterance
   */
  private utterance: SpeechSynthesisUtterance;

  /**
   * Speech rate for text-to-speech (0.5 to 2)
   */
  speechRate = 1;

  /**
   * Speech language
   */
  speechLanguage = 'en-US';

  /**
   * Selected speech voice (SpeechSynthesisVoice.voiceURI)
   */
  speechVoiceURI: string | null = null;

  /**
   * Available voices from the browser
   */
  voices: SpeechSynthesisVoice[] = [];

  /**
   * Toggle settings panel visibility
   */
  showSettings = false;

  constructor(
    private accessibilitySettingsService: AccessibilitySettingsService,
  ) {
    this.isSupported = this.checkBrowserSupport();
  }

  ngOnInit(): void {
    if (this.isSupported) {
      this.synth = window.speechSynthesis;
      this.loadScreenReaderSettings();
      this.initVoices();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopReading();
  }

  /**
   * Check if the browser supports Web Speech API
   */
  private checkBrowserSupport(): boolean {
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || (window as any).webkitSpeechSynthesisUtterance;
    return !!SpeechSynthesisUtterance && !!window.speechSynthesis;
  }

  /**
   * Load screen reader settings from accessibility service
   */
  private loadScreenReaderSettings(): void {
    this.accessibilitySettingsService.get('screenReaderEnabled', 'true').pipe(
      takeUntil(this.destroy$),
    ).subscribe(enabled => {
      this.isEnabled = enabled !== 'false';
      if (!this.isEnabled) {
        this.stopReading();
        this.showSettings = false;
      }
    });

    this.accessibilitySettingsService.getAsNumber('screenReaderRate', 1).pipe(
      takeUntil(this.destroy$),
    ).subscribe(rate => {
      this.speechRate = rate;
    });

    this.accessibilitySettingsService.get('screenReaderLanguage', 'en-US').pipe(
      takeUntil(this.destroy$),
    ).subscribe(language => {
      this.speechLanguage = language;
    });

    this.accessibilitySettingsService.get('screenReaderVoice', '').pipe(
      takeUntil(this.destroy$),
    ).subscribe(voiceURI => {
      this.speechVoiceURI = voiceURI || null;
    });
  }

  private initVoices(): void {
    if (!this.synth) {
      return;
    }

    const load = () => {
      const loadedVoices = this.synth.getVoices();
      this.voices = Array.isArray(loadedVoices) ? loadedVoices : [];
      if (!this.speechVoiceURI && this.voices.length > 0) {
        const matchingLang = this.voices.find(v => v.lang === this.speechLanguage);
        this.speechVoiceURI = (matchingLang ?? this.voices[0]).voiceURI ?? null;
      }
    };

    load();
    this.synth.onvoiceschanged = () => load();
  }

  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }

  onRateChange(nextRate: number): void {
    const clamped = Math.min(2, Math.max(0.5, nextRate));
    this.speechRate = clamped;
    this.accessibilitySettingsService.updateSettings({ screenReaderRate: String(clamped) }).pipe(takeUntil(this.destroy$)).subscribe();
    if (this.isActive) {
      this.startReading();
    }
  }

  onLanguageChange(nextLang: string): void {
    this.speechLanguage = nextLang || 'en-US';
    this.accessibilitySettingsService.updateSettings({ screenReaderLanguage: this.speechLanguage }).pipe(takeUntil(this.destroy$)).subscribe();
    if (this.isActive) {
      this.startReading();
    }
  }

  onVoiceChange(nextVoiceURI: string): void {
    this.speechVoiceURI = nextVoiceURI || null;
    this.accessibilitySettingsService.updateSettings({ screenReaderVoice: this.speechVoiceURI ?? '' }).pipe(takeUntil(this.destroy$)).subscribe();
    if (this.isActive) {
      this.startReading();
    }
  }

  trackVoice(_index: number, voice: SpeechSynthesisVoice): string {
    return voice.voiceURI;
  }

  /**
   * Toggle screen reader on/off
   */
  toggleScreenReader(): void {
    if ((this.synth && (this.synth.speaking || this.synth.paused)) || this.isSpeaking || this.isPaused) {
      this.stopReading();
    } else {
      this.startReading();
    }
  }

  /**
   * Start reading the page content
   */
  startReading(): void {
    if (!this.isSupported) {
      console.warn('Screen reader not supported in this browser');
      return;
    }
    if (!this.isEnabled) {
      return;
    }

    // Stop any previous utterance
    this.stopReading();

    // Get the main content text
    const contentText = this.extractPageContent();

    if (!contentText) {
      console.warn('No content found to read');
      return;
    }

    // Create and configure utterance
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || (window as any).webkitSpeechSynthesisUtterance;
    this.utterance = new SpeechSynthesisUtterance(contentText);
    this.utterance.rate = this.speechRate;
    this.utterance.lang = this.speechLanguage;
    this.utterance.pitch = 1.0;
    this.utterance.volume = 1.0;
    if (this.speechVoiceURI && this.voices.length > 0) {
      const selectedVoice = this.voices.find(v => v.voiceURI === this.speechVoiceURI);
      if (selectedVoice) {
        this.utterance.voice = selectedVoice;
      }
    }

    // Set event handlers
    this.utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
    };

    this.utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
    };

    this.utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.isSpeaking = false;
      this.isPaused = false;
    };

    // Start speaking
    this.synth.speak(this.utterance);
  }

  /**
   * Stop reading the page content
   */
  stopReading(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
    if (this.synth && this.synth.paused) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
  }

  /**
   * Extract main content from the page
   */
  private extractPageContent(): string {
    const mainContent = document.querySelector('main') ||
                       document.querySelector('#main-content') ||
                       document.querySelector('[role="main"]') ||
                       document.body;

    if (!mainContent) {
      return '';
    }

    // Clone the element to avoid modifying the DOM
    const clone = mainContent.cloneNode(true) as HTMLElement;

    // Remove script and style tags
    const scripts = clone.querySelectorAll('script, style, nav, [aria-hidden="true"]');
    scripts.forEach(script => script.remove());

    // Get text content
    let text = clone.textContent || '';

    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim();

    // Limit to first 5000 characters to avoid extremely long readings
    if (text.length > 5000) {
      text = text.substring(0, 5000) + '...';
    }

    return text;
  }

  /**
   * Pause the current reading
   */
  pauseReading(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
      this.isSpeaking = false;
      this.isPaused = true;
    }
  }

  /**
   * Resume reading
   */
  resumeReading(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isSpeaking = true;
      this.isPaused = false;
    }
  }
}
