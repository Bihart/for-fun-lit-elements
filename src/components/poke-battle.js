import { LitElement, html, css } from "lit";
import { Pokemon_Battle } from '../models/pokemon';

export class PokeBattle extends LitElement {
    static properties = {
        pokemons: { type: Array },
        winner: { type: Object },
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

.main {
  display: flex;
  flex-direction: columns;
}

.glatiadors {
  border: solid 2px navy;
  padding: 10px;
  margin: 10px;
}
.champion {
  border: solid 2px navajowhite;
  padding: 10px;
  margin: 10px;
}
`;
    #pokemons;
    constructor() {
        super();
        this.#pokemons = [];
        this.winner = {};
    }

    set pokemons(newVal) {
        if(newVal.length !== 2){
            this.winner = {};
        }

        this.#pokemons = newVal;
        this.requestUpdate();
    }

    #dispatchUpdate(signal) {
        const configAndPayload = {
            detail: { signal: signal, },
            bubbles: true,
            composed: true,
            cancelable: false,
        };
        const myEvent = new CustomEvent('UpdateCards', configAndPayload);
        return this.dispatchEvent(myEvent);
    }

    #handleClick(){
        const winner = Pokemon_Battle.pokeBattel(...this.#pokemons);
        this.#dispatchUpdate(true);
        this.winner = winner;
        setTimeout(() => this.#dispatchUpdate(false), 5);

    }

    #validedContent() {
        const whenEmpty = html`<span> Please select pokemons to the battle.</span>`;
        const whenHavePokemons = this.#pokemons.map(
            ({img, name}) => html`
<div class="glatiadors">
<h4>Gladiator</h4>
           <img src=${img} alt=${`[Sprite of ${name}]`}/>
           <p>${name}</p>
</div>
`
        );
        return this.#pokemons.length === 0 ? whenEmpty : whenHavePokemons;
    }

    #validedWinner() {
        const isEmpty = Object.keys(this.winner).length === 0;
        if(isEmpty) {
            return undefined;
        }
        const { name, img } = this.winner;
        return html`
        <div class="champion">
<h4>Winner</h4>
            <img src=${img} alt=${`[Sprite of ${name}]`} />
            <p>${name}</p>
</div>
`;
   }

    #renderButtonBattle(){
        const disabled_p = this.#pokemons.length != 2;
        return html`
<button value="battle" ?disabled=${disabled_p} @click=${this.#handleClick}>
  Pelear go go go!!
</button>`;
    }

    render() {
        return html`
<section>
<h3>Zone of the poke battle</h3>
${this.#renderButtonBattle()}
<section class="main">
  <article>
    ${this.#validedContent()}
  </article>
<article>
    ${this.#validedWinner()}
 </article>
</section>
</section>
     `;
    }
}
