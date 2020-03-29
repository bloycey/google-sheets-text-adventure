import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import StorySummary from "./StorySummary";

const formatCommaSeperatedData = arrayOfData =>
  arrayOfData
    .split(",")
    .map(choice => choice.trim())
    .filter(choice => choice !== "");

const StoryPage = ({ storyData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { id } = useParams();
  const correctPageData = storyData.story.find(story => story.url === id);
  if (!correctPageData || correctPageData.length < 1) {
    return (
      <div className="container">
        <p>This doesn't look right...</p>
        <Link to="/" className="link-btn">
          Return to home
        </Link>
      </div>
    );
  }
  const { title, subtitle, content, choices, paths } = correctPageData;
  const formattedChoices = formatCommaSeperatedData(choices);
  const formattedPaths = formatCommaSeperatedData(paths);
  return (
    <>
      <div className="page-wrapper">
        <Header title={storyData.title} />
        <div className="main container">
          <div className="main-content">
            <div className="story-heading-wrapper">
              {title && <h2 className="title">{title}</h2>}
              {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>
            {content && <p className="content story-content">{content}</p>}
            <div className="choices-wrapper">
              <h4 className="uppercase bold text-dark">Make a choice</h4>
              {formattedChoices.length > 0 &&
                formattedChoices.map((choice, index) => (
                  <Link
                    to={formattedPaths[index]}
                    className="btn-primary block"
                    key={choice}
                  >
                    {choice}
                  </Link>
                ))}
            </div>
          </div>
          <div className="sidebar lg-only">
            <StorySummary title={storyData.title} intro={storyData.intro} />
          </div>
        </div>
      </div>
      <Footer title={storyData.title} intro={storyData.intro} />
    </>
  );
};

export default StoryPage;
