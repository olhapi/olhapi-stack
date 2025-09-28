import { SendGridTransport } from '@upyo/sendgrid';
import { z } from 'zod';
import { config } from '../config/app.ts';
import { renderMagicLinkEmail, renderContactFormEmail } from '@olhapi/email-templates/src/templates';

// Email validation schema that matches the SendGrid transport requirements
const EmailSchema = z.custom<`${string}@${string}`>(
    (val): val is `${string}@${string}` => {
        return (
            typeof val === 'string' && val.includes('@') && val.indexOf('@') > 0 && val.indexOf('@') < val.length - 1
        );
    },
    { message: 'Must be in format: text@text' },
);

let sendGridClient: SendGridTransport | null = null;

function getSendGridClient(): SendGridTransport {
    if (!sendGridClient) {
        if (!config.SENDGRID_API_KEY) {
            throw new Error('SendGrid is not configured. Please set SENDGRID_API_KEY environment variable.');
        }
        sendGridClient = new SendGridTransport({ apiKey: config.SENDGRID_API_KEY });
    }
    return sendGridClient;
}

export interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
    if (!config.SENDGRID_API_KEY || !config.SENDGRID_FROM_EMAIL) {
        console.warn('SendGrid not configured - email not sent:', options.subject, 'to', options.to);
        return;
    }

    try {
        const transport = getSendGridClient();

        // Validate email addresses
        const fromEmail = EmailSchema.parse(config.SENDGRID_FROM_EMAIL);
        const toEmail = EmailSchema.parse(options.to);

        const receipt = await transport.send({
            sender: {
                address: fromEmail,
                name: config.SENDGRID_FROM_NAME || 'Your App',
            },
            recipients: [{ address: toEmail }],
            ccRecipients: [],
            bccRecipients: [],
            replyRecipients: [],
            subject: options.subject,
            content: { text: options.text || '', html: options.html },
            attachments: [],
            priority: 'normal' as const,
            tags: [],
            headers: new Headers(),
        });
        if (!receipt.successful) {
            throw new Error(`Failed to send email: ${receipt.errorMessages.join(', ')}`);
        }
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
}

export async function sendMagicLinkEmail(email: string, magicLink: string): Promise<void> {
    const subject = 'Sign in to your account';
    const appName = config.SENDGRID_FROM_NAME || 'Your App';

    const html = await renderMagicLinkEmail({ magicLink, appName });

    const text = `Sign in to your ${appName} account

Click the link below to sign in to your account:
${magicLink}

This link will expire in 15 minutes. If you didn't request this, you can safely ignore this email.`;

    await sendEmail({
        to: email,
        subject,
        text,
        html,
    });
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export async function sendContactFormEmail(contactData: ContactFormData, toEmail?: string): Promise<void> {
    const recipient = toEmail || config.SENDGRID_FROM_EMAIL;
    const companyName = config.SENDGRID_FROM_NAME || 'Your Company';

    const subject = `New Contact Form Submission from ${contactData.name}`;
    const html = await renderContactFormEmail({
        ...contactData,
        subject: 'General Inquiry', // Default subject for email template
        companyName,
    });

    const text = `New Contact Form Submission

From: ${contactData.name}
Email: ${contactData.email}

Message:
${contactData.message}

---
This message was sent through the ${companyName} website contact form.
Reply directly to this email to respond to ${contactData.name}.`;

    await sendEmail({
        to: recipient,
        subject,
        text,
        html,
    });
}
