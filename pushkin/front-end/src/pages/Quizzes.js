// styling
import {Row, Col} from "react-bootstrap";

// components
import QuizTile from "../components/Quizzes/QuizTile";

// experiments
import experiments from "../experiments.js";

function QuizzesPage() {
	return (
		<div className="white">
			<Row className="display">
				<Col xs={12}>
					<div className="blurb">
						<p className="blurb">
							Want to learn new things about yourself while simultaneously making important
							contributions to science? Take one of our quizzes below.
						</p>
					</div>
				</Col>
			</Row>
			<Row className="display">
				{experiments.map((e) => {
					return (
						<QuizTile
							quizid={e.shortName}
							title={e.fullName}
							duration={e.duration}
							text={e.text}
							post={e.tagline}
							key={e.shortName}
							img={require("../assets/images/quiz/" + e.logo)}
						/>
					);
				})}
			</Row>
			<Row className="display">
				<Col xs={12}>
					<div className="blurb">
						<hr />
						<p className="blurb" style={{marginTop: "20px"}}>
							<a
								className="title"
								href="http://archive.gameswithwords.org/WhichEnglish"
								target="_blank"
								rel="noopener noreferrer">
								Which English?
							</a>
							<br />
							Help us map the grammar of English around the world.{" "}
							<strong>See our best guess as to which world English you speak.</strong>
						</p>
						<hr />
						<p className="blurb" style={{marginTop: "20px"}}>
							<a
								className="title"
								href="http://archive.gameswithwords.org/VocabQuiz"
								target="_blank"
								rel="noopener noreferrer">
								The Vocab Quiz
							</a>
							<br />
							How many words do you know? Take the quiz and find out!
						</p>
						<hr />
						<p className="blurb" style={{marginTop: "20px"}}>
							<a className="title" href="/archive" target="_blank" rel="noopener noreferrer">
								Archives
							</a>
							<br />
							View our collection of closed experiments. While no new data is being collected, you
							can still run through any of them.
						</p>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default QuizzesPage;
