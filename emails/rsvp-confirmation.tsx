import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

type RsvpConfirmationEmailProps = {
  guestName: string;
  coupleNames: string;
  inviteUrl: string;
};

export default function RsvpConfirmationEmail({
  guestName,
  coupleNames,
  inviteUrl,
}: RsvpConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your RSVP has been received</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>You're on the guest list</Heading>
          <Text style={text}>Hi {guestName},</Text>
          <Text style={text}>
            Thank you for confirming your RSVP for {coupleNames}. We can't wait to celebrate together.
          </Text>
          <Text style={text}>You can revisit the invitation anytime here: {inviteUrl}</Text>
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

