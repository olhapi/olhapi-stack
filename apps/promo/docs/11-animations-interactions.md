# Animations & Interactions Guide

## Overview
This document defines the animation and interaction patterns used throughout the website. All animations should enhance user experience, provide feedback, and create a modern, polished feel without sacrificing performance or accessibility.

## Core Animation Principles

### 1. Purpose-Driven
Every animation should serve a specific purpose:
- **Orient**: Help users understand where they are
- **Guide**: Direct attention to important elements
- **Feedback**: Confirm user actions
- **Delight**: Add personality without distraction
- **Continuity**: Create smooth transitions between states

### 2. Performance First
- Animations should run at 60fps
- Use CSS transforms and opacity for best performance
- Avoid animating layout properties (width, height, top, left)
- Implement will-change for heavy animations
- Use GPU acceleration where beneficial
- GSAP provides optimized performance for complex animations
- Use ScrollTrigger sparingly for key reveal moments only

### 3. Accessibility
- Respect prefers-reduced-motion setting
- Provide instant state changes as fallback
- Ensure animations don't interfere with content
- Avoid rapid flashing or strobing effects
- Keep essential information visible without animation

## Animation Timing

### Duration Scale
```css
--duration-instant: 0ms;       /* Immediate changes */
--duration-fast: 150ms;        /* Micro-interactions */
--duration-normal: 300ms;      /* Standard transitions */
--duration-slow: 500ms;        /* Emphasis animations */
--duration-slower: 700ms;      /* Complex animations */
--duration-slowest: 1000ms;    /* Major transitions */
```

### Easing Functions
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.5, 1.5, 0.5, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Usage Guidelines
- **Fast (150ms)**: Hover states, small UI feedback
- **Normal (300ms)**: Most transitions, state changes
- **Slow (500ms)**: Page transitions, large element changes
- **Slower (700ms)**: Complex orchestrated animations
- **Slowest (1000ms)**: Loading sequences, major reveals

## Page Load Animations

### Initial Page Load

#### Hero Section
- **Sequence**: Staggered fade-in from top
- **Timing**: 300ms delay, 500ms duration
- **Elements Order**:
  1. Background/gradient (instant)
  2. Headline (delay: 0ms)
  3. Subheadline (delay: 100ms)
  4. CTA buttons (delay: 200ms)
  5. Hero image (delay: 300ms)

#### Content Sections
- **Trigger**: Intersection Observer (75% visible)
- **Animation**: Fade up with subtle scale
- **Timing**: 400ms duration, ease-out
- **Stagger**: 50ms between elements

### Navigation Animations

#### Header Scroll
- **Trigger**: Scroll > 100px
- **Changes**:
  - Background: transparent → solid
  - Shadow: none → subtle shadow
  - Height: 80px → 64px
- **Timing**: 300ms ease-in-out

#### Mobile Menu
- **Open Animation**:
  - Overlay: fade in (200ms)
  - Panel: slide from right (300ms)
  - Menu items: stagger fade-in (50ms delay each)
- **Close Animation**:
  - Reverse sequence, 200ms duration

#### Dropdown Menus
- **Open**: Scale from 0.95 → 1, opacity 0 → 1
- **Timing**: 200ms ease-out
- **Close**: Instant on mouse leave after 150ms delay

## Scroll-Triggered Animations

### GSAP ScrollTrigger Integration

#### Strategic Usage Guidelines
- **Maximum 3-5 ScrollTrigger instances per page** for performance
- **Hero Headlines**: SplitText reveal for main headlines only
- **Key Sections**: Feature introductions and major CTAs
- **Social Proof**: Testimonials and stats with elegant reveals
- **Conversion Points**: Pricing and CTA sections with attention-grabbing animations
- **Avoid Overuse**: Not every section needs scroll animations

#### Text Reveal with SplitText
**Primary Use Cases**:
- Main hero headline (most important)
- Section titles (Features, About, Pricing)
- Key value propositions and taglines
- **Never for**: Body text, navigation, or secondary content

**Animation Patterns**:
- **Split Method**: By words (preferred) or lines for performance
- **Stagger Delay**: 0.1s between words, 0.2s between lines
- **Duration**: 0.6-0.8s per element
- **Easing**: "power2.out" or "back.out(1.7)" for personality
- **Trigger Point**: When 50% of element enters viewport

#### Section Reveals with ScrollTrigger
**Use Cases**:
- Feature cards grid entrance
- Pricing table reveal
- Team member introductions
- Testimonial cards
- Statistics/metrics counters

**Animation Settings**:
- **Transform**: Fade in with 30px y-offset
- **Stagger**: 0.15s between cards/elements
- **Duration**: 0.8s for smooth feel
- **Easing**: "power3.out" for natural motion
- **Trigger**: When 75% of section is visible

### CSS Fallback Animations

#### Fade In Up (Fallback)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Scale In (Fallback)
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

#### Slide In From Left/Right (Fallback)
```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Parallax Effects
- **Hero Images**: Move 50% of scroll speed
- **Background Patterns**: Move 25% of scroll speed
- **Floating Elements**: Multi-layer, different speeds
- **Performance**: Use transform3d for GPU acceleration

### Progress Indicators
- **Reading Progress**: Top bar filling on scroll
- **Section Progress**: Dots/steps highlighting
- **Back to Top**: Show after 500px scroll

## Hover Interactions

### Button Hovers

#### Primary Button
- **Scale**: 1 → 1.02
- **Shadow**: Increase elevation
- **Background**: Slight brightness increase
- **Timing**: 200ms ease-out

#### Ghost Button
- **Background**: transparent → subtle fill
- **Border**: Increase opacity
- **Text**: Color shift
- **Timing**: 200ms ease-in-out

### Card Hovers

#### Lift Effect
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  transition: all 300ms ease-out;
}
```

#### Reveal Content
- **Image**: Scale 1 → 1.05
- **Overlay**: Fade in additional info
- **Actions**: Slide up from bottom

### Link Hovers
- **Text Links**: Underline slide in from left
- **Nav Links**: Background color transition
- **Icon Links**: Icon rotation or bounce

## Micro-interactions

### Form Interactions

#### Input Focus
- **Border**: Color change with glow
- **Label**: Float up and shrink
- **Helper Text**: Fade in
- **Timing**: 200ms ease-out

#### Validation Feedback
- **Success**: Green checkmark fade-in
- **Error**: Red highlight with shake
- **Shake Animation**:
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
```

#### Submit Button
- **Click**: Scale down to 0.98
- **Loading**: Spinner replace text
- **Success**: Checkmark morph
- **Error**: Shake with color change

### Toggle Animations

#### Switch Toggle
- **Thumb**: Slide with spring easing
- **Background**: Color transition
- **Timing**: 300ms ease-spring

#### Accordion Expand
- **Arrow**: Rotate 180°
- **Content**: Height auto with max-height trick
- **Timing**: 300ms ease-in-out

#### Tab Switch
- **Indicator**: Slide to new position
- **Content**: Fade out → fade in
- **Timing**: 200ms for indicator, 150ms for content

## Loading Animations

### Skeleton Screens
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### Spinner Variations

#### Circular Spinner
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

#### Dots Loader
```css
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.dot {
  animation: bounce 1.4s infinite both;
  animation-delay: calc(var(--i) * 0.16s);
}
```

### Progress Bars
- **Determinate**: Width transition with easing
- **Indeterminate**: Sliding animation
- **Striped**: Background position animation

## Complex Animations

### Number Counters with GSAP

#### GSAP Counter Implementation
**ScrollTrigger Integration**:
- Trigger when counter section enters viewport (start: "top 80%")
- Animate from 0 to target value over 2 seconds
- Use "power2.out" easing for natural deceleration
- Format numbers with commas, K, M suffixes for readability
- Update display using onUpdate callback

**Strategic Use Cases**:
- Customer count ("10,000+ customers")
- Time/money saved metrics
- Success rate percentages
- Product usage statistics
- Only use for impactful numbers that build credibility

```javascript
// GSAP Counter Pattern (implementation reference):
// ScrollTrigger.create({
//   trigger: ".stats-section",
//   start: "top 80%",
//   onEnter: () => {
//     gsap.to(counterObject, {
//       value: targetNumber,
//       duration: 2,
//       ease: "power2.out",
//       onUpdate: () => updateDisplay()
//     });
//   }
// });
```

### Text Animations

#### GSAP SplitText Advanced Patterns

**Hero Headline Reveal** (Primary Effect):
- Split by words for optimal performance
- Animate from: {opacity: 0, y: 100, rotationX: -90}
- Animate to: {opacity: 1, y: 0, rotationX: 0}
- Stagger: 0.1s between words
- Duration: 0.8s with "back.out(1.7)" easing
- ScrollTrigger: When element enters viewport

**Section Title Reveal** (Secondary Effect):
- Split by lines for cleaner appearance
- Animate from: {opacity: 0, y: 50}
- Animate to: {opacity: 1, y: 0}
- Stagger: 0.2s between lines
- Duration: 0.6s with "power2.out" easing
- Use sparingly - only for key section titles

**Highlighted Text Wave** (Accent Effect):
- Split by characters (use very sparingly)
- Animate color/scale changes on scroll
- Wave effect with micro-staggered delays
- Only for key phrases or taglines
- Maximum 2-3 words to maintain performance

#### CSS Fallback Text Effects

**Typewriter Effect**:
- **Letter by letter reveal**
- **Timing**: 50ms per character
- **Cursor**: Blinking animation
- **Use Cases**: Special announcements, loading states

**Word Rotation**:
- **Slide up and fade**
- **Timing**: 3s per word
- **Use Cases**: Dynamic value propositions
- **Smooth transitions** with CSS transforms

### Particle Effects
- **Floating particles**: Random paths
- **Performance**: Canvas or CSS only
- **Limit**: Max 20 particles
- **Mobile**: Reduced or disabled

## Gesture Interactions

### Touch Gestures

#### Swipe
- **Threshold**: 50px minimum
- **Velocity**: Consider swipe speed
- **Feedback**: Follow finger movement

#### Pinch to Zoom
- **Images**: Gallery and product images
- **Smooth**: 60fps transformation
- **Limits**: Min 1x, Max 3x zoom

#### Pull to Refresh
- **Threshold**: 100px pull
- **Feedback**: Loading spinner
- **Spring back**: Elastic animation

### Mobile-Specific

#### Tap Feedback
- **Ripple effect**: From tap point
- **Timing**: 300ms expansion
- **Color**: Semi-transparent overlay

#### Long Press
- **Delay**: 500ms hold
- **Feedback**: Scale or highlight
- **Actions**: Context menu

## Advanced Effects

### Glassmorphism Animations
```css
.glass {
  backdrop-filter: blur(0);
  background: rgba(255,255,255,0);
  transition: all 400ms ease-out;
}

.glass:hover {
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.1);
}
```

### Gradient Animations
```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}
```

### Morph Animations
- **SVG morphing**: Path transitions
- **Clip-path animations**: Shape changes
- **Timing**: 500ms with ease-in-out

### 3D Transforms
```css
.card-3d {
  transform-style: preserve-3d;
  transition: transform 600ms;
}

.card-3d:hover {
  transform: rotateY(180deg);
}
```

## Performance Optimization

### Best Practices
1. Use CSS transforms over position changes
2. Animate opacity and transform only when possible
3. Use will-change sparingly
4. Implement passive event listeners
5. Debounce scroll and resize events
6. Use requestAnimationFrame for JS animations
7. Lazy-load animation libraries

### GPU Acceleration
```css
.accelerated {
  transform: translateZ(0);
  /* or */
  will-change: transform;
}
```

### Reducing Repaints
- Batch DOM changes
- Use CSS containment
- Avoid inline styles
- Minimize layout thrashing

## Accessibility Considerations

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### GSAP Accessibility Implementation
**Reduced Motion Detection**:
```javascript
// const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// const animationDuration = prefersReducedMotion ? 0 : 0.8;
// const shouldAnimate = !prefersReducedMotion;
```

**Implementation Strategy**:
- Check prefers-reduced-motion before initializing any GSAP animations
- Set all GSAP animation durations to 0 for reduced motion users
- Maintain functional state changes (reveals) without animation timing
- Provide instant text reveals for SplitText instead of staggered animations
- Skip ScrollTrigger animations but preserve trigger points for functionality
- Ensure all content is accessible without animation dependencies

### Alternative Interactions
- Instant state changes for reduced motion
- Keyboard alternatives for gestures
- Focus indicators for all interactions
- ARIA live regions for dynamic content
- Content should be fully functional without GSAP or ScrollTrigger

## Animation Library Integration

### GSAP Integration (Primary Advanced Animation Library)

**Core GSAP Implementation Strategy**:
- **gsap.timeline()**: For orchestrated animation sequences
- **gsap.to/from()**: For straightforward property animations
- **ScrollTrigger**: Maximum 3-5 instances per page for performance
- **SplitText**: Reserved for headlines and key section titles only

**Performance Guidelines**:
- Initialize GSAP animations only when elements enter viewport
- Use ScrollTrigger.refresh() on window resize events
- Kill animations on component unmount to prevent memory leaks
- Batch DOM reads and writes for optimal performance
- Set will-change property only during active animations

**Strategic Implementation Priorities**:
1. **Hero Section**: SplitText headline + staggered CTA reveals
2. **Features Section**: Card grid reveals with subtle stagger
3. **Stats/Numbers Section**: Counter animations with ScrollTrigger
4. **Testimonials**: Elegant slide-in animations for social proof
5. **Key CTAs**: Attention-grabbing but tasteful reveal animations

**GSAP Best Practices**:
- Test all animations at 3G network speeds
- Provide instant fallbacks for prefers-reduced-motion
- Use GSAP's built-in performance optimizations
- Monitor frame rates and disable heavy animations on low-end devices

### CSS Animation Libraries (Secondary)
- **Custom utilities**: Primary choice for micro-interactions
- **Tailwind animations**: Extended for hover states and simple transitions
- **CSS transforms**: Preferred for button hovers, card lifts, toggles

### Fallback Libraries
- **Intersection Observer**: Fallback for scroll-triggered reveals
- **Web Animations API**: For complex CSS-based sequences
- **Lottie**: Reserved for brand animations and complex illustrations

## Testing & Debugging

### Performance Testing
- Chrome DevTools Performance tab
- Lighthouse performance audit
- Check frame rate (target 60fps)
- Monitor paint and composite times

### Cross-Browser Testing
- Test all animations in target browsers
- Check mobile performance
- Verify touch interactions
- Test with slow connections

### Animation Debugging
```css
/* Slow down all animations for debugging */
* {
  animation-duration: 10s !important;
  transition-duration: 10s !important;
}
```

## Implementation Checklist

### For Each Animation
- [ ] Define clear purpose
- [ ] Choose appropriate timing
- [ ] Implement reduced motion alternative
- [ ] Test performance impact
- [ ] Verify accessibility
- [ ] Check mobile experience
- [ ] Document usage

### Common Patterns Library
1. **Page transitions** (CSS + selective GSAP)
2. **Text reveals** (GSAP SplitText - strategic use only)
3. **Section reveals** (GSAP ScrollTrigger - maximum 5 per page)
4. **Hover effects** (CSS transforms primarily)
5. **Loading states** (CSS animations + skeleton screens)
6. **Form interactions** (CSS with GSAP for complex validation states)
7. **Navigation transitions** (CSS + GSAP for mobile menu orchestration)
8. **Micro-feedback** (CSS transforms and opacity changes)
9. **Number counters** (GSAP with ScrollTrigger for impact metrics)
10. **Staggered card animations** (GSAP for feature grids and testimonials)

### GSAP Implementation Summary

**Strategic Usage Philosophy**:
- **Quality over Quantity**: Fewer, more impactful animations
- **Performance Priority**: Always test on mobile and slow connections
- **Accessibility First**: Functional without animations, respect reduced motion
- **Progressive Enhancement**: Site works completely without GSAP
- **Purposeful Animation**: Each GSAP animation serves a clear UX purpose

**Recommended GSAP Animation Locations**:
1. **Hero headline reveal** - Main value proposition with SplitText
2. **Feature section entrance** - Cards reveal with stagger
3. **Statistics counter** - Numbers that build credibility
4. **Testimonial reveals** - Social proof with elegant timing
5. **Key CTA sections** - Important conversion moments

**What NOT to animate with GSAP**:
- Navigation links and basic UI elements
- Body text and paragraph content
- Every section on scroll (causes animation fatigue)
- Decorative elements that don't serve UX purpose
- Secondary content that doesn't impact conversion