import React from "react";
import { Link, useParams } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const formatCommaSeperatedData = arrayOfData =>
  arrayOfData
    .split(",")
    .map(choice => choice.trim())
    .filter(choice => choice !== "");

const StoryPage = ({ storyData }) => {
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
  const {
    title,
    subtitle,
    intro,
    content,
    choices,
    image,
    paths
  } = correctPageData;
  const formattedChoices = formatCommaSeperatedData(choices);
  const formattedPaths = formatCommaSeperatedData(paths);
  return (
    <>
      <div className="page-wrapper">
        <Header title={storyData.title} />
        <div className="main container">
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
        <div className="story-summary">
          <div className="container">
            <h4 className="uppercase bold text-primary">{storyData.title}</h4>
            <p>{storyData.intro}</p>
            <Link to="/" className="btn-primary">
              Start from the beginning
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StoryPage;
