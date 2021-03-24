import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("NotFound");
    console.log(location.pathname);
  }

  async getHtml() {
    return `
            <h1>Error 404</h1>
            <p>Page '${location.pathname.substring(1)}' not found...</p>
        `;
  }
}