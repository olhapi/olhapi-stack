import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Helper function to get delay from data attribute
const getDelay = (element: Element): number => {
    const delay = element.getAttribute('data-delay');
    return delay ? Number.parseInt(delay) / 1000 : 0;
};

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
    private addPerformanceOptimizations(
        element: string | Element,
        config: Record<string, unknown>,
    ): Record<string, unknown> {
        const optimizedConfig = {
            ...config,
            once: config.once !== false, // Default to true unless explicitly set to false
            anticipatePin: config.anticipatePin || 1,
            onToggle: (self: { isActive: boolean }) => {
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
            },
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
            delay: 0, duration: 0.8, ease: 'power2.out', opacity: 0, scrollTrigger: {
                start: 'top 85%', toggleActions: 'play none none reverse', trigger: element,
            }, y: 30,
        };

        const config = { ...defaults, ...options };

        // Add performance optimizations to ScrollTrigger config
        if (config.scrollTrigger) {
            config.scrollTrigger = this.addPerformanceOptimizations(element, config.scrollTrigger);
        }

        return gsap.fromTo(
            element,
            { opacity: 0, y: config.y },
            {
                delay: config.delay, duration: config.duration, ease: config.ease, immediateRender: false, opacity: 1, scrollTrigger: config.scrollTrigger, y: 0,
            },
        );
    }

    // Slide in from left
    public slideInLeft(element: string | Element, options: GSAPAnimationOptions = {}): gsap.core.Timeline {
        const defaults = {
            delay: 0, duration: 0.8, ease: 'power2.out', opacity: 0, scrollTrigger: {
                start: 'top 85%', toggleActions: 'play none none reverse', trigger: element,
            }, x: -50,
        };

        const config = { ...defaults, ...options };

        // Add performance optimizations to ScrollTrigger config
        if (config.scrollTrigger) {
            config.scrollTrigger = this.addPerformanceOptimizations(element, config.scrollTrigger);
        }

        return gsap.fromTo(
            element,
            { opacity: 0, x: config.x },
            {
                delay: config.delay, duration: config.duration, ease: config.ease, immediateRender: false, opacity: 1, scrollTrigger: config.scrollTrigger, x: 0,
            },
        );
    }

    // Slide in from right
    public slideInRight(element: string | Element, options: GSAPAnimationOptions = {}): gsap.core.Timeline {
        const defaults = {
            delay: 0, duration: 0.8, ease: 'power2.out', opacity: 0, scrollTrigger: {
                start: 'top 85%', toggleActions: 'play none none reverse', trigger: element,
            }, x: 50,
        };

        const config = { ...defaults, ...options };

        // Add performance optimizations to ScrollTrigger config
        if (config.scrollTrigger) {
            config.scrollTrigger = this.addPerformanceOptimizations(element, config.scrollTrigger);
        }

        return gsap.fromTo(
            element,
            { opacity: 0, x: config.x },
            {
                delay: config.delay, duration: config.duration, ease: config.ease, immediateRender: false, opacity: 1, scrollTrigger: config.scrollTrigger, x: 0,
            },
        );
    }

    // Scale in animation
    public scaleIn(element: string | Element, options: GSAPAnimationOptions = {}): gsap.core.Timeline {
        const defaults = {
            delay: 0, duration: 0.6, ease: 'back.out(1.7)', opacity: 0, scale: 0.8, scrollTrigger: {
                start: 'top 85%', toggleActions: 'play none none reverse', trigger: element,
            },
        };

        const config = { ...defaults, ...options };

        // Add performance optimizations to ScrollTrigger config
        if (config.scrollTrigger) {
            config.scrollTrigger = this.addPerformanceOptimizations(element, config.scrollTrigger);
        }

        return gsap.fromTo(
            element,
            { opacity: 0, scale: config.scale },
            {
                delay: config.delay, duration: config.duration, ease: config.ease, immediateRender: false, opacity: 1, scale: 1, scrollTrigger: config.scrollTrigger,
            },
        );
    }

    // Stagger animation for multiple elements
    public staggerIn(elements: string | Element[], options: GSAPStaggerOptions = {}): gsap.core.Timeline {
        const defaults = {
            delay: 0, duration: 0.6, ease: 'power2.out', opacity: 0, scrollTrigger: {
                start: 'top 85%', toggleActions: 'play none none reverse', trigger: elements,
            }, stagger: 0.1, y: 30,
        };

        const config = { ...defaults, ...options };

        // Add performance optimizations for stagger elements
        if (config.scrollTrigger) {
            const originalOnToggle = (config.scrollTrigger as Record<string, unknown>).onToggle;
            (config.scrollTrigger as Record<string, unknown>).onToggle = (self: { isActive: boolean }) => {
                const elementsArray = Array.isArray(elements) ? elements : [elements];
                for (const element of elementsArray) {
                    const target = typeof element === 'string' ? document.querySelector(element) : element;
                    if (target instanceof HTMLElement) {
                        if (self.isActive) {
                            target.style.willChange = 'transform, opacity';
                        } else {
                            target.style.willChange = 'auto';
                        }
                    }
                }
                if (originalOnToggle) originalOnToggle(self);
            };
        }

        return gsap.fromTo(
            elements,
            { opacity: 0, y: config.y },
            {
                delay: config.delay, duration: config.duration, ease: config.ease, immediateRender: false, opacity: 1, scrollTrigger: config.scrollTrigger, stagger: config.stagger, y: 0,
            },
        );
    }

    // Counter animation
    public animateCounter(element: string | Element, options: CounterOptions = {}): gsap.core.Timeline {
        const defaults = {
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                once: true, start: 'top 95%', toggleActions: 'play none none none', trigger: element,
            },
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
        const numericPart = numericMatch[1].replaceAll(',', ''); // Remove commas
        const endValue = Number.parseFloat(numericPart);
        const suffix = suffixMatch ? suffixMatch[1] : '';
        const hasDecimal = originalText.includes('.');
        const hasCommas = originalText.includes(',');

        const counter = { value: 0 };

        // Create timeline and add ScrollTrigger to it
        const timeline = gsap.timeline({
            scrollTrigger: {
                once: true, start: 'top 95%', toggleActions: 'play none none none', trigger: target,
            },
        });

        // Add the counter animation to the timeline
        timeline.to(counter, {
            duration: config.duration, ease: config.ease, onComplete: () => {
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
            }, onStart: () => {
                // Store original value for fallback and start from 0 for animation
                const fallbackValue = target.textContent;
                target.setAttribute('data-original-value', fallbackValue || '');
                target.textContent = '0' + suffix;
            }, onUpdate: () => {
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
            }, value: endValue,
        });

        return timeline;
    }

    // Parallax effect
    public parallax(element: string | Element, options: ParallaxOptions = {}): ScrollTrigger {
        const defaults = {
            end: 'bottom top', scrub: true, speed: 0.5, start: 'top bottom',
        };

        const config = { ...defaults, ...options };

        return ScrollTrigger.create({
            end: config.end, onUpdate: (self) => {
                const progress = self.progress;
                const yPos = progress * 100 * config.speed;
                gsap.set(element, { y: yPos });
            }, scrub: config.scrub, start: config.start, trigger: element,
        });
    }

    // Reveal text animation
    public revealText(element: string | Element, options: TextRevealOptions = {}): gsap.core.Timeline {
        const defaults = {
            delay: 0, duration: 1, ease: 'power2.out', scrollTrigger: {
                start: 'top 85%', toggleActions: 'play none none reverse', trigger: element,
            }, stagger: 0.02,
        };

        const config = { ...defaults, ...options };
        const target = typeof element === 'string' ? document.querySelector(element) : element;

        if (!target) return gsap.timeline();

        // Split text into words or characters
        const text = target.textContent || '';
        const words = text.split(' ');

        target.innerHTML = words
            .map(
                (word) =>
                    `<span class="word">${word
                        .split('')
                        .map(
                            (char) =>
                                `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(20px);">${char}</span>`,
                        )
                        .join('')}</span>`,
            )
            .join(' ');

        const chars = target.querySelectorAll('.char');

        return gsap.to(chars, {
            delay: config.delay, duration: config.duration, ease: config.ease, immediateRender: false, opacity: 1, scrollTrigger: config.scrollTrigger, stagger: config.stagger, y: 0,
        });
    }

    // Private method to setup batch animations for better performance
    private setupBatchAnimations(): void {
        // Batch fade-in and fade-up animations together
        const fadeElements = document.querySelectorAll('[data-animate="fade-in"], [data-animate="fade-up"]');
        if (fadeElements.length > 0) {
            ScrollTrigger.batch(fadeElements, {
                batchMax: 3, interval: 0.1, onEnter: (batch) => {
                    for (const [index, el] of batch.entries()) {
                        const delay = getDelay(el);
                        gsap.fromTo(
                            el,
                            { opacity: 0, y: 30 },
                            {
                                delay: delay + index * 0.1, duration: 0.8, ease: 'power2.out', opacity: 1, y: 0,
                            },
                        );
                    }
                }, once: true, start: 'top 85%',
            });
        }

        // Batch slide animations
        const slideLeftElements = document.querySelectorAll('[data-animate="slide-left"]');
        if (slideLeftElements.length > 0) {
            ScrollTrigger.batch(slideLeftElements, {
                batchMax: 3, interval: 0.1, onEnter: (batch) => {
                    for (const [index, el] of batch.entries()) {
                        const delay = getDelay(el);
                        gsap.fromTo(
                            el,
                            { opacity: 0, x: -50 },
                            {
                                delay: delay + index * 0.1, duration: 0.8, ease: 'power2.out', opacity: 1, x: 0,
                            },
                        );
                    }
                }, once: true, start: 'top 85%',
            });
        }

        const slideRightElements = document.querySelectorAll('[data-animate="slide-right"]');
        if (slideRightElements.length > 0) {
            ScrollTrigger.batch(slideRightElements, {
                batchMax: 3, interval: 0.1, onEnter: (batch) => {
                    batch.forEach((el, index) => {
                        const delay = getDelay(el);
                        gsap.fromTo(
                            el,
                            { opacity: 0, x: 50 },
                            {
                                delay: delay + index * 0.1, duration: 0.8, ease: 'power2.out', opacity: 1, x: 0,
                            },
                        );
                    });
                }, once: true, start: 'top 85%',
            });
        }

        // Batch scale animations
        const scaleElements = document.querySelectorAll('[data-animate="scale-in"]');
        if (scaleElements.length > 0) {
            ScrollTrigger.batch(scaleElements, {
                batchMax: 3, interval: 0.1, onEnter: (batch) => {
                    batch.forEach((el, index) => {
                        const delay = getDelay(el);
                        gsap.fromTo(
                            el,
                            { opacity: 0, scale: 0.8 },
                            {
                                delay: delay + index * 0.1, duration: 0.6, ease: 'back.out(1.7)', opacity: 1, scale: 1,
                            },
                        );
                    });
                }, once: true, start: 'top 85%',
            });
        }

        // Handle text reveal animations individually (they need special processing)
        document.querySelectorAll('[data-animate="split-text"]').forEach((el) => {
            const delay = getDelay(el);
            this.revealText(el, { delay });
        });

        // Handle stagger containers
        document.querySelectorAll('[data-animate="stagger-up"], [data-stagger]').forEach((container) => {
            const children = container.children;
            if (children.length > 0) {
                const delay = getDelay(container);
                ScrollTrigger.create({
                    onEnter: () => {
                        gsap.fromTo(
                            children,
                            { opacity: 0, y: 30 },
                            {
                                delay: delay, duration: 0.6, ease: 'power2.out', opacity: 1, stagger: 0.1, y: 0,
                            },
                        );
                    }, once: true, start: 'top 85%', trigger: container,
                });
            }
        });
    }

    // Private method to setup counter animations
    private setupCounters(): void {
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
            const numericPart = numericMatch[1].replaceAll(',', ''); // Remove commas
            const endValue = Number.parseFloat(numericPart);
            const suffix = suffixMatch ? suffixMatch[1] : '';
            const hasDecimal = originalText.includes('.');
            const hasCommas = originalText.includes(',');

            ScrollTrigger.create({
                onEnter: () => {
                    const counter = { value: 0 };

                    // Set initial state to show 0 only when animation starts
                    el.textContent = '0' + suffix;

                    // Animate the counter
                    gsap.to(counter, {
                        delay: delay, duration: 2, ease: 'power2.out', onComplete: () => {
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
                        }, onUpdate: () => {
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
                        }, value: endValue,
                    });
                }, once: true, start: 'top 95%', trigger: el,
            });
        });
    }

    // Private method to setup parallax effects
    private setupParallax(): void {
        document.querySelectorAll('[data-parallax]').forEach((el) => {
            const speed = Number.parseFloat(el.getAttribute('data-parallax') || '0.5');
            this.parallax(el, { speed });
        });
    }

    // Private method to setup stagger animations
    private setupStaggerAnimations(): void {
        document.querySelectorAll('[data-reveal-text]').forEach((el) => {
            this.revealText(el);
        });
    }

    // Cleanup method
    public destroy(): void {
        // Kill all ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
