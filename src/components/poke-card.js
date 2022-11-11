import { LitElement, html, css } from "lit";

export class PokeCard extends LitElement {
    static properties = {
        pokemon: { type: Object },
    }
    static styles = css`
        :host {
            border: solid 2px  blue;
            margin: 0.5rem;
            padding: 0.3rem;
            text-align: center;
        }`;

    constructor() {
        super();
        this.pokemon = {};
    }

    render() {
        const { name, hp, atk, img } = this.pokemon;
        return html`
           <img src=${img} alt=${`[Sprite of ${name}]`}/>
           <p>Name->${name}</p>
           <p>HP->${hp}</p>
           <p>ATK->${atk}</p>
     `;
    }
}
