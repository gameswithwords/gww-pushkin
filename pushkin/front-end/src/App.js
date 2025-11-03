// Import react
import React from "react";
import { Route, Switch } from "react-router-dom";

//import custom front-end stuff
//import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//import page components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import TakeQuiz from "./components/Quizzes/TakeQuiz";
import Results from "./components/Quizzes/Results";

//import pages
import HomePage from "./pages/Home";
import PathsPage from "./pages/Paths";
import ProjectsPage from "./pages/Projects";
import QuizzesPage from "./pages/Quizzes";
import ArchivesPage from "./pages/Archives";
import FindingsPage from "./pages/Findings";
import AboutPage from "./pages/About";
import FeedbackPage from "./pages/Feedback";

function App() {
  return (
    <>
      <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ flex: "1" }}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route path="/index">
              <HomePage />
            </Route>

            <Route path="/index.html">
              <HomePage />
            </Route>

            <Route path="/paths">
              <PathsPage />
            </Route>

            <Route path="/projects">
              <ProjectsPage />
            </Route>

            <Route exact path="/quizzes">
              <QuizzesPage />
            </Route>

            <Route path="/archive">
              <ArchivesPage />
            </Route>

            <Route path="/findings">
              <FindingsPage />
            </Route>

            <Route path="/about">
              <AboutPage />
            </Route>

            <Route path="/feedback">
              <FeedbackPage />
            </Route>

            <Route path="/quizzes/:quizName/results">
              <Results />
            </Route>

            <Route path="/quizzes/:quizName">
              <TakeQuiz />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
