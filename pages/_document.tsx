import Document, { Head, Html, Main, NextScript } from "next/document";

const script = `
const scrollIntoHash = (url) => {
  document.querySelector("#user-content-" + new URL(url).hash.replace("#", ""))?.scrollIntoView?.();
};
document.addEventListener("DOMContentLoaded", () => {
  scrollIntoHash(window.location.href);
  window.addEventListener("hashchange", (e) => scrollIntoHash(e.newURL));
});
`;

export default class _Document extends Document {
  render() {
    return (
      <Html
        data-theme={
          this.props.__NEXT_DATA__.page.startsWith("/deno")
            ? "deno"
            : this.props.__NEXT_DATA__.page.startsWith("/github")
            ? "github"
            : "home"
        }
      >
        <Head />
        <body>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: script }} />
        </body>
      </Html>
    );
  }
}
