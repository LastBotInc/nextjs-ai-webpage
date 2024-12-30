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
- Tavily API for web search
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
│   ├── tavily-search.ts   # Web search capabilities
│   ├── html-to-md.ts      # HTML to Markdown converter
│   └── generate-brand-images.ts # Brand asset generation
├── docs/                  # Project documentation
└── configuration files    # Various config files
```

## Testing

### Unit Testing
- Jest for unit testing
- React Testing Library for component testing
- Test files located in `__tests__` directories next to the code they test
- Mocking of external dependencies (Replicate API, file system, etc.)

### E2E Testing
- Cypress for end-to-end testing
- Tests located in `cypress/e2e` directory
- Tests run against local development server
- Key flows tested:
  - Navigation
  - Theme switching
  - Feature visibility
  - Image generation (planned)
  - Image optimization (planned)

### Test Scripts
- `npm test`: Run unit tests
- `npm run test:watch`: Run unit tests in watch mode
- `npm run test:coverage`: Run unit tests with coverage report
- `npm run cypress`: Open Cypress UI
- `npm run cypress:headless`: Run Cypress tests headless
- `npm run test:e2e`: Start dev server and run E2E tests
- `npm run test:e2e:headless`: Start dev server and run E2E tests headless

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
