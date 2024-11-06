import {
	Body as NBody,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text as NText,
} from "@react-email/components";

interface LinearLoginCodeEmailProps {
	confirmLink?: string;
}

export const EmailTemplate = ({ confirmLink }: LinearLoginCodeEmailProps) => (
	<Html>
		<Head />
		<Preview>Your login code for Linear</Preview>
		<NBody style={main}>
			<Container style={container}>
				<Img
					width="42"
					height="42"
					alt="Linear"
					src="../assets/bitpay-svgrepo-com.svg"
				/>
				<Heading style={heading}>Your login code for Linear</Heading>
				<Section style={buttonContainer}>
					<Button style={button} href={confirmLink}>
						Login to wallet
					</Button>
				</Section>
				<NText style={paragraph}>
					Make Sure that your verification code is valid
				</NText>
				<Hr style={hr} />
				<Link href="https://localhost:3000" style={reportLink}>
					Visit your Wallet
				</Link>
			</Container>
		</NBody>
	</Html>
);

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	maxWidth: "560px",
};

const heading = {
	fontSize: "24px",
	letterSpacing: "-0.5px",
	lineHeight: "1.3",
	fontWeight: "400",
	color: "#484848",
	padding: "17px 0 0",
};

const paragraph = {
	margin: "0 0 15px",
	fontSize: "15px",
	lineHeight: "1.4",
	color: "#3c4149",
};

const buttonContainer = {
	padding: "27px 0 27px",
};

const button = {
	backgroundColor: "#5e6ad2",
	borderRadius: "3px",
	fontWeight: "600",
	color: "#fff",
	fontSize: "15px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "11px 23px",
};

const reportLink = {
	fontSize: "14px",
	color: "#b4becc",
};

const hr = {
	borderColor: "#dfe1e4",
	margin: "42px 0 26px",
};
