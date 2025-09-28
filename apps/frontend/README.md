# Frontend Application

Modern React 19 application with TanStack Router, authentication, and internationalization.

## 🛠️ Tech Stack

- **Framework**: React 19 with new hooks (useActionState, useOptimistic)
- **Routing**: TanStack Router with file-based routing
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Authentication**: Better Auth client
- **Internationalization**: Lingui
- **File Uploads**: Better Upload
- **State Management**: React 19 built-in state
- **UI Components**: Radix UI + shadcn/ui

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm package manager
- Running API server (apps/api)

### Installation

1. Install dependencies:

    ```bash
    pnpm install
    ```

2. Set up environment variables:

    ```bash
    cp .env.example .env
    ```

3. Configure environment variables (see Environment Variables section)

4. Start development server:
    ```bash
    pnpm dev
    ```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm start            # Start development server (alias)
pnpm build            # Build for production
pnpm serve            # Preview production build

# Testing
pnpm test             # Run tests with Vitest

# Code Quality
pnpm lint             # Lint code with oxlint

# Bundle Analysis
pnpm analyze          # Analyze bundle size
pnpm analyze:bundle   # Build and analyze bundle

# Internationalization
pnpm lingui:extract   # Extract translatable strings
pnpm lingui:compile   # Compile translations
pnpm lingui:watch     # Watch and extract translations
```

## 🔐 Authentication

The application uses Better Auth for **passwordless magic link authentication**:

- Magic link authentication (no passwords)
- Automatic account creation on first login
- Session management
- Protected routes
- User profile management

### Authentication Flow

1. Users land on `/login` page
2. Enter email address to request magic link
3. Click magic link in email to authenticate
4. After authentication, redirected to `/dashboard`
5. Protected routes check authentication status
6. Logout available from user menu

## 🌍 Internationalization (i18n)

The app supports multiple languages using Lingui:

### Supported Languages

- English (default)
- Spanish
- French

### Working with Translations

1. **Mark text for translation**:

    ```tsx
    import { Trans, t } from '@lingui/macro';

    // For JSX content
    <Trans>Welcome to our app</Trans>;

    // For strings (placeholders, etc.)
    const placeholder = t`Enter your email`;
    ```

2. **Extract strings**:

    ```bash
    pnpm lingui:extract
    ```

3. **Translate in .po files**:
   Edit files in `src/locales/{locale}/messages.po`

4. **Compile translations**:
    ```bash
    pnpm lingui:compile
    ```

### Language Switching

Users can switch languages via the language selector in the navigation. The selection is persisted in localStorage.

## 🎨 UI Components

The app uses a combination of:

- **Radix UI**: Accessible primitive components
- **shadcn/ui**: Pre-built styled components
- **Custom components**: App-specific UI components

### Component Structure

```
src/components/
├── ui/                 # shadcn/ui and custom UI components
│   ├── button.tsx
│   ├── form.tsx
│   ├── avatar-upload.tsx
│   └── ...
├── autumn/             # Billing-related components
├── app-sidebar.tsx     # Application sidebar
├── nav-main.tsx        # Main navigation
└── ...
```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/          # React contexts (auth, growthbook)
├── features/          # Feature-specific code
│   ├── auth/          # Authentication logic
│   └── settings/      # User settings
├── hooks/             # Custom React hooks
├── layouts/           # Page layouts
├── lib/               # Third-party integrations
├── locales/           # Translation files
├── pages/             # Application pages
├── utils/             # Utility functions
└── styles.css         # Global styles
```

## 🔒 Protected Routes

The application uses a `<SecuredLayout>` component to protect authenticated routes:

```tsx
// Automatically redirects to /login if not authenticated
<SecuredLayout>
    <Dashboard />
</SecuredLayout>
```

## 📤 File Uploads

File upload functionality using Better Upload:

### Avatar Upload

- Component: `<AvatarUpload>`
- Max size: 2MB
- Formats: JPEG, PNG, WebP
- Features: Crop, resize, preview

### Document Upload

- Component: `<DocumentUpload>`
- Max size: 25MB
- Formats: PDF, DOC, DOCX
- Features: Progress tracking, validation

## ⚙️ Environment Variables

Required environment variables:

```env
# API Configuration
VITE_AUTH_URL=http://localhost:3001

# Client Configuration
VITE_CLIENT_ORIGIN=http://localhost:3000

# File Storage
VITE_S3_PUBLIC_URL=https://your-bucket.s3.amazonaws.com
```

## 🧪 Testing

The project uses Vitest for testing:

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

## 🎯 Key Features

### Dashboard

- User overview
- Quick actions
- Recent activity

### Settings

- Profile management
- Avatar upload
- Billing settings
- Language preferences

### Authentication

- Magic link login/logout
- Profile management
- Session handling

## 🔧 Development Guidelines

### React 19 Hooks Usage

Follow the project guidelines for new React 19 hooks:

- **useActionState**: For forms with async actions (auth forms, settings forms)
- **useOptimistic**: For immediate UI feedback (profile updates, avatar uploads)
- **use()**: With Suspense for async data fetching (when transitioning from promise-based patterns)

### Code Style

- Use aliased imports: `@/hooks/use-auth.ts`
- Follow existing component patterns
- Use Tailwind for styling
- Prefer composition over inheritance

### Error Handling

- Use Sonner for user notifications
- Handle errors gracefully in catch blocks
- Show appropriate success/error messages

## 🚀 Deployment

### Production Build

```bash
# Build the application
pnpm build

# Preview the build
pnpm serve
```

### Environment Setup

Ensure all production environment variables are configured:

- `VITE_AUTH_URL`: Production API URL
- `VITE_CLIENT_ORIGIN`: Production frontend URL
- `VITE_S3_PUBLIC_URL`: Production S3 bucket URL

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Follow existing code patterns
2. Add tests for new features
3. Run linting before committing
4. Update translations when adding new text
