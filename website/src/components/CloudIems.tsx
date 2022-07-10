/* eslint-disable @next/next/no-img-element */
import React from "react";
import clsx from "clsx";

const CloudItems = [
  {
    title: "Cloud - Deno",
    src: "/cloud/img/assets/deno",
    alt: "Deno Preview",
    description: <>Make your home cloud running with a deno interface.</>,
  },
  {
    title: "Cloud - Github",
    src: "/cloud/img/assets/github",
    alt: "Github Logo",
    description: <>Make your home cloud running with a github interface.</>,
  },
];

function CloudItem({ src, alt, title, description }) {
  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <picture>
          <source srcSet={`${src}.avif`} type="image/avif" />
          <source srcSet={`${src}.jpg`} type="image/jpg" />
          <img className="cloud-item" src={`${src}.jpg`} loading="lazy" alt={alt} />
        </picture>
      </div>
      <div className="text--center padding-horiz--md">
        <h3 className="gradient-text">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className="preview-content">
      <div className="container">
        <div className="row">
          {CloudItems.map((props, idx) => (
            <CloudItem key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
