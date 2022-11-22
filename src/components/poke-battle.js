import { LitElement, html, css } from "lit";
import { Pokemon_Battle } from '../models/pokemon';

export class PokeBattle extends LitElement {
    static properties = {
        pokemons: { type: Array },
        winner: { type: Object },
    }
    static styles = css`
        :host {
            display: flex;
            width: max(45vw, 500px);
            text-align: center;
            justify-content: center;
            align-items: center;
            flex-direction: columns;
            box-sizing: border-box;
        }

        section {
           width: 90%;
           height: max(35vh, 400px);
           box-shadow: 0 0 5px blue;
           border-radius: 0.3em;
        }
        article {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }

.glatiadors {
  box-shadow: 0 0 5px navy;
  border-radius: 0.3em;
  padding: 10px;
  margin: 10px;
}
.champion {
  box-shadow: 0 0 5px navy;
  border-radius: 0.3em;
  border: solid 2px navajowhite;
  background-color: navajowhite;
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
        const whenEmpty = html`
<p>
  <span> Please select pokemons to the battle.</span>
</p>`;
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
  <article>
    ${this.#validedContent()}
    ${this.#validedWinner()}
  </article>
</section>
     `;
    }
}
