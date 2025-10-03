# Components Library Specification

## Overview

This document defines all reusable UI components used throughout the website. Each component is designed to be flexible, accessible, and consistent with the design system.

## Navigation Components

### 1. Header/Navbar

**Purpose**: Primary site navigation and branding.

**Variants**:

- Default: Transparent background, becomes solid on scroll
- Solid: Always solid background
- Minimal: Logo and menu only

**Structure**:

- Logo area (left)
- Navigation menu (center/left)
- Action buttons (right)
- Mobile menu toggle

**States**:

- Default
- Scrolled (sticky)
- Mobile expanded
- Search active

**Props/Options**:

- Transparent mode
- Sticky behavior
- Search integration
- Mega menu support
- Mobile breakpoint

### 2. Mega Menu

**Purpose**: Multi-column dropdown navigation.

**Structure**:

- Column layout (2-4 columns)
- Section headers
- Link lists
- Featured content area
- Visual elements/icons

**Features**:

- Hover delay
- Keyboard navigation
- Touch support
- Animation timing

### 3. Breadcrumbs

**Purpose**: Show page hierarchy and navigation path.

**Structure**:

- Home link
- Separator icons
- Current page (non-link)
- Schema markup

**Variants**:

- Simple text
- With icons
- Collapsible on mobile

### 4. Footer

**Purpose**: Site-wide links and information.

**Sections**:

- Brand area
- Link columns
- Newsletter signup
- Social links
- Legal links
- Copyright

**Variants**:

- Full footer
- Minimal footer
- Sticky footer

### 5. Language Switcher

**Purpose**: Change site language/locale.

**Types**:

- Dropdown select
- Flag icons
- Text links
- Modal selector

**Features**:

- Current language display
- Country flags (optional)
- Auto-detection
- Cookie persistence

## Button Components

### 6. Button

**Purpose**: Primary interactive element for actions.

**Variants**:

- Primary: Main CTA actions
- Secondary: Alternative actions
- Tertiary: Low-emphasis actions
- Ghost: Minimal style
- Danger: Destructive actions

**Sizes**:

- Small (32px height)
- Medium (40px height)
- Large (48px height)
- Extra Large (56px height)

**States**:

- Default
- Hover
- Active/Pressed
- Loading
- Disabled

**Features**:

- Icon support (left/right)
- Full width option
- Loading spinner
- Ripple effect
- Gradient backgrounds

### 7. Button Group

**Purpose**: Group related actions.

**Types**:

- Segmented control
- Split button
- Toggle group
- Action bar

**Features**:

- Active state
- Exclusive/multiple selection
- Responsive collapse

### 8. Floating Action Button (FAB)

**Purpose**: Primary action on a page.

**Variants**:

- Circle
- Extended (with text)
- Mini size

**Position**:

- Bottom right
- Bottom center
- Custom position

**Features**:

- Show on scroll
- Expand on hover
- Multiple actions

## Form Components

### 9. Input Field

**Purpose**: Text input for forms.

**Types**:

- Text
- Email
- Password
- Number
- Tel
- URL
- Search

**Variants**:

- Outlined
- Filled
- Underlined

**Features**:

- Floating label
- Helper text
- Error state
- Character counter
- Prefix/suffix
- Clear button

### 10. Textarea

**Purpose**: Multi-line text input.

**Features**:

- Auto-resize
- Character limit
- Rich text option
- Markdown support
- Resize handle

### 11. Select/Dropdown

**Purpose**: Choose from predefined options.

**Types**:

- Native select
- Custom dropdown
- Multi-select
- Searchable select
- Async loading

**Features**:

- Option groups
- Icons in options
- Search/filter
- Create new option
- Keyboard navigation

### 12. Checkbox

**Purpose**: Binary choice or multiple selections.

**Variants**:

- Default
- Switch style
- Card selection
- Indeterminate state

**Features**:

- Label positioning
- Helper text
- Error state
- Group validation

### 13. Radio Button

**Purpose**: Single choice from multiple options.

**Variants**:

- Default circles
- Button style
- Card style
- Image selection

**Layout**:

- Vertical list
- Horizontal list
- Grid layout

### 14. Toggle Switch

**Purpose**: On/off state control.

**Variants**:

- Small/Medium/Large
- With labels
- With icons
- iOS style

**States**:

- On/Off
- Loading
- Disabled

### 15. Slider

**Purpose**: Select value from range.

**Types**:

- Single value
- Range (min-max)
- Stepped
- Continuous

**Features**:

- Value labels
- Tick marks
- Custom tooltips
- Multiple handles

### 16. File Upload

**Purpose**: Upload files to the system.

**Types**:

- Button trigger
- Drag and drop zone
- Avatar upload
- Multiple files

**Features**:

- File preview
- Progress indication
- File type validation
- Size limits
- Chunked upload

## Display Components

### 17. Card

**Purpose**: Container for grouped content.

**Variants**:

- Basic: Simple container
- Media: With image/video
- Interactive: Clickable
- Expandable: Show more content

**Structure**:

- Header (optional)
- Media (optional)
- Body
- Actions (optional)

**Styles**:

- Flat
- Elevated (shadow)
- Outlined
- Glassmorphism

### 18. Modal/Dialog

**Purpose**: Overlay content requiring attention.

**Types**:

- Standard modal
- Full screen
- Side panel
- Bottom sheet

**Sizes**:

- Small (400px)
- Medium (600px)
- Large (800px)
- Full width

**Features**:

- Close button
- Backdrop click
- ESC key close
- Prevent scroll
- Transition animations

### 19. Accordion

**Purpose**: Expandable content sections.

**Features**:

- Single/multiple expansion
- Icons (chevron, plus/minus)
- Smooth height animation
- Nested accordions
- Keyboard navigation

### 20. Tabs

**Purpose**: Switch between content views.

**Types**:

- Top tabs
- Vertical tabs
- Icon tabs
- Scrollable tabs

**Features**:

- Active indicator
- Badge support
- Lazy loading
- Swipe gesture (mobile)
- Keyboard navigation

### 21. Badge

**Purpose**: Status indicators and counts.

**Types**:

- Label badge
- Count badge
- Dot indicator
- Icon badge

**Variants**:

- Primary, Success, Warning, Error, Info
- Small, Medium, Large
- Rounded, Square

**Position**:

- Standalone
- Attached to element
- Floating corner

### 22. Avatar

**Purpose**: User or entity representation.

**Types**:

- Image
- Initial letters
- Icon
- Status indicator

**Sizes**:

- XS (24px)
- Small (32px)
- Medium (40px)
- Large (64px)
- XL (96px)

**Features**:

- Fallback image
- Status dot
- Badge overlay
- Group stack

### 23. Tooltip

**Purpose**: Contextual information on hover/focus.

**Positions**:

- Top, Bottom, Left, Right
- Auto-positioning

**Triggers**:

- Hover
- Click
- Focus
- Manual

**Features**:

- Arrow pointer
- HTML content
- Delay options
- Max width control

### 24. Popover

**Purpose**: Rich content in floating container.

**Differences from Tooltip**:

- Supports interaction
- Richer content
- Can contain forms

**Features**:

- Dismissible
- Focus trap
- Custom positioning
- Animation

## Feedback Components

### 25. Alert/Notification

**Purpose**: System messages and alerts.

**Types**:

- Info
- Success
- Warning
- Error

**Variants**:

- Inline alert
- Toast notification
- Banner alert
- Snackbar

**Features**:

- Icon
- Title and description
- Action button
- Dismiss button
- Auto-dismiss timer

### 26. Progress Bar

**Purpose**: Show completion or loading progress.

**Types**:

- Determinate
- Indeterminate
- Buffer
- Circular

**Variants**:

- Linear
- Circular
- Segmented
- Stepped

**Features**:

- Percentage label
- Color variants
- Animation
- Striped pattern

### 27. Spinner/Loader

**Purpose**: Indicate loading state.

**Types**:

- Circular spinner
- Dots
- Bars
- Skeleton screen
- Progress ring

**Sizes**:

- Small (16px)
- Medium (24px)
- Large (32px)
- XL (48px)

**Features**:

- Custom colors
- Speed control
- Label text
- Overlay mode

### 28. Skeleton Screen

**Purpose**: Loading placeholder for content.

**Types**:

- Text lines
- Avatar
- Card
- Table
- Custom shapes

**Features**:

- Shimmer animation
- Responsive sizing
- Multiple items
- Fade transition

### 29. Empty State

**Purpose**: No content or results messaging.

**Components**:

- Illustration/icon
- Title
- Description
- Action button

**Variants**:

- No data
- No results
- Error state
- First use

## Data Display Components

### 30. Table

**Purpose**: Display tabular data.

**Features**:

- Sortable columns
- Filterable
- Searchable
- Pagination
- Selectable rows
- Expandable rows
- Fixed headers
- Responsive scroll
- Column resize

**Variants**:

- Basic
- Striped
- Bordered
- Compact
- Hover rows

### 31. List

**Purpose**: Display items in vertical layout.

**Types**:

- Simple list
- Avatar list
- Two-line list
- Media list
- Interactive list

**Features**:

- Dividers
- Section headers
- Action buttons
- Swipe actions (mobile)
- Drag to reorder

### 32. Timeline

**Purpose**: Show chronological events.

**Layouts**:

- Vertical
- Horizontal
- Alternating

**Features**:

- Date markers
- Icons
- Content cards
- Connecting lines
- Active state

### 33. Stat Card

**Purpose**: Display metrics and KPIs.

**Components**:

- Value
- Label
- Change indicator
- Trend graph
- Icon

**Features**:

- Animation on load
- Comparison value
- Progress indicator
- Interactive hover

### 34. Chart Components

**Purpose**: Data visualization.

**Types**:

- Line chart
- Bar chart
- Pie chart
- Donut chart
- Area chart
- Scatter plot

**Features**:

- Interactive tooltips
- Legend
- Responsive sizing
- Animation
- Export options

## Content Components

### 35. Hero Section

**Purpose**: Page introduction with impact.

**Variants**:

- Text only
- With image
- With video
- Split layout
- Full viewport

**Components**:

- Headline
- Subheadline
- CTA buttons
- Media
- Background

### 36. Feature Grid

**Purpose**: Display features or benefits.

**Layouts**:

- Equal grid
- Bento box
- Masonry
- Carousel

**Card Components**:

- Icon
- Title
- Description
- Link

### 37. Testimonial Card

**Purpose**: Display customer feedback.

**Components**:

- Quote
- Author name
- Author title
- Company
- Avatar
- Rating

**Variants**:

- Simple quote
- Card style
- With media
- Carousel item

### 38. Pricing Card

**Purpose**: Display pricing tiers.

**Components**:

- Plan name
- Price
- Period
- Features list
- CTA button
- Popular badge

**Features**:

- Highlight recommended
- Compare toggle
- Feature tooltips

### 39. CTA Section

**Purpose**: Call-to-action blocks.

**Layouts**:

- Centered
- Split
- Background image
- Gradient

**Components**:

- Headline
- Description
- Button(s)
- Visual element

## Navigation Components

### 40. Pagination

**Purpose**: Navigate through pages.

**Types**:

- Number pagination
- Previous/Next
- Load more
- Infinite scroll

**Features**:

- Page size selector
- Jump to page
- Total results
- Responsive collapse

### 41. Stepper

**Purpose**: Multi-step process indicator.

**Types**:

- Horizontal
- Vertical
- Dot indicators
- Progress bar

**States**:

- Completed
- Active
- Upcoming
- Error

**Features**:

- Step labels
- Optional steps
- Clickable steps
- Content animation

### 42. Search Bar

**Purpose**: Search functionality.

**Features**:

- Auto-suggestions
- Recent searches
- Search categories
- Voice input
- Clear button
- Loading state

**Variants**:

- Inline
- Overlay
- Expanding
- With filters

## Utility Components

### 43. Divider

**Purpose**: Visual separation.

**Types**:

- Horizontal
- Vertical
- With text
- Dotted/dashed

**Features**:

- Custom spacing
- Color variants
- Thickness options

### 44. Spacer

**Purpose**: Add consistent spacing.

**Sizes**:

- Using spacing scale
- Responsive sizing
- Conditional display

### 45. Container

**Purpose**: Content width constraint.

**Variants**:

- Full width
- Max width
- Fluid
- Responsive padding

### 46. Overlay

**Purpose**: Cover content temporarily.

**Types**:

- Modal backdrop
- Loading overlay
- Image overlay
- Gradient overlay

**Features**:

- Opacity control
- Click to close
- Blur effect
- Animation

### 47. Theme Toggle

**Purpose**: Switch between light/dark themes.

**Types**:

- Icon button
- Switch
- Dropdown
- Auto/Light/Dark selector

**Features**:

- Smooth transition
- System preference
- Persistence
- Animation

### 48. Copy to Clipboard

**Purpose**: Copy text/code to clipboard.

**Features**:

- Success feedback
- Tooltip
- Custom text
- Code formatting

### 49. Social Share

**Purpose**: Share content on social media.

**Platforms**:

- Twitter/X
- LinkedIn
- Facebook
- Email
- WhatsApp
- Copy link

**Features**:

- Custom text
- Hashtags
- Analytics tracking
- Native share API

### 50. Back to Top

**Purpose**: Scroll to page top.

**Features**:

- Show on scroll down
- Smooth scroll
- Progress indicator
- Custom position

## Component Guidelines

### Accessibility Requirements

- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

### Responsive Behavior

- Mobile-first approach
- Touch targets (minimum 44px)
- Breakpoint adaptations
- Performance optimization

### Animation Standards

- Consistent timing
- Reduced motion support
- Performance considerations
- Smooth transitions

### State Management

- Loading states
- Error states
- Empty states
- Success feedback
- Disabled states

### Theming Support

- CSS variables usage
- Light/dark variants
- Color customization
- Typography scaling

### Documentation Needs

- Usage examples
- Props/options tables
- Accessibility notes
- Browser support
- Best practices
