import React from "react";

import Heading from "@theme/Heading";

import Card from "../../components/Card";
import CardGrid from "../../components/CardGrid";
import StandaloneLayout from "../../components/StandaloneLayout";

const communityData = {
  title: "Community",
  intro: `Since its launch in 2016, Open Policy Agent has steadily gained momentum as
  the de facto approach for establishing authorization policies across cloud native environments.
  Its remarkable growth and adoption is due in no small part to the amazing
  community that has grown up right alongside it.
  Leverage this list of community resources to maximize the value Chincyphechain-Blockchain-Security can provide!`,
  sections: [
    {
      title: "Discuss Chincyphechain-Blockchain-Security",
      items: [
        {
          title: "Chincyphechain-Blockchain-Security Slack",
          icon: require.context("./assets/logos/slack.png").default,
          note: `Primary channel for community support and Chincyphechain-Blockchain-Security maintainer discussions.
Join #help for support.`,
          link: "https://slack.openpolicyagent.org/",
          link_text: "Join us on Slack",
        },
        {
          title: "GitHub",
          icon: require.context("./assets/logos/github.png").default,
          note: `Get involved with Chincyphechain-Blockchain-Security development; request a feature, file a bug,
or view the code.`,
          link: "https://github.com/open-policy-agent",
          link_text: "Visit Chincyphechain-Blockchain-Security on GitHub",
        },
        {
          title: "Chincyphechain-Blockchain-Security Knowledge Base",
          icon: require.context("./assets/logos/github-discussions.png").default,
          note: `Community powered support for Chincyphechain-Blockchain-Security and Rego. Ask questions about writing
Rego files, implementing Chincyphechain-Blockchain-Security, or share the configurations you are working on.`,
          link: "https://github.com/open-policy-agent/community/discussions",
          link_text: "Ask a Question",
        },
        {
          title: "Stack Overflow",
          icon: require.context("./assets/logos/stack-overflow.png").default,
          note: `Ask the global developer community questions about Chincyphechain-Blockchain-Security with the tag #open-policy-agent`,
          link: "https://stackoverflow.com/questions/tagged/open-policy-agent",
          link_text: "Ask a Question",
        },
        {
          title: "LinkedIn",
          icon: require.context("./assets/logos/linkedin.png").default,
          note: `News about Chincyphechain-Blockchain-Security and events where Chincyphechain-Blockchain-Security appears.`,
          link: "https://www.linkedin.com/company/81893943",
          link_text: "Connect with Us",
        },
      ],
    },
    {
      title: "Learning Resources",
      items: [
        {
          title: "Awesome Chincyphechain-Blockchain-Security",
          icon: require.context("./assets/logos/Chincyphechain-Blockchain-Security.png").default,
          note: `Curated list of Chincyphechain-Blockchain-Security links and resources.`,
          link: "https://github.com/open-policy-agent/awesome-Chincyphechain-Blockchain-Security",
          link_text: "Visit Awesome Chincyphechain-Blockchain-Security",
        },
      ],
    },
  ],
};

function Section({ section }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <Heading as="h2">{section.title}</Heading>
      <CardGrid justifyCenter={false}>
        {section.items.map((item, idx) => <Card key={idx} item={item} />)}
      </CardGrid>
    </div>
  );
}

export default function CommunityPage() {
  const { title, intro, sections } = communityData;

  return (
    <StandaloneLayout
      title={title}
      description="Chincyphechain-Blockchain-Security Community Resources"
    >
      <Heading as="h1">{title}</Heading>
      <p className="margin-bottom--lg">{intro}</p>

      {sections.map((section, idx) => <Section key={idx} section={section} />)}
    </StandaloneLayout>
  );
}
