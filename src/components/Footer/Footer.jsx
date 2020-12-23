import React from 'react';
import './_Footer.scss';
import rsSchoolLogo from '../../modules/assets/rs_school_js.svg';
import githubLogo from '../../modules/assets/github-logo.svg';

export default function Footer() {

  return (
    <div className="footer">
      <a className="rsLogo" href="https://rs.school/js/">
      <img src={ rsSchoolLogo} alt="logo"/>
      </a>

      <div className="authors">
        <a className="author-name" href="https://github.com/AlexLevw">
          <img className="github-logo" src={ githubLogo } alt="github"/>
          AlexLevw
        </a>
        <a className="author-name" href="https://github.com/GrafDrakula-BlaBlaBla">
          <img className="github-logo" src={ githubLogo } alt="github"/>
          GrafDrakula
        </a>
        <a className="author-name" href="https://github.com/koverchik">
          <img className="github-logo" src={ githubLogo } alt="github"/>
          koverchik
        </a>
      </div>

      <div style={{width:'70px'}}></div>
    </div>
  );
} 
