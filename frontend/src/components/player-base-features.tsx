import React from "react";
import { PlayerBaseFeature } from "./player-base-feature";
import { useParams } from "react-router-dom";

export const PlayerBaseFeatures: React.FC = () => {

  const { base_id } = useParams<{ base_id: string }>();

  const featuresList = [
    {
      title: "Player List",
      description:
        "Comprehensive overview of all players registered in the player base.",
      resourceUrl: "players",
      icon: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
    },
    {
      title: "Settings",
      description:
        "Manage your player base settings, such as notifications and privacy.",
      resourceUrl: "settings",
      icon: "https://cdn.auth0.com/blog/hello-auth0/mfa-logo.svg",
    },
    // {
    //   title: "Multi-Factor Authentication",
    //   description:
    //     "You can require your users to provide more than one piece of identifying information when logging in. MFA delivers one-time codes to your users via SMS, voice, email, WebAuthn, and push notifications.",
    //   resourceUrl: "https://auth0.com/docs/multifactor-authentication",
    //   icon: "https://cdn.auth0.com/blog/hello-auth0/mfa-logo.svg",
    // },
    // {
    //   title: "Attack Protection",
    //   description:
    //     "Auth0 can detect attacks and stop malicious attempts to access your application such as blocking traffic from certain IPs and displaying CAPTCHA. Auth0 supports the principle of layered protection in security that uses a variety of signals to detect and mitigate attacks.",
    //   resourceUrl: "https://auth0.com/docs/attack-protection",
    //   icon: "https://cdn.auth0.com/blog/hello-auth0/advanced-protection-logo.svg",
    // },
    // {
    //   title: "Serverless Extensibility",
    //   description:
    //     "Actions are functions that allow you to customize the behavior of Auth0. Each action is bound to a specific triggering event on the Auth0 platform. Auth0 invokes the custom code of these Actions when the corresponding triggering event is produced at runtime.",
    //   resourceUrl: "https://auth0.com/docs/actions",
    //   icon: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
    // },
  ];

  return (
    <div className="auth0-features">
      <h2 className="auth0-features__title">Explore Player Base Features</h2>
      <div className="auth0-features__grid">
        {featuresList.map((feature) => (
          <PlayerBaseFeature
            key={feature.resourceUrl}
            title={feature.title}
            description={feature.description}
            resourceUrl={feature.resourceUrl}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};
