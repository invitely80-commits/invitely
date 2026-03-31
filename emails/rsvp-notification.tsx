import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type RsvpNotificationEmailProps = {
  hostName: string;
  guestName: string;
  guestEmail: string;
  phone: string;
  guests: number;
  coupleNames: string;
  inviteUrl: string;
};

export default function RsvpNotificationEmail({
  hostName,
  guestName,
  guestEmail,
  phone,
  guests,
  coupleNames,
  inviteUrl,
}: RsvpNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New RSVP received for {coupleNames}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>A new RSVP just arrived</Heading>
          <Text style={text}>Hi {hostName},</Text>
          <Text style={text}>
            {guestName} has responded to {coupleNames}'s invite.
          </Text>
          <Section style={details}>
            <Text style={item}>Guest: {guestName}</Text>
            <Text style={item}>Email: {guestEmail}</Text>
            <Text style={item}>Phone: {phone}</Text>
            <Text style={item}>Guests attending: {guests}</Text>
          </Section>
          <Text style={text}>Invite link: {inviteUrl}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#fff8f0",
  fontFamily: "Georgia, serif",
  padding: "24px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f3e2d0",
  borderRadius: "24px",
  margin: "0 auto",
  maxWidth: "560px",
  padding: "32px",
};

const heading = {
  color: "#7a1f3d",
  fontSize: "28px",
  marginBottom: "12px",
};

const text = {
  color: "#44403c",
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
  lineHeight: "24px",
};

const details = {
  backgroundColor: "#fff5eb",
  borderRadius: "18px",
  margin: "24px 0",
  padding: "18px 20px",
};

const item = {
  color: "#57534e",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 8px",
};

