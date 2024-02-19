import React from "react";

const EmailContent = ({
	name,
	email,
	institution,
	accountNumber,
}: {
	name: string;
	email: string;
	institution: string;
	accountNumber: string;
}) => {
	return (
		<>
			<div style={{ padding: "15px 40px", margin: "auto" }}>
				<div
					style={{
						border: "1px solid grey",
						padding: "15px 30px",
						textAlign: "left",
						width: "700px",
						margin: "auto",
					}}
				>
					<h2 style={{ textAlign: "center" }}>
						<b>
							You've successfully
              <br /> added a bank account
            </b>
					</h2>
					<br />
					<p>Hi {name}</p>
					<br />
					<p>You have added a new bank account to your Wealthsimple profile:</p>
					<br />
					<p>Institution: {institution}</p>
					<p>Account Number: ********{accountNumber}</p>
					<br />
					<p>
						If you did not initiate this change or have any questions, please
            reply to this email to reach out to our{" "}
						<a href="#/">
							<u>Client Success</u>
						</a>{" "}
            team.
          </p>
					<br />
					<br />
					<p>
						This message was sent to <a href="#/">{email}</a>
					</p>
					<br />
					<p>Prosper Together</p>
					<p>860 Richmond St. West, Ste. 300</p>
					<p>Toronto, ON, M6J 1C9</p>
					<br />
					<br />
					<br />
					<br />
					<p>
						<a href="#/">
							<u>Privacy Policy</u>
						</a>{" "}
            •{" "}
						<a href="#/">
							<u>View in browser</u>
						</a>
					</p>
					<br />
					<p>
						Replies to this email address are not monitored. Have questions?
            Visit our{" "}
						<a href="#/">
							<u>Help Centre</u>
						</a>{" "}
            or{" "}
						<a href="#/">
							<u>submit a request</u>
						</a>{" "}
            to our Client Support team.
          </p>
					<br />
					<p>
						Our Invest and Smart Savings products are offered by Wealthsimple
						Inc., a registered portfolio manager in each province and territory
						of Canada. Wealthsimple Trade is offered by Canadian ShareOwner
						Investments Inc. Our Cash product is offered by Wealthsimple
						Payments Inc., a FINTRAC registered money services business. Money
						in your Cash account is held in an account with ShareOwner.
            ShareOwner is a member of the{" "}
						<a href="#/">
							<u>Investment Industry Regulatory Organization of Canada</u>
						</a>
            . Customer accounts held at ShareOwner are protected by CIPF within
            specified limits in the event ShareOwner becomes insolvent. A
            brochure describing the nature and limits of coverage is available
            upon request or at CIPF. Wealthsimple is not a member of IIROC nor a
            member of{" "}
						<a href="#/">
							<u>CIPF</u>
						</a>
            . This content is not intended to be investment advice or any other
            kind of professional advice.
          </p>
					<br />
					<p>© 2020 Wealthsimple Technologies Inc.</p>
				</div>
			</div>
		</>
	);
};

export default EmailContent;
