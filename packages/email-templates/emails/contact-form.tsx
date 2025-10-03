import { Html, Head, Preview, Body, Container, Section, Text, Hr } from '@react-email/components';

export interface ContactFormEmailProps {
    name: string;
    email: string;
    subject: string;
    message: string;
    companyName?: string;
}

export const ContactFormEmail = ({
    name,
    email,
    subject,
    message,
    companyName = 'Your Company',
}: Readonly<ContactFormEmailProps>) => {
    return (
        <Html>
            <Head />
            <Preview>New contact form submission from {name}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logoContainer}>
                        <Text style={heading}>New Contact Form Submission</Text>
                    </Section>

                    <Section style={body}>
                        <Text style={paragraph}>
                            <strong>You've received a new message through your website contact form.</strong>
                        </Text>

                        <Hr style={hr} />

                        <Text style={fieldLabel}>From:</Text>
                        <Text style={fieldValue}>{name}</Text>

                        <Text style={fieldLabel}>Email:</Text>
                        <Text style={fieldValue}>{email}</Text>

                        <Text style={fieldLabel}>Subject:</Text>
                        <Text style={fieldValue}>{subject}</Text>

                        <Text style={fieldLabel}>Message:</Text>
                        <Text style={messageValue}>{message}</Text>

                        <Hr style={hr} />

                        <Text style={footer}>
                            This message was sent through the {companyName} website contact form. Reply directly to this
                            email to respond to {name}.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '560px',
};

const logoContainer = {
    textAlign: 'center' as const,
};

const heading = {
    fontSize: '28px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#484848',
    margin: '0 0 30px',
};

const body = {
    margin: '0 auto',
    padding: '0 20px',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#484848',
    margin: '0 0 20px',
};

const fieldLabel = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666666',
    margin: '20px 0 5px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
};

const fieldValue = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#484848',
    margin: '0 0 10px',
    padding: '8px 12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    border: '1px solid #e9ecef',
};

const messageValue = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#484848',
    margin: '0 0 10px',
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    border: '1px solid #e9ecef',
    whiteSpace: 'pre-wrap' as const,
};

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
};

const footer = {
    color: '#898989',
    fontSize: '12px',
    margin: '20px 0 0',
    lineHeight: '18px',
};
