import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import StoryPage from "./components/StoryPage";
import ProjectSummary from "./components/ProjectSummary";
import "./css/style.css";

const Tabletop = require("tabletop");
const publicSpreadSheetUrl = process.env.REACT_APP_PUBLIC_SPREADSHEET_URL;

const App = () => {
  const [storyData, setStoryData] = useState([]);
  useEffect(() => {
    Tabletop.init({
      key: publicSpreadSheetUrl
    }).then(data => {
      console.log(data);
      const { Sheet1, Sheet2 } = data;
      const storyData = {
        intro: Sheet1.elements[0],
        story: Sheet2.elements
      };
      setStoryData(storyData);
    });
  }, []);
  if (storyData.length < 1) {
    return <div className="container">loading story...</div>;
  }
  const {
    intro: { intro_title, intro_text, intro_btn_text, intro_btn_path }
  } = storyData;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="page-wrapper">
            <Header title={intro_title} />
            <div className="main container">
              <div className="main-content">
                {intro_title && (
                  <h1 className="lg-only title">{intro_title}</h1>
                )}
                {intro_text && (
                  <p className="fw-light content intro-text">{intro_text}</p>
                )}
                {intro_btn_path && intro_btn_text && (
                  <Link to={intro_btn_path} className="btn-primary">
                    {intro_btn_text}
                  </Link>
                )}
              </div>
              <div className="lg-only sidebar">
                <ProjectSummary />
              </div>
            </div>
          </div>
          <Footer title={intro_title} intro={intro_text} />
        </Route>
        <Route path="/:id">
          <StoryPage
            storyData={{
              story: storyData.story,
              title: intro_title,
              intro: intro_text
            }}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
