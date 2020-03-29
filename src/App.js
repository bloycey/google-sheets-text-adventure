import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import StoryPage from "./components/StoryPage";

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
    intro: { intro_title, intro_text, intro_btn_text, intro_btn_path, style }
  } = storyData;

  if (!style || style === "1") {
    import(`./css/1.css`).then(() => null);
  } else {
    import(`./css/${style}.css`).then(() => null);
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="page-wrapper">
            <Header title={intro_title} />
            <div className="main container">
              {intro_text && (
                <p className="fw-light content intro-text">{intro_text}</p>
              )}
              {intro_btn_path && intro_btn_text && (
                <Link to={intro_btn_path} className="btn-primary">
                  {intro_btn_text}
                </Link>
              )}
            </div>
          </div>
          <Footer />
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
