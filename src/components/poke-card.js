import { LitElement, html } from "lit";

export class PokeCard extends LitElement {
    static properties = {
        pokemon: { type: Object },
    }

    constructor() {
        super();
        this.pokemon = {};
    }

    render() {
        const { name, hp, atk } = this.pokemon;
        return html`
             <p>Name=${name}</p>
             <p>HP=${hp}</p>
             <p>ATK=${atk}</p>
     `;
    }
}
