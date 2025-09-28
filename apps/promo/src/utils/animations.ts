import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation utilities
export class AnimationController {
  private static instance: AnimationController;
  private initialized = false;
  private triggers: ScrollTrigger[] = [];

  private constructor() {}

  public static getInstance(): AnimationController {
    if (!AnimationController.instance) {
      AnimationController.instance = new AnimationController();
    }
    return AnimationController.instance;
  }

  // Utility method to add performance optimizations to ScrollTrigger config
  private addPerformanceOptimizations(element: string | Element, config: any): any {
    const optimizedConfig = {
      ...config,
      once: config.once !== false, // Default to true unless explicitly set to false
      anticipatePin: config.anticipatePin || 1,
      onToggle: (self: any) => {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (target instanceof HTMLElement) {
          if (self.isActive) {
            target.style.willChange = 'transform, opacity';
          } else {
            target.style.willChange = 'auto';
          }
        }
        // Call original onToggle if it exists
        if (config.onToggle) config.onToggle(self);
      }
    };
    return optimizedConfig;
  }

  public init(): void {
    if (this.initialized) return;

    this.setupBatchAnimations();
    this.setupParallax();
    this.setupStaggerAnimations();
    this.setupCounters();

    this.initialized = true;

    // Refresh ScrollTrigger after all animations are set up
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }

  // Mobile-only initialization for counters only
  public initCountersOnly(): void {
    if (this.initialized) return;

    this.setupCounters();

    this.initialized = true;

    // Refresh ScrollTrigger after counter animations are set up
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }

  // Fade in animations
  public fadeIn(element: string | Element, options: GSAPAnimationOptions = {}): gsap.core.Timeline {
    const defaults = {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power2.out',
      delay: 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    };

    const config = { ...defaults, ...options };

    // Add performance optimizations to ScrollTrigger config
    if (config.scrollTrigger) {
      config.scrollTrigger = this.addPerformanceOptimizations(element, config.scrollTrigger);
    }

    return gsap.fromTo(element,
      { opacity: 0, y: config.y },
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease,
        immediateRender: false,
        scrollTrigger: config.scrollTrigger
      }
    );
  }

  // Slide in from left
  public slideInLeft(element: string | Element, options: GSAPAnimationOptions = {}): gsap.core.Timeline {
    const defaults = {
      duration: 0.8,
      x: -50,
      opacity: 0,
      ease: 'power2.out',
      delay: 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    };

    const config = { ...defaults, ...options };

    // Add performance optimizations to ScrollTrigger config
    if (config.scrollTrigger) {
      config.scrollTrigger = this.addPerformanceOptimizations(element, config.scrollTrigger);
    }

    return gsap.fromTo(element,
      { opacity: 0, x: config.x },
      {
        opacity: 1,
        x: 0,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease,
        immediateRender: false,
        scrollTrigger: config.scrollTrigger
      }
    );
  }

  // Slide in from right
  public slideInRight(element: string | Element, options: GSAPAnimationOptions = {}): gsap.core.Timeline {
    const defaults = {
      duration: 0.8,
      x: 50,
      opacity: 0,
      ease: 'power2.out',
      delay: 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    };

    const config = { ...defaults, ...options };

    // Add performance optimizations to ScrollTrigger config
    if (config.scrollTrigger) {
      config.scrollTrigger = this.addPerformanceOptimizations(element, config.scrollTrigger);
    }

    return gsap.fromTo(element,
      { opacity: 0, x: config.x },
      {
        opacity: 1,
        x: 0,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease,
        immediateRender: false,
        scrollTrigger: config.scrollTrigger
      }
    );
  }

  // Scale in animation
  public scaleIn(element: string | Element, options: GSAPAnimationOptions = {}): gsap.core.Timeline {
    const defaults = {
      duration: 0.6,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out(1.7)',
      delay: 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    };

    const config = { ...defaults, ...options };

    // Add performance optimizations to ScrollTrigger config
    if (config.scrollTrigger) {
      config.scrollTrigger = this.addPerformanceOptimizations(element, config.scrollTrigger);
    }

    return gsap.fromTo(element,
      { opacity: 0, scale: config.scale },
      {
        opacity: 1,
        scale: 1,
        duration: config.duration,
        delay: config.delay,
        ease: config.ease,
        immediateRender: false,
        scrollTrigger: config.scrollTrigger
      }
    );
  }

  // Stagger animation for multiple elements
  public staggerIn(elements: string | Element[], options: GSAPStaggerOptions = {}): gsap.core.Timeline {
    const defaults = {
      duration: 0.6,
      stagger: 0.1,
      y: 30,
      opacity: 0,
      ease: 'power2.out',
      delay: 0,
      scrollTrigger: {
        trigger: elements,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    };

    const config = { ...defaults, ...options };

    // Add performance optimizations for stagger elements
    if (config.scrollTrigger) {
      const originalOnToggle = config.scrollTrigger.onToggle;
      config.scrollTrigger.onToggle = (self: any) => {
        const elementsArray = Array.isArray(elements) ? elements : [elements];
        elementsArray.forEach((element) => {
          const target = typeof element === 'string' ? document.querySelector(element) : element;
          if (target instanceof HTMLElement) {
            if (self.isActive) {
              target.style.willChange = 'transform, opacity';
            } else {
              target.style.willChange = 'auto';
            }
          }
        });
        if (originalOnToggle) originalOnToggle(self);
      };
    }

    return gsap.fromTo(elements,
      { opacity: 0, y: config.y },
      {
        opacity: 1,
        y: 0,
        duration: config.duration,
        delay: config.delay,
        stagger: config.stagger,
        ease: config.ease,
        immediateRender: false,
        scrollTrigger: config.scrollTrigger
      }
    );
  }

  // Counter animation
  public animateCounter(element: string | Element, options: CounterOptions = {}): gsap.core.Timeline {
    const defaults = {
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 95%',
        toggleActions: 'play none none none',
        once: true
      }
    };

    const config = { ...defaults, ...options };
    const target = typeof element === 'string' ? document.querySelector(element) : element;

    if (!target) {
      console.warn('Counter target not found:', element);
      return gsap.timeline();
    }

    const originalText = target.textContent || '0';

    // Make counter visible immediately
    gsap.set(target, { opacity: 1 });

    // Store original text for non-numeric values like "< 100ms"
    target.setAttribute('data-original-text', originalText.trim());

    // Check if this is a numeric counter that should animate
    const numericMatch = originalText.match(/^([0-9,]+\.?[0-9]*)/);
    const isNumericCounter = numericMatch !== null;

    if (!isNumericCounter) {
      // For non-numeric values like "< 100ms", just return empty timeline
      return gsap.timeline();
    }

    // Parse numeric counter values
    const suffixMatch = originalText.match(/([^0-9,.]*)$/);
    const numericPart = numericMatch[1].replace(/,/g, ''); // Remove commas
    const endValue = parseFloat(numericPart);
    const suffix = suffixMatch ? suffixMatch[1] : '';
    const hasDecimal = originalText.includes('.');
    const hasCommas = originalText.includes(',');

    const counter = { value: 0 };

    // Create timeline and add ScrollTrigger to it
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: target,
        start: 'top 95%',
        toggleActions: 'play none none none',
        once: true
      }
    });

    // Add the counter animation to the timeline
    timeline.to(counter, {
      value: endValue,
      duration: config.duration,
      ease: config.ease,
      onStart: () => {
        // Store original value for fallback and start from 0 for animation
        const fallbackValue = target.textContent;
        target.setAttribute('data-original-value', fallbackValue || '');
        target.textContent = '0' + suffix;
      },
      onUpdate: () => {
        let currentValue: string;
        if (hasDecimal) {
          currentValue = counter.value.toFixed(1);
        } else {
          currentValue = Math.round(counter.value).toString();
        }

        // Add commas if original had them and number is >= 1000
        if (hasCommas && Math.round(counter.value) >= 1000) {
          currentValue = Math.round(counter.value).toLocaleString();
        }

        target.textContent = currentValue + suffix;
      },
      onComplete: () => {
        // Ensure final value is correct
        let finalValue: string;
        if (hasDecimal) {
          finalValue = endValue.toFixed(1);
        } else {
          finalValue = Math.round(endValue).toString();
        }

        // Add commas if original had them and number is >= 1000
        if (hasCommas && endValue >= 1000) {
          finalValue = Math.round(endValue).toLocaleString();
        }

        target.textContent = finalValue + suffix;
      }
    });

    return timeline;
  }

  // Parallax effect
  public parallax(element: string | Element, options: ParallaxOptions = {}): ScrollTrigger {
    const defaults = {
      speed: 0.5,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    };

    const config = { ...defaults, ...options };

    return ScrollTrigger.create({
      trigger: element,
      start: config.start,
      end: config.end,
      scrub: config.scrub,
      onUpdate: (self) => {
        const progress = self.progress;
        const yPos = progress * 100 * config.speed;
        gsap.set(element, { y: yPos });
      }
    });
  }

  // Reveal text animation
  public revealText(element: string | Element, options: TextRevealOptions = {}): gsap.core.Timeline {
    const defaults = {
      duration: 1,
      ease: 'power2.out',
      stagger: 0.02,
      delay: 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    };

    const config = { ...defaults, ...options };
    const target = typeof element === 'string' ? document.querySelector(element) : element;

    if (!target) return gsap.timeline();

    // Split text into words or characters
    const text = target.textContent || '';
    const words = text.split(' ');

    target.innerHTML = words.map(word =>
      `<span class="word">${word.split('').map(char =>
        `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(20px);">${char}</span>`
      ).join('')}</span>`
    ).join(' ');

    const chars = target.querySelectorAll('.char');

    return gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: config.duration,
      delay: config.delay,
      stagger: config.stagger,
      ease: config.ease,
      immediateRender: false,
      scrollTrigger: config.scrollTrigger
    });
  }

  // Private method to setup batch animations for better performance
  private setupBatchAnimations(): void {
    // Helper function to get delay from data attribute
    const getDelay = (element: Element): number => {
      const delay = element.getAttribute('data-delay');
      return delay ? parseInt(delay) / 1000 : 0;
    };

    // Batch fade-in and fade-up animations together
    const fadeElements = document.querySelectorAll('[data-animate="fade-in"], [data-animate="fade-up"]');
    if (fadeElements.length > 0) {
      ScrollTrigger.batch(fadeElements, {
        interval: 0.1,
        batchMax: 3,
        onEnter: (batch) => {
          batch.forEach((el, index) => {
            const delay = getDelay(el);
            gsap.fromTo(el,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: delay + index * 0.1,
                ease: 'power2.out'
              }
            );
          });
        },
        once: true,
        start: 'top 85%'
      });
    }

    // Batch slide animations
    const slideLeftElements = document.querySelectorAll('[data-animate="slide-left"]');
    if (slideLeftElements.length > 0) {
      ScrollTrigger.batch(slideLeftElements, {
        interval: 0.1,
        batchMax: 3,
        onEnter: (batch) => {
          batch.forEach((el, index) => {
            const delay = getDelay(el);
            gsap.fromTo(el,
              { opacity: 0, x: -50 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: delay + index * 0.1,
                ease: 'power2.out'
              }
            );
          });
        },
        once: true,
        start: 'top 85%'
      });
    }

    const slideRightElements = document.querySelectorAll('[data-animate="slide-right"]');
    if (slideRightElements.length > 0) {
      ScrollTrigger.batch(slideRightElements, {
        interval: 0.1,
        batchMax: 3,
        onEnter: (batch) => {
          batch.forEach((el, index) => {
            const delay = getDelay(el);
            gsap.fromTo(el,
              { opacity: 0, x: 50 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: delay + index * 0.1,
                ease: 'power2.out'
              }
            );
          });
        },
        once: true,
        start: 'top 85%'
      });
    }

    // Batch scale animations
    const scaleElements = document.querySelectorAll('[data-animate="scale-in"]');
    if (scaleElements.length > 0) {
      ScrollTrigger.batch(scaleElements, {
        interval: 0.1,
        batchMax: 3,
        onEnter: (batch) => {
          batch.forEach((el, index) => {
            const delay = getDelay(el);
            gsap.fromTo(el,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: delay + index * 0.1,
                ease: 'back.out(1.7)'
              }
            );
          });
        },
        once: true,
        start: 'top 85%'
      });
    }

    // Handle text reveal animations individually (they need special processing)
    document.querySelectorAll('[data-animate="split-text"]').forEach(el => {
      const delay = getDelay(el);
      this.revealText(el, { delay });
    });

    // Handle stagger containers
    document.querySelectorAll('[data-animate="stagger-up"], [data-stagger]').forEach(container => {
      const children = container.children;
      if (children.length > 0) {
        const delay = getDelay(container);
        ScrollTrigger.create({
          trigger: container,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(children,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: delay,
                stagger: 0.1,
                ease: 'power2.out'
              }
            );
          }
        });
      }
    });

  }

  // Private method to setup counter animations
  private setupCounters(): void {
    // Helper function to get delay from data attribute
    const getDelay = (element: Element): number => {
      const delay = element.getAttribute('data-delay');
      return delay ? parseInt(delay) / 1000 : 0;
    };

    // Handle counter animations
    const counterElements = document.querySelectorAll('[data-counter]');

    counterElements.forEach((el) => {
      const delay = getDelay(el);
      const originalText = (el.textContent || '0').trim();

      // Make counter visible immediately by setting opacity to 1
      gsap.set(el, { opacity: 1 });

      // Store original text for non-numeric values like "< 100ms"
      el.setAttribute('data-original-text', originalText);

      // Check if this is a numeric counter that should animate
      const numericMatch = originalText.match(/^([0-9,]+\.?[0-9]*)/);
      const isNumericCounter = numericMatch !== null;

      if (!isNumericCounter) {
        // For non-numeric values like "< 100ms", just keep them visible
        return;
      }

      // Parse numeric counter values
      const suffixMatch = originalText.match(/([^0-9,.]*)$/);
      const numericPart = numericMatch[1].replace(/,/g, ''); // Remove commas
      const endValue = parseFloat(numericPart);
      const suffix = suffixMatch ? suffixMatch[1] : '';
      const hasDecimal = originalText.includes('.');
      const hasCommas = originalText.includes(',');

      ScrollTrigger.create({
        trigger: el,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          const counter = { value: 0 };

          // Set initial state to show 0 only when animation starts
          el.textContent = '0' + suffix;

          // Animate the counter
          gsap.to(counter, {
            value: endValue,
            duration: 2,
            delay: delay,
            ease: 'power2.out',
            onUpdate: () => {
              let currentValue: string;
              if (hasDecimal) {
                currentValue = counter.value.toFixed(1);
              } else {
                currentValue = Math.round(counter.value).toString();
              }

              // Add commas if original had them and number is >= 1000
              if (hasCommas && Math.round(counter.value) >= 1000) {
                currentValue = Math.round(counter.value).toLocaleString();
              }

              el.textContent = currentValue + suffix;
            },
            onComplete: () => {
              // Ensure final value is correct
              let finalValue: string;
              if (hasDecimal) {
                finalValue = endValue.toFixed(1);
              } else {
                finalValue = Math.round(endValue).toString();
              }

              // Add commas if original had them and number is >= 1000
              if (hasCommas && endValue >= 1000) {
                finalValue = Math.round(endValue).toLocaleString();
              }

              el.textContent = finalValue + suffix;
            }
          });
        }
      });
    });
  }

  // Private method to setup parallax effects
  private setupParallax(): void {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax') || '0.5');
      this.parallax(el, { speed });
    });
  }

  // Private method to setup stagger animations
  private setupStaggerAnimations(): void {
    document.querySelectorAll('[data-reveal-text]').forEach(el => {
      this.revealText(el);
    });
  }

  // Cleanup method
  public destroy(): void {
    // Kill all ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // Kill all tweens
    gsap.killTweensOf('*');
    // Clear triggers array
    this.triggers = [];
    this.initialized = false;
  }

  // Refresh ScrollTrigger (useful for dynamic content)
  public refresh(): void {
    ScrollTrigger.refresh();
  }

  // Get initialization status
  public get isInitialized(): boolean {
    return this.initialized;
  }
}

// Type definitions
interface GSAPAnimationOptions {
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  ease?: string;
  delay?: number;
  scrollTrigger?: ScrollTriggerOptions;
}

interface GSAPStaggerOptions extends GSAPAnimationOptions {
  stagger?: number;
}

interface CounterOptions {
  duration?: number;
  ease?: string;
  scrollTrigger?: ScrollTriggerOptions;
}

interface ParallaxOptions {
  speed?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

interface TextRevealOptions {
  duration?: number;
  ease?: string;
  stagger?: number;
  delay?: number;
  scrollTrigger?: ScrollTriggerOptions;
}

interface ScrollTriggerOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  pin?: boolean;
  anticipatePin?: number;
}

// Export singleton instance
export const animations = AnimationController.getInstance();

// Export GSAP for direct use if needed
export { gsap, ScrollTrigger };