import React from "react";
import { Auth0Resource } from "../models/auth0-resource";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {
  const resourceList: Auth0Resource[] = [
    {
      path: "https://www.isaacjiang.ca/",
      label: "Why AMS",
    },
    {
      path: "https://github.com/IsaacJ60",
      label: "Developer Blog",
    },
    {
      path: "https://www.linkedin.com/in/isaac6/",
      label: "Contact an Expert",
    },
  ];

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
            <p className="page-footer-message__headline">
              <span>AMS is brought to you by Isaac Jiang</span>
            </p>
            <p className="page-footer-message__description">
            </p>
          </div>
          {/* <div className="page-footer-info__button">
            <a
              id="create-account-button"
              className="button button--secondary"
              href="https://auth0.com/signup"
              target="_blank"
              rel="noreferrer noopener"
            >
              Create Free Auth0 Account
            </a>
          </div> */}
          <div className="page-footer-info__resource-list">
            {resourceList.map((resource) => (
              <div
                key={resource.path}
                className="page-footer-info__resource-list-item"
              >
                <PageFooterHyperlink path={resource.path}>
                  <>{resource.label}</>
                </PageFooterHyperlink>
              </div>
            ))}
          </div>
        </div>
        <div className="page-footer-grid__brand">
          <div className="page-footer-brand">
            <img
              className="page-footer-brand__logo"
              src="https://i.postimg.cc/t4CCxQ29/AMS-2.png"
              alt="AMS"
              width="20"
              height="22.22"
            />
            <PageFooterHyperlink path="https://www.isaacjiang.ca/">
              <>Isaac Jiang</>
            </PageFooterHyperlink>
          </div>
        </div>
      </div>
    </footer>
  );
};
