import React from "react";

const ProjectSummary = () => {
  return (
    <div className="project-summary">
      <div className="container">
        <h4 className="uppercase bold">A text adventure</h4>
        <p>
          It’s easy to make your own text adventures. There’s no coding
          involved. Check the link below to make your own story!
        </p>
        <a
          href="https://github.com/bloycey/google-sheets-text-adventure"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Create a text adventure
        </a>
      </div>
    </div>
  );
};

export default ProjectSummary;
