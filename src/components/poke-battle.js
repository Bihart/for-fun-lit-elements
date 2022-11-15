import { LitElement, html, css } from "lit";

export class PokeBattle extends LitElement {
    static properties = {
        pokemons: { type: Array },
    }
    static styles = css`
        :host {
            display: block;
            border: solid 2px blanchedalmond;
        }
article {
  display: flex;
  flex-direction: row;
}

div {
  border: solid 2px navy;
  padding: 10px;
  margin: 10px;
}
`;

    constructor() {
        super();
        this.pokemons = [];
    }

    #validedContent() {
        const whenEmpty = html`<span> Please select pokemons to the battle.</span>`;
        const whenHavePokemons = this.pokemons.map(
            ({img, name}) => html`
<div>
           <img src=${img} alt=${`[Sprite of ${name}]`}/>
           <p>${name}</p>
</div>
`
        );
        return this.pokemons.length === 0 ? whenEmpty : whenHavePokemons;
    }

    render() {
        return html`
<section>
<h3>Zone of the poke battle</h3>
  <article>
    ${this.#validedContent()}
  </article>
</section>
     `;
    }
}
