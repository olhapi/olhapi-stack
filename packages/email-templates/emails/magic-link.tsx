import { Body, Button, Container, Head, Hr, Html, Preview, Section, Text } from '@react-email/components';

export interface MagicLinkEmailProps {
    magicLink: string;
    appName?: string;
}

export const MagicLinkEmail = ({ magicLink, appName = 'Your App' }: Readonly<MagicLinkEmailProps>) => {
    return (
        <Html>
            <Head />
            <Preview>Sign in to your {appName} account</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logoContainer}>
                        <Text style={heading}>{appName}</Text>
                    </Section>

                    <Section style={body}>
                        <Text style={paragraph}>
                            <strong>Sign in to your account</strong>
                        </Text>
                        <Text style={paragraph}>
                            Click the button below to securely sign in to your {appName} account.
                        </Text>

                        <Section style={buttonContainer}>
                            <Button style={button} href={magicLink}>
                                Sign In
                            </Button>
                        </Section>

                        <Text style={paragraph}>Or copy and paste this URL into your browser:</Text>
                        <Text style={link}>{magicLink}</Text>

                        <Hr style={hr} />

                        <Text style={footer}>
                            This link will expire in 15 minutes. If you didn't request this, you can safely ignore this
                            email.
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
    margin: '0 auto', maxWidth: '560px', padding: '20px 0 48px',
};

const logoContainer = {
    textAlign: 'center' as const,
};

const heading = {
    color: '#484848', fontSize: '32px', fontWeight: '700', lineHeight: '1.3', margin: '0 0 20px',
};

const body = {
    margin: '0 auto',
    padding: '0 20px',
};

const paragraph = {
    color: '#484848', fontSize: '16px', lineHeight: '26px', margin: '0 0 16px',
};

const buttonContainer = {
    margin: '32px 0', textAlign: 'center' as const,
};

const button = {
    backgroundColor: '#007cba', borderRadius: '6px', color: '#fff', display: 'block', fontSize: '16px', fontWeight: 'bold', padding: '12px 30px', textAlign: 'center' as const, textDecoration: 'none',
};

const link = {
    color: '#007cba', fontSize: '14px', margin: '0 0 16px', textDecoration: 'underline', wordBreak: 'break-all' as const,
};

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
};

const footer = {
    color: '#898989',
    fontSize: '12px',
    margin: '20px 0 0',
};
