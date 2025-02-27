import React from "react";

export const HeroBanner: React.FC = () => {
  const logo = "https://i.postimg.cc/t4CCxQ29/AMS-2.png";

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={logo} alt="React logo" />
      </div>
      <h1 className="hero-banner__headline">AMS</h1>
      <p className="hero-banner__description">
        Athlete Management System (AMS), the centralized, comprehensive suite of tools for amateur and professional sports organizations.
      </p>
      {/* <a
        id="code-sample-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://developer.auth0.com/resources/code-samples/spa/react/basic-authentication/typescript-react-router-6"
        className="button button--secondary"
      >
        Check out the React code sample →
      </a> */}
    </div>
  );
};
