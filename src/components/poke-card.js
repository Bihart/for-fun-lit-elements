import { LitElement, html, css } from "lit";

export class PokeCard extends LitElement {
    static properties = {
        pokemon: { type: Object },
    }
    static styles = css`
        :host {
            display: block;
            text-align: center;
            box-shadow: 0 0 10px 0px #9393BF;
            border-radius: 5px;
            transition: background-color 1s linear;
            padding: 0.2em;
        }

        :host(:hover) {
            background-color: pink;
        }

        p:first-of-type {
            text-transform: capitalize;
        }

        img {
            border-radius: 50%;
            background-color: white;
        }
`;

    constructor() {
        super();
        this.pokemon = {};
    }

    render() {
        const { name, hp, atk, img, wins } = this.pokemon;
        return html`
           <img src=${img} alt=${`[Sprite of ${name}]`}/>
           <p>${name}</p>
           <p>HP: ${hp}</p>
           <p>ATK: ${atk}</p>
           <p>WINS: ${wins}</p>
     `;
    }
}
