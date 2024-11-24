import {
	Body as NBody,
	Button,
	Container,
	Text,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Body,
	Heading,
} from "@react-email/components";

interface LinearLoginCodeEmailProps {
	confirmLink?: string;
	ButtonText?: string;
	token?: string;
}

export const EmailTemplate = ({
	confirmLink,
	ButtonText,
	token,
}: LinearLoginCodeEmailProps) => (
	<Html>
		<Head />
		<Preview>Your verification Token for Wallet</Preview>
		<NBody style={main}>
			<Container style={container}>
				<Img
					width="42"
					height="42"
					alt="Linear"
					src="../assets/bitpay-svgrepo-com.svg"
				/>
				<Section style={buttonContainer}>
					<Button style={button} href={confirmLink}>
						{ButtonText}
					</Button>
				</Section>
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

export default function send2FAEmailTemplate({
	verificationCode,
}: {
	verificationCode: string;
}) {
	const main = {
		backgroundColor: "#fff",
		color: "#212121",
	};

	const container = {
		padding: "20px",
		margin: "0 auto",
		backgroundColor: "#eee",
	};
	return (
		<Html>
			<Head />
			<Preview>Wallet Authentication Code</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={coverSection}>
						<Section style={upperSection}>
							<Heading style={h1}>Authentication Code</Heading>
							<Text style={mainText}>Welcome Back</Text>
							<Section style={verificationSection}>
								<Text style={verifyText}>Verification code</Text>

								<Text style={codeText}>{verificationCode}</Text>
								<Text style={validityText}>
									(This code is valid for 10 minutes)
								</Text>
							</Section>
						</Section>
						<Hr />
						<Section style={lowerSection}>
							<Text style={cautionText}>
								Please don't share you password to any one
							</Text>
						</Section>
					</Section>
					<Text style={footerText}>
						The message was produced by Wallet App{" "}
						<Link href="http://localhost:3000" target="_blank" style={link}>
							Visit Wallet
						</Link>
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

const h1 = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "20px",
	fontWeight: "bold",
	marginBottom: "15px",
};

const link = {
	color: "#2754C5",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "14px",
	textDecoration: "underline",
};

const text = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "14px",
	margin: "24px 0",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
	...text,
	fontSize: "12px",
	padding: "0 20px",
};

const verifyText = {
	...text,
	margin: 0,
	fontWeight: "bold",
	textAlign: "center" as const,
};

const codeText = {
	...text,
	fontWeight: "bold",
	fontSize: "36px",
	margin: "10px 0",
	textAlign: "center" as const,
};

const validityText = {
	...text,
	margin: "0px",
	textAlign: "center" as const,
};

const verificationSection = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
