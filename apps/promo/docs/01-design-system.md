# Design System & Theme Architecture

## Overview
This document defines the complete design system for a modern, flashy SaaS promotional website with light/dark theme support. The system emphasizes glassmorphism, gradients, and smooth animations to create a premium, cutting-edge aesthetic.

## 1. Color Palette

### Light Theme Colors

#### Primary Colors
- **Primary Blue**: #0066FF - Main brand color for CTAs and key elements
- **Primary Hover**: #0052CC - Darker shade for hover states
- **Primary Light**: #E6F0FF - Light tint for backgrounds

#### Secondary Colors
- **Secondary Gradient Start**: #8B5CF6 - Purple for gradient effects
- **Secondary Gradient End**: #EC4899 - Pink for gradient transitions
- **Secondary Surface**: #FAF5FF - Light purple background

#### Accent Colors
- **Accent Green**: #84CC16 - Success states and highlights
- **Accent Yellow**: #FACC15 - Warnings and attention grabbers
- **Accent Red**: #EF4444 - Error states and critical actions

#### Neutral Colors
- **Background Primary**: #FFFFFF - Main background
- **Background Secondary**: #F9FAFB - Section alternating background
- **Surface**: #FFFFFF - Card and component backgrounds
- **Border**: #E5E7EB - Subtle borders
- **Text Primary**: #111827 - Main text color
- **Text Secondary**: #4B5563 - Secondary text
- **Text Tertiary**: #9CA3AF - Muted text

### Dark Theme Colors

#### Primary Colors
- **Primary Cyan**: #06B6D4 - Main brand color in dark mode
- **Primary Hover**: #0891B2 - Darker shade for hover
- **Primary Dark**: #083344 - Deep shade for backgrounds

#### Secondary Colors
- **Secondary Gradient Start**: #A78BFA - Light purple for gradients
- **Secondary Gradient End**: #F472B6 - Pink for gradient effects
- **Secondary Surface**: #2D1B69 - Purple tinted surface

#### Accent Colors
- **Accent Yellow**: #FDE047 - Bright yellow for CTAs
- **Accent Green**: #86EFAC - Success states
- **Accent Red**: #FCA5A5 - Error states

#### Neutral Colors
- **Background Primary**: #000000 - Pure black base
- **Background Secondary**: #111827 - Slightly lighter sections
- **Surface**: #1F2937 - Card backgrounds
- **Surface Elevated**: #374151 - Elevated components
- **Border**: #374151 - Subtle borders
- **Text Primary**: #F9FAFB - Main text
- **Text Secondary**: #E5E7EB - Secondary text
- **Text Tertiary**: #9CA3AF - Muted text

## 2. Typography System

### Font Families
- **Display Font**: "Inter", system-ui, sans-serif - For headings and UI
- **Body Font**: "Inter", system-ui, sans-serif - For body text
- **Mono Font**: "JetBrains Mono", monospace - For code blocks

### Type Scale
- **Display XL**: 72px/80px, font-weight: 800 - Hero headlines
- **Display Large**: 60px/68px, font-weight: 700 - Section headlines
- **Display Medium**: 48px/56px, font-weight: 700 - Page titles
- **Display Small**: 36px/44px, font-weight: 600 - Section titles
- **Heading XL**: 30px/38px, font-weight: 600 - Major headings
- **Heading Large**: 24px/32px, font-weight: 600 - Card titles
- **Heading Medium**: 20px/28px, font-weight: 600 - Subsection titles
- **Heading Small**: 18px/26px, font-weight: 600 - Minor headings
- **Body Large**: 18px/28px, font-weight: 400 - Lead paragraphs
- **Body Medium**: 16px/24px, font-weight: 400 - Default body text
- **Body Small**: 14px/20px, font-weight: 400 - Secondary text
- **Caption**: 12px/16px, font-weight: 400 - Small text and labels
- **Overline**: 12px/16px, font-weight: 600, letter-spacing: 0.5px - Category labels

## 3. Spacing System

### Base Unit: 4px

#### Spacing Scale
- **space-0**: 0px
- **space-1**: 4px
- **space-2**: 8px
- **space-3**: 12px
- **space-4**: 16px
- **space-5**: 20px
- **space-6**: 24px
- **space-8**: 32px
- **space-10**: 40px
- **space-12**: 48px
- **space-16**: 64px
- **space-20**: 80px
- **space-24**: 96px
- **space-32**: 128px
- **space-40**: 160px
- **space-48**: 192px
- **space-56**: 224px
- **space-64**: 256px

### Container Widths
- **Max Width XL**: 1440px - Full width sections
- **Max Width Large**: 1280px - Standard content width
- **Max Width Medium**: 1024px - Reading content
- **Max Width Small**: 768px - Narrow content
- **Max Width XS**: 640px - Forms and modals

## 4. Border Radius System

- **radius-none**: 0px - Sharp corners
- **radius-sm**: 4px - Subtle rounding
- **radius-md**: 8px - Default rounding
- **radius-lg**: 12px - Cards and containers
- **radius-xl**: 16px - Large cards
- **radius-2xl**: 24px - Feature cards
- **radius-3xl**: 32px - Hero sections
- **radius-full**: 9999px - Pills and circles

## 5. Shadow System

### Light Theme Shadows
- **shadow-xs**: 0 1px 2px rgba(0, 0, 0, 0.05)
- **shadow-sm**: 0 2px 4px rgba(0, 0, 0, 0.05)
- **shadow-md**: 0 4px 6px rgba(0, 0, 0, 0.07)
- **shadow-lg**: 0 10px 15px rgba(0, 0, 0, 0.1)
- **shadow-xl**: 0 20px 25px rgba(0, 0, 0, 0.1)
- **shadow-2xl**: 0 25px 50px rgba(0, 0, 0, 0.12)
- **shadow-glow**: 0 0 30px rgba(0, 102, 255, 0.3) - Blue glow effect
- **shadow-inner**: inset 0 2px 4px rgba(0, 0, 0, 0.06)

### Dark Theme Shadows
- **shadow-xs**: 0 1px 2px rgba(0, 0, 0, 0.25)
- **shadow-sm**: 0 2px 4px rgba(0, 0, 0, 0.3)
- **shadow-md**: 0 4px 6px rgba(0, 0, 0, 0.4)
- **shadow-lg**: 0 10px 15px rgba(0, 0, 0, 0.5)
- **shadow-xl**: 0 20px 25px rgba(0, 0, 0, 0.6)
- **shadow-2xl**: 0 25px 50px rgba(0, 0, 0, 0.7)
- **shadow-glow**: 0 0 40px rgba(6, 182, 212, 0.5) - Cyan glow effect
- **shadow-inner**: inset 0 2px 4px rgba(0, 0, 0, 0.3)

## 6. Effects & Overlays

### Glassmorphism
- **Glass Light**: background: rgba(255, 255, 255, 0.7), backdrop-filter: blur(10px)
- **Glass Dark**: background: rgba(31, 41, 55, 0.7), backdrop-filter: blur(10px)
- **Glass Border**: 1px solid rgba(255, 255, 255, 0.18)

### Gradients
- **Primary Gradient**: linear-gradient(135deg, #0066FF 0%, #8B5CF6 100%)
- **Secondary Gradient**: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)
- **Accent Gradient**: linear-gradient(135deg, #84CC16 0%, #FACC15 100%)
- **Dark Gradient**: linear-gradient(180deg, #000000 0%, #111827 100%)
- **Mesh Gradient**: Multiple gradients with noise texture overlay

### Background Patterns
- **Dot Pattern**: Repeating dots at 20px intervals with 0.1 opacity
- **Grid Pattern**: 1px lines forming 40px squares with 0.05 opacity
- **Wave Pattern**: SVG wave patterns for section dividers
- **Blob Shapes**: Animated blob SVGs for decorative elements

## 7. Animation System

### Duration Scale
- **duration-75**: 75ms - Micro interactions
- **duration-150**: 150ms - Fast transitions
- **duration-300**: 300ms - Default transitions
- **duration-500**: 500ms - Medium animations
- **duration-700**: 700ms - Slow animations
- **duration-1000**: 1000ms - Very slow animations

### Easing Functions
- **ease-linear**: linear
- **ease-in**: cubic-bezier(0.4, 0, 1, 1)
- **ease-out**: cubic-bezier(0, 0, 0.2, 1)
- **ease-in-out**: cubic-bezier(0.4, 0, 0.2, 1)
- **ease-spring**: cubic-bezier(0.5, 1.5, 0.5, 1)
- **ease-bounce**: cubic-bezier(0.68, -0.55, 0.265, 1.55)

### Animation Presets
- **fade-in**: Opacity 0 to 1
- **slide-up**: Transform translateY(20px) to 0
- **slide-down**: Transform translateY(-20px) to 0
- **scale-up**: Transform scale(0.95) to 1
- **rotate-in**: Transform rotate(-5deg) to 0
- **blur-in**: Filter blur(10px) to 0

## 8. Breakpoints & Grid

### Responsive Breakpoints
- **Mobile**: 0 - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1439px
- **Wide**: 1440px+

### Grid System
- **Columns**: 12 column grid
- **Gap**: 24px default, 16px on mobile
- **Margin**: 24px on mobile, 32px on tablet, 48px on desktop

## 9. Component States

### Interactive States
- **Default**: Base appearance
- **Hover**: Elevated shadow, slight scale (1.02)
- **Active**: Pressed appearance, scale (0.98)
- **Focus**: Ring outline with brand color
- **Disabled**: 50% opacity, no interactions

### Feedback States
- **Loading**: Skeleton screens with shimmer effect
- **Success**: Green accents and checkmark icons
- **Warning**: Yellow accents and alert icons
- **Error**: Red accents and error icons
- **Empty**: Gray illustrations with helpful text

## 10. Theme Implementation

### CSS Variables Structure
All colors, spacing, and effects should be defined as CSS custom properties on the :root element, with data-theme attribute controlling the active theme.

### Theme Switching
- System preference detection on load
- Manual toggle with smooth transitions
- LocalStorage persistence of user preference
- Transition duration of 300ms for all theme changes
- No layout shift during theme switch

### Theme-Aware Components
All components should automatically adapt to the current theme using CSS variables, with no hard-coded color values.

## 11. Accessibility Considerations

### Color Contrast
- **WCAG AA**: Minimum 4.5:1 for normal text
- **WCAG AA**: Minimum 3:1 for large text
- **WCAG AAA**: Target 7:1 for body text where possible

### Focus Indicators
- **Focus Ring**: 2px solid with 2px offset
- **Focus Color**: Brand primary color
- **Focus Contrast**: Minimum 3:1 with background

### Motion Preferences
- Respect prefers-reduced-motion setting
- Provide alternative non-animated experiences
- Essential animations only when reduced motion is preferred

## 12. Special Effects

### Glow Effects
- Text glow for emphasis
- Button glow on hover
- Card glow for featured content
- Neon-style accents in dark mode

### Blur Effects
- Background blur for overlays
- Motion blur for fast animations
- Depth of field effects for layers

### Particle Effects
- Floating particles in hero sections
- Confetti for success states
- Snow/rain effects for seasonal themes
- Star field backgrounds