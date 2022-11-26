import { LitElement, html, css } from "lit";
import { Pokemon_Battle } from '../models/pokemon';

export class PokeBattle extends LitElement {
    static properties = {
        pokemons: { type: Array },
        winner: { type: Object },
    }
    static styles = css`
:host {
  width: max(45vw, 500px);
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
}

h3 {
  font-size: 1.3rem;
}

button {
  padding: .5rem 1rem;
  border-radius: 2px;
  border: solid 2px transparent;
  background-color: #999;
  color: black;
  font-size: 1.05rem;
  cursor: pointer;
}

button[disabled] {
  color: #0009;
  background-color: #AAA;
}

section {
   width: 90%;
   height: max(35vh, 400px);
   border-radius: 0.3em;
   background-color: white;
   box-shadow: 0px 5px 10px -4px #999;
   color: black;
}
article {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
}

.glatiadors {
  border-radius: 0.3em;
  padding: 10px;
  margin: 10px;
  background-color: #999;
}

.glatiadors img {
  filter: drop-shadow(2px 4px 6px black);
}

.glatiador-0 { background-color: red; }
.glatiador-1 { background-color: cyan; }

.champion {
  border-radius: 0.3em;
  background-color: #31f92f;
  padding: 10px;
  margin: 10px;
}
.champion img {
  filter: drop-shadow(2px 4px 6px black);
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
            ({img, name}, i) => html`
<div class="glatiadors glatiador-${i}">
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
