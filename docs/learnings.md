# Technical Learnings and Best Practices

## Error Resolutions

### Next.js 15 Localization Errors

1. **Error: Route "/[locale]" used params.locale should be awaited**
   - Issue: In Next.js 15, route parameters need to be handled carefully in async components
   - Solution:
     - Extract locale from params before validation
     - Use separate validation step instead of inline ternary
     - Handle locale validation with explicit if statement
   - Reference: https://nextjs.org/docs/messages/sync-dynamic-apis

2. **Error: Couldn't find next-intl config file**
   - Issue: next-intl configuration needs to be set up correctly for App Router
   - Solution:
     - Create `next.config.js` with createNextIntlPlugin
     - Place request configuration in `i18n/request.ts`
     - Use correct import path in plugin configuration
   - Reference: https://next-intl.dev/docs/getting-started/app-router

3. **Error: Could not locate request configuration module**
   - Issue: next-intl expects the configuration file in a specific location
   - Solution:
     - Move configuration to `i18n/request.ts`
     - Update next.config.js to use createNextIntlPlugin with correct path
     - Use proper import paths for messages
   - Reference: Error message documentation

4. **Error: TypeError: createNextIntlPlugin is not a function**
   - Issue: Incorrect import and usage of next-intl plugin in Next.js config
   - Solution:
     - Use `require('next-intl/plugin')()` instead of createNextIntlPlugin
     - Configure i18n settings directly in the withNextIntl call
     - Remove locale validation from request.ts as it's handled by the plugin
   - Reference: next-intl documentation

5. **Warning: i18n property conflicts with App Router**
   - Issue: Using i18n property in next.config.js conflicts with App Router
   - Solution:
     - Remove i18n property from next.config.js
     - Pass configuration path to withNextIntl: `require('next-intl/plugin')('./i18n/request.ts')`
     - Configure locales in middleware.ts instead
   - Reference: https://next-intl.dev/examples#app-router-migration

6. **Error: usePathname is not supported in Server Components**
   - Issue: Navigation hooks can only be used in client components
   - Solution:
     - Add 'use client' directive to components using navigation hooks
     - Convert Navigation and LocaleSwitcher to client components
     - Keep layout as server component
   - Reference: Next.js documentation on Server Components

7. **Error: locale parameter in getRequestConfig is deprecated**
   - Issue: next-intl 3.22+ requires returning locale from getRequestConfig
   - Solution:
     - Return locale in getRequestConfig response
     - Handle locale validation before returning
     - Ensure proper error handling for missing messages
   - Reference: https://next-intl.dev/blog/next-intl-3-22#await-request-locale

### Best Practices for Next.js 15 Internationalization
1. Always validate locales before using them
2. Handle message loading errors gracefully
3. Use proper TypeScript types for locales
4. Keep translations in separate JSON files
5. Use the NextIntlClientProvider for client components
6. Place i18n configuration in the correct location
7. Configure next-intl plugin correctly in next.config.js
8. Don't mix Pages Router i18n with App Router configuration
9. Mark components using navigation hooks as client components
10. Return locale from getRequestConfig for proper type safety

## Next.js App Router
- App router provides better performance and simpler routing compared to pages directory
- Server components reduce client-side JavaScript
- Layout system enables efficient code sharing between routes

## AI Integration
- Recraft V3 API provides high-quality image generation
- Proper error handling is crucial for AI API calls
- Caching generated images improves performance
- Rate limiting is important for cost control

## Image Processing
- Sharp.js is highly efficient for Node.js image processing
- Background removal requires careful error handling
- Format conversion affects quality and file size
- Proper image optimization significantly improves load times

## TypeScript Best Practices
- Strict type checking catches errors early
- Interface sharing between frontend and backend ensures consistency
- Generic types improve code reusability
- Type guards enhance runtime safety

## Performance Optimization
- Next.js image optimization reduces bandwidth usage
- Proper caching strategies improve response times
- Lazy loading improves initial page load
- Code splitting reduces bundle size

## Development Workflow
- Turbopack provides faster development experience
- ESLint configuration ensures code quality
- Proper error boundaries prevent cascading failures
- Regular testing prevents regression issues
