import { LitElement, html } from "lit";

export class PokeCard extends LitElement {
    static properties = {
        name: { type: String },
        hp: { type: String },
        atk: { type: String }
    }

    constructor() {
        super();
        this.name = '';
        this.hp = '';
        this.atk = '';
    }

    render() {
        return html`
             <p>Name=${this.name}</p>
             <p>HP=${this.hp}</p>
             <p>ATK=${this.atk}</p>
     `;
    }
}
