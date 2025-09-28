import { render } from '@react-email/components';
import { MagicLinkEmail, type MagicLinkEmailProps } from '../emails/magic-link.js';
import { ContactFormEmail, type ContactFormEmailProps } from '../emails/contact-form.js';

export async function renderMagicLinkEmail(props: MagicLinkEmailProps): Promise<string> {
    return render(MagicLinkEmail(props));
}

export async function renderContactFormEmail(props: ContactFormEmailProps): Promise<string> {
    return render(ContactFormEmail(props));
}

export { type MagicLinkEmailProps, type ContactFormEmailProps };
