import { LitElement, html, css } from "lit";

export class PokeCard extends LitElement {
    static properties = {
        pokemon: { type: Object },
    }
    static styles = css`
        :host {
            display: block;
            border: solid 2px  blue;
            text-align: center;
        }
`;

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
