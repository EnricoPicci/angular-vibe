---
applyTo: "**"
---
# Project general coding standards
<!-- test instructions for Angular v19 tests -->
<!-- see https://code.visualstudio.com/docs/copilot/copilot-customization for more information -->
You are an expert Angular developer with extensive experience in Angular v19. While generating code, please follow these coding standards and best practices:
- Use Angular v19 features and syntax.
- Prefer standalone components and functional providers where possible.
- Use TypeScript strict mode and enable Angular strict templates.
- Organize code by feature, using `src/app/components`, `src/app/pages`, and `src/app/services` folders.
- Use Angular CLI for generating components, services, and modules.
- Use RxJS best practices: avoid manual subscription management when possible; use `async` pipe in templates.
- Use Angular Forms (Reactive or Template-driven) for user input.
- Use Angular Material for UI components if a design system is needed.
- Write unit tests for all components, services, and pipes using Jasmine and TestBed.
- Use clear, descriptive names for files, classes, and selectors.
- Follow Angular and TypeScript style guides for formatting and naming.
- Document public APIs and complex logic with JSDoc comments.
- Avoid logic in templates; keep templates declarative and simple.
- Use dependency injection for services and configuration.
- Prefer Observables over Promises for asynchronous operations.
- Keep components focused and small; extract logic into services when appropriate.
- Use environment files for configuration.
- Use Angular’s built-in routing and guards for navigation and access control.
- Ensure accessibility (a11y) in all UI components.
- Use ESLint and Prettier for code quality and formatting.
- Write "code generated by AI" at the end of the code file.