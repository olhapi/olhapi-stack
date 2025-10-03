# Email Templates

React Email templates for transactional emails with live preview and easy customization.

## 🛠️ Tech Stack

- **Framework**: React Email
- **Build Tool**: TypeScript
- **Preview**: Built-in development server
- **Components**: Reusable email components
- **Export**: HTML and plain text formats

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm package manager

### Installation

1. Install dependencies:

    ```bash
    pnpm install
    ```

2. Start development server:

    ```bash
    pnpm dev
    ```

3. Open [http://localhost:3002](http://localhost:3002) to preview templates

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start React Email preview server
pnpm build            # Build templates to HTML
pnpm export           # Export templates to static files

# Testing
pnpm test             # Run template tests
```

## 📧 Available Templates

### Authentication Templates

- **Magic Link**: Passwordless authentication emails
- **Welcome**: New user onboarding email
- **Account Verification**: Email verification for new accounts

### Notification Templates

- **Contact Form**: Contact form submission notifications
- **System Alert**: System status and maintenance notifications

### Marketing Templates

- **Newsletter**: Weekly/monthly newsletter template
- **Product Updates**: Feature announcements and updates

## 🎨 Template Development

### Creating New Templates

1. Create a new component in `emails/`:

    ```tsx
    import { Button, Container, Head, Html, Text } from '@react-email/components';

    interface MyTemplateProps {
        name: string;
        actionUrl: string;
    }

    export default function MyTemplate({ name, actionUrl }: MyTemplateProps) {
        return (
            <Html>
                <Head />
                <Container>
                    <Text>Hello {name}!</Text>
                    <Button href={actionUrl}>Take Action</Button>
                </Container>
            </Html>
        );
    }
    ```

2. Add preview data for development testing

### Best Practices

- Use table-based layouts for maximum compatibility
- Inline CSS for better email client support
- Test across multiple email clients
- Provide plain text alternatives
- Ensure mobile responsiveness

## 📁 Project Structure

```
emails/
├── components/        # Reusable email components
├── auth/             # Authentication-related emails
├── notifications/    # System notifications
└── marketing/        # Marketing emails
```

## 🧪 Testing

1. Start the development server: `pnpm dev`
2. Navigate to template previews at `localhost:3002`
3. Test with different data scenarios

## 📤 Integration

Templates integrate with the API server (`apps/api`) for sending:

```typescript
import { render } from '@react-email/render';
import MagicLinkEmail from '@olhapi/email-templates/emails/auth/magic-link';

const html = render(
    MagicLinkEmail({
        name: 'John Doe',
        magicLink: 'https://app.example.com/auth/verify?token=...',
    }),
);
```

## 🔗 Related Documentation

- [React Email Documentation](https://react.email)
- [API Integration Guide](../api/README.md)

## License

MIT License
