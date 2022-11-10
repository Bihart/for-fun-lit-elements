import { LitElement, css, html } from "lit";

export class MyElement extends LitElement {
    static get styles() {
        return css`
      :host {
        display: block;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }`;
    }

    constructor() {
        super();
    }

    render() {
        return html`
      <div>
         <h4> This is my firts elemente with web components and lit </h4>
      </div>
    `;
    }
}

window.customElements.define('my-element', MyElement);
