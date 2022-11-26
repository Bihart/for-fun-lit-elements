import { html } from "lit";

export const homeIcon = [
  "home",
  html`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>`,
];

export const prevIcon = [
  "prev",
  html`<svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <rect fill="none" height="24" width="24" />
    <g><polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12" /></g>
  </svg>`,
];

export const nextIcon = [
  "next",
  html`<svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <g><path d="M0,0h24v24H0V0z" fill="none" /></g>
    <g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" /></g>
  </svg>`,
];
