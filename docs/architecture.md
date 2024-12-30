# Architecture

## Technical Stack

### Frontend
- Next.js 15.1.3 (React 19)
- TypeScript
- Tailwind CSS for styling
- Geist font family

### Backend
- Next.js API Routes
- Recraft V3 API integration
- Image processing libraries (Sharp)

### Development Tools
- ESLint for code quality
- PostCSS for CSS processing
- Turbopack for development
- Git for version control

## Folder Structure
```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles
├── public/                # Static assets
├── tools/                 # AI and utility tools
│   ├── recraft.ts         # Recraft API integration
│   ├── image-optimizer.ts # Image processing utilities
│   └── generate-brand-images.ts # Brand asset generation
├── docs/                  # Project documentation
└── configuration files    # Various config files
```

## Testing Strategy
- Unit tests for utility functions
- Integration tests for API endpoints
- E2E tests for critical user flows
- Visual regression testing for UI components

## Development Workflow
1. Local development with `npm run dev`
2. Code quality checks with ESLint
3. TypeScript compilation
4. Testing
5. Build and deployment

## Deployment
- Vercel platform integration
- Environment variables management
- Production optimization
