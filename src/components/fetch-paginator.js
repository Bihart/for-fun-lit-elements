import { LitElement, html, css } from "lit";
import { PokemonRepository } from "../service/pokeRepository";

export class FetchPaginator extends LitElement {
    static properties = {
        _pokemons: { type: Array,
                     state: true
                   },
        signal: { type: Boolean },
    }

    static styles = css`
:host {
   display: flex;
   flex-direction: column;
   gap: 1em;
   margin: 1em;
   padding: 1em;
   width: max(45vw, 550px);
   border-radius: 0.3em;
   box-shadow: 0 0 5px 0 red;
   box-sizing: border-box;
}

.poke-container {
    display: grid;
    grid-gap: 10px;
    grid-template: repeat(2, 1fr) / repeat(3, 1fr);
}

.btns-container {
   align-self: center;
}

input {
  display: none;
}

input:checked + poke-card {
  background-color: red;
}
`;
    #homeUrl;
    #nextUrl;
    #currUrl;
    #prevUrl;
    #checkedsPokemons;
    #checkeCount;
    constructor() {
        super();
        this._pokemons = [];
        this.#homeUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=6";
        this.#nextUrl = "";
        this.#currUrl = "";
        this.#prevUrl = "";
        this.#checkedsPokemons = new Map();
        this._signal = false;
        this.#checkeCount = 0;
        this.repo = new PokemonRepository();
    }

    set signal(newVal) {
        if(!newVal) {
            this._signal = newVal;
            return;
        }
        this._signal = false;
        this.#getDataOfTheRepository(this.#currUrl);
    }

    async #getDataOfTheRepository(url) {
        const pokemosAllDataRes = await this.repo.get(url);
        const { next, prev, pokemons } = pokemosAllDataRes;
        this._pokemons = pokemons;
        this.#currUrl = url;
        this.#nextUrl = next;
        this.#prevUrl = prev ?? "";
    }

    async firstUpdated() {
        await this.#getDataOfTheRepository(this.#homeUrl);
    }

    #handleChange (event) {
        event.preventDefault();
        const currTarget = event.target;
        const pokeCard =  currTarget.nextElementSibling;
        const poke = pokeCard.__pokemon;
        const { name: pokeName } = poke;
        if(currTarget.checked  && this.#checkeCount < 2){
            this.#checkedsPokemons.set(pokeName, true);
            this.#checkeCount++;
            this.#dispatchEventGoToTheBattle("add", poke);
            return;
        }
        if(!currTarget.checked) {
            this.#checkeCount--;
            this.#checkedsPokemons.delete(pokeName);
            this.#dispatchEventGoToTheBattle("remove", poke);
            return;
        }
        currTarget.checked = false;
    }

    #dispatchEventGoToTheBattle(command, poke){
        const configAndPayload = {
            detail: {
                command: command,
                pokemon: poke,
            },
            bubbles: true,
            composed: true,
            cancelable: false,
        };
        const myEvent = new CustomEvent('goToTheBattle', configAndPayload);
        this.dispatchEvent(myEvent);
    }

    async #handleClick(event) {
        const target = event.target;
        const { tagName, value } = target;
        const IsButton = tagName === "BUTTON";
        if (!IsButton) {
            return;
        }
        const urlsToGoMap = new Map([
            ["prev", this.#prevUrl],
            ["home", this.#homeUrl],
            ["next", this.#nextUrl]
        ]);
        const urlToGo = urlsToGoMap.get(value);
        let checkboxs = this.shadowRoot.querySelectorAll('input[type=checkbox]');
        Array.from(checkboxs).forEach(x => x.checked = false);
        await this.#getDataOfTheRepository(urlToGo);
        return;
    }

    #mapPokemonsToHTML() {
        const render_by_pokemon = (poke) => {
            const { name: pokeName } = poke;
            const isChecked = this.#checkedsPokemons.has(pokeName);
            return html`
<label>
<input @change=${this.#handleChange}
       type="checkbox"
       value=${pokeName}
       ?checked=${isChecked}>
  <poke-card .pokemon=${poke}></poke-card>
</label>
`
        };

        return this._pokemons.map(render_by_pokemon);
    }

    render() {
        return html`
<section class="poke-container">
         ${this.#mapPokemonsToHTML()}
</section>
<section  class="btns-container" @click=${this.#handleClick}>
<button value="prev" ?disabled=${this.#prevUrl === ""}>Go prev</button>
<button value="home">Go home</button>
<button value="next" ?disabled=${this.#nextUrl === ""}>Go next</button>
</section>
    `;
    }
}
