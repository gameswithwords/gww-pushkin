// react imports
import React from "react";

// styling
import {Row, Col} from "react-bootstrap";

function ArchivesPage() {
	const archivesQuizzes = [
		{
			title: "Mind Reading Quotient",
			description:
				"Forget psychics, all of us have to read minds. We try to figure out what people are thinking based on what they say or do. See your results at the end.",
			link: "http://archive.gameswithwords.org/MRQ/index.html",
		},
		{
			title: "Ignore That!",
			description:
				"How distractable are you? How well can you ignore irrelevant information? See your results at the end.",
			link: "http://archive.gameswithwords.org/IgnoreThat/index.html",
		},
		{
			title: "Trials of the Heart",
			description:
				"In the future, you won't be allowed to cause other people to have emotions. See what this future is like, and help researchers better understand human emotion & language. In English and/or Korean.",
			link: "http://archive.gameswithwords.org/TrialsoftheHeart/index.html",
		},
		{
			title: "Rapid Reading (White Bear)",
			description: "(originally hosted by the Visual Cognition Online Lab at Harvard; ~3 minutes)",
			link: "http://archive.gameswithwords.org/WhiteBear/index.html",
		},
		{
			title: "The Meaning of Actions: Our Bodies, Our Minds",
			description: "(3-5 minutes)",
			link: "http://archive.gameswithwords.org/Actions/index.html",
		},
		{
			title: "How the Brain Reads",
			description: "(10 minutes)",
			link: "http://archive.gameswithwords.org/English/index.html",
		},
		{
			title: "Letter Sense",
			description: "(3-5 minutes)",
			link: "http://archive.gameswithwords.org/LetterSense/index.html",
		},
		{
			title: "Letter Sense II",
			description: "(5 minutes)",
			link: "http://archive.gameswithwords.org/LetterSense2/index.html",
		},
		{
			title: "The Birth Order Survey",
			description: "(5 minutes)",
			link: "http://archive.gameswithwords.org/BirthOrder/index.html",
		},
		{
			title: "Word Sense",
			description:
				"(5 minutes; see your results at end) Can you figure out what a word means by how it sounds?",
			link: "http://archive.gameswithwords.org/WordSense/index.html",
		},
		{
			title: "Learning the Name of Things",
			description: "(5 minutes; see your results at end). Can you learn words the way children do?",
			link: "http://archive.gameswithwords.org/Learning/index.html",
		},
		{
			title: "Find the Dax",
			description: "(5 minutes)",
			link: "http://archive.gameswithwords.org/DaxStory/index.html",
		},
		{
			title: "Угадай кто сликтопоз",
			description: "(5 minutes; Find the Dax in Russian)",
			link: "http://archive.gameswithwords.org/Sliktopoz",
		},
		{
			title: "The Gorp Test",
			description: "(5 minutes)",
			link: "http://archive.gameswithwords.org/GorpTest",
		},
		{
			title: "The Memory Test",
			description: "(3 minutes)",
			link: "http://archive.gameswithwords.org/MemoryTest",
		},
		{
			title: "Puntastic",
			description: "(3+ minutes)",
			link: "http://archive.gameswithwords.org/Puntastic",
		},
		{
			title: "Emotion Sense",
			description: "(5 minutes)",
			link: "http://archive.gameswithwords.org/EmotionSense",
		},
		{
			title: "Drama Queen",
			description: "(5 minutes)",
			link: "http://archive.gameswithwords.org/DramaQueen",
		},
		{
			title: "The Video Test",
			description: "(15-20 minutes)",
			link: "http://archive.gameswithwords.org/VideoTest",
		},
		{
			title: "That Kind of Person",
			description: "(5 minutes)",
			link: "http://archive.gameswithwords.org/ThatKindofPerson/index.html",
		},
		{
			title: "The Communication Game",
			description: "(2-4 minutes)",
			link: "http://archive.gameswithwords.org/TheCommunicationGame/index.html",
		},
		{
			title: "Pronoun Sleuth",
			description: "(5-10 minutes)",
			link: "http://archive.gameswithwords.org/PronounSleuth",
		},
		{
			title: "The Language & Memory Test",
			description: "(10-15 minutes)",
			link: "http://archive.gameswithwords.org/LanguageAndMemory/",
		},
		{
			title: "Дива",
			description: "(5-10 minutes)",
			link: "http://archive.gameswithwords.org/Diva",
		},
		{
			title: "Collecting Fancy Art",
			description: "(10-15 minutes)",
			link: "http://archive.gameswithwords.org/CollectingFancyArt",
		},
		{
			title: "Finding Explanations",
			description: "(10 minutes)",
			link: "http://archive.gameswithwords.org/FindingExplanations",
		},
		{
			title: "Korean",
			description: "",
			link: "http://archive.gameswithwords.org/Korean",
		},
		{
			title: "Japanese Pronouns",
			description: "",
			link: "http://archive.gameswithwords.org/JapanesePronouns",
		},
		{
			title: "VSTM Time",
			description: "",
			link: "http://archive.gameswithwords.org/VSTMTime",
		},
		{
			title: "Who Am I Talking About?",
			description: "",
			link: "http://archive.gameswithwords.org/WhoAmITalkingAbout",
		},
	];

	return (
		<div className="white">
			<Row className="display">
				<Col xs={12}>
					<div className="blurb">
						<p className="blurb" style={{color: "#d9534f", fontWeight: "bold"}}>
							The experiments on this list are closed. No new data will be collected.
						</p>
						<p className="blurb">
							However, you can run through any of them that you wish. You may find this useful in
							understanding the results reported for any of these experiments, or you may find it
							simply entertaining.
						</p>
						<hr />
					</div>
				</Col>
			</Row>

			{archivesQuizzes.map((quiz, index) => (
				<Row className="display" key={index}>
					<Col xs={12}>
						<div className="blurb">
							<p className="blurb" style={{marginTop: "20px"}}>
								<a className="title" href={quiz.link} target="_blank" rel="noopener noreferrer">
									{quiz.title}
								</a>
								<br />
								{quiz.description}
							</p>
							<hr />
						</div>
					</Col>
				</Row>
			))}
		</div>
	);
}

export default ArchivesPage;
