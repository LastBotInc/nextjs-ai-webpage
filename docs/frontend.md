# Frontend Documentation

## Views/Screens

### Home Page
- Landing view with main navigation
- Quick access to core features
- Responsive design for all devices

### Image Generation
- Text-to-image generation interface
- Style selection and customization
- Preview and results display
- Batch generation controls

### Image Optimization
- File upload interface
- Optimization options panel
- Preview before/after
- Download optimized results

### Brand Asset Generator
- Brand information input
- Asset type selection
- Style customization
- Batch generation interface

### Blog
- Overview
  - Clean, minimal blog index with featured posts
  - Grid/list view toggle for posts
  - Category and tag filtering
  - Search functionality
  - Pagination with infinite scroll

- Individual Post View
  - Hero image with title overlay
  - Table of contents (for long posts)
  - Rich text content with MDX support
  - Author information
  - Related posts
  - Share buttons
  - Comment section (optional)

- Blog Components
  - PostCard: Preview card for blog listings
    - Featured image
    - Title and excerpt
    - Category tags
    - Reading time
    - Publication date
  - AuthorBio: Author information display
    - Avatar
    - Name and bio
    - Social links
  - TableOfContents: Navigation for long posts
    - Sticky positioning
    - Active section highlighting
  - CategoryFilter: Filter posts by category
    - Multi-select support
    - Count indicators
  - SearchBar: Full-text search interface
    - Auto-suggestions
    - Recent searches

- Responsive Considerations
  - Mobile: Single column layout
  - Tablet: Two column grid
  - Desktop: Three column grid
  - Adaptive typography
  - Collapsible table of contents on mobile

## UI/UX Patterns

### Design System
- Tailwind CSS for consistent styling
- Geist font family for modern typography
- Responsive breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Theme
- Light/dark mode support
- Color variables:
  - Background: #ffffff (light) / #0a0a0a (dark)
  - Foreground: #171717 (light) / #ededed (dark)

### Components
- Modern button styles
- Form inputs with validation
- Image preview cards
- Loading states and animations
- Error handling displays

### Styling Approach
1. Utility-first with Tailwind CSS
2. Custom CSS variables for theming
3. Component-specific styles when needed
4. Responsive design patterns
5. Accessibility considerations

### User Experience
- Instant feedback on actions
- Progressive loading states
- Error prevention
- Clear success/failure indicators
- Intuitive navigation flow
