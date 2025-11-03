import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
//import * as i from 'react-social-icons';
import {Row, Col} from "react-bootstrap";
// import s from './Footer.css';
import {CONFIG} from "../../config";

const styles = {
	socialRow: {
		position: "sticky",
		bottom: "0",
		backgroundColor: "#2c5f6f",
		width: "100%",
		margin: "0px",
		padding: "30px 0",
	},
};

class Footer extends Component {
	render() {
		const socialIconStyle = {
			backgroundColor: "white",
			borderRadius: "50%",
			width: "50px",
			height: "50px",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			margin: "0 7px",
			textDecoration: "none",
		};

		return (
			<>
				<Row className="justify-content-center text-center" style={styles.socialRow}>
					<Col>
						<div style={{display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap"}}>
							<a
								href="https://www.facebook.com/share_channel/"
								target="_blank"
								rel="noopener noreferrer"
								style={socialIconStyle}>
								<span style={{fontSize: "24px", color: "#3b5998", fontWeight: "bold"}}>f</span>
							</a>
							<a
								href="https://twitter.com/gameswithwords"
								target="_blank"
								rel="noopener noreferrer"
								style={socialIconStyle}>
								<span style={{fontSize: "24px", color: "#1da1f2", fontWeight: "bold"}}>𝕏</span>
							</a>
							<a
								href="https://mail.google.com/mail/?view=cm&fs=1&to=gameswithwords@gmail.com"
								target="_blank"
								rel="noopener noreferrer"
								style={socialIconStyle}>
								<span style={{fontSize: "24px", color: "#db4437", fontWeight: "bold"}}>g+</span>
							</a>
							<a
								href="https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=http://gameswithwords.org"
								target="_blank"
								rel="noopener noreferrer"
								style={socialIconStyle}>
								<span style={{fontSize: "24px", color: "#0077b5", fontWeight: "bold"}}>in</span>
							</a>
							<a
								href="https://www.pinterest.com/gameswithwords"
								target="_blank"
								rel="noopener noreferrer"
								style={socialIconStyle}>
								<span style={{fontSize: "24px", color: "#bd081c", fontWeight: "bold"}}>P</span>
							</a>
						</div>
					</Col>
				</Row>
			</>
		);
	}
}

export default Footer;
