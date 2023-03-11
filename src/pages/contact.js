import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ContactForm from "../components/ContactForm";
import { useForm, ValidationError } from "@formspree/react";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext(),
    [state, handleSubmit] = useForm("mdozlgpe");

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Get in touch!</h1>
        <p className="hero__subtitle">
          Fill out the form below to send me an email.
        </p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Contact`} description="Contact hogwarts.zone">
      <HomepageHeader />
      <main>
        <ContactForm />
      </main>
    </Layout>
  );
}
