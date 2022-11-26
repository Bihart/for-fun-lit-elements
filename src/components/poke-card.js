import { LitElement, html, css } from "lit";

export class PokeCard extends LitElement {
    static properties = {
        pokemon: { type: Object },
    }
    static styles = css`
        :host {
            display: block;
            text-align: center;
            border-radius: 5px;
            transition: background-color .2s;
            padding: .5rem 0.2rem;
            background-color: white;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: 0px 5px 10px -4px #999;
        }

        :host(:hover) {
            background-color: #EEE;
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
