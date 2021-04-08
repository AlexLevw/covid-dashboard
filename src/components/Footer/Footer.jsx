import React from "react";
import "./_Footer.scss";
import rsSchoolLogo from "../../modules/assets/rs_school_js.svg";
import githubLogo from "../../modules/assets/github-logo.svg";

export default function Footer() {
  const authors = [
    {
      name: "AlexLevw",
      gitHubUrl: "https://github.com/AlexLevw",
    },
    {
      name: "GrafDrakula",
      gitHubUrl: "https://github.com/GrafDrakula-BlaBlaBla",
    },
    {
      name: "koverchik",
      gitHubUrl: "https://github.com/koverchik",
    },
  ];

  return (
    <div className="footer">
      <a className="rsLogo" href="https://rs.school/js/">
        <img src={rsSchoolLogo} alt="logo" />
      </a>
      <div className="footer__authors">
        {authors.map((author) => (
          <a className="author-name" href={author.gitHubUrl}>
            <img className="github-logo" src={githubLogo} alt="github" />
            {author.name}
          </a>
        ))}
      </div>
      <div />
    </div>
  );
}
