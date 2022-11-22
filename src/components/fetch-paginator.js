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
    #checkeCount;
    constructor() {
        super();
        this._pokemons = [];
        this.#homeUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=6";
        this.#nextUrl = "";
        this.#currUrl = "";
        this.#prevUrl = "";
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
        const pokeCardUWU =  currTarget.nextElementSibling;
        const pokeuwu = pokeCardUWU.__pokemon;
        if(currTarget.checked  && this.#checkeCount < 2){
            this.#checkeCount++;
            this.#dispatchEventGoToTheBattle("add", pokeuwu);
            return;
        }
        if(!currTarget.checked) {
            this.#checkeCount--;
            this.#dispatchEventGoToTheBattle("remove", pokeuwu);
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
        await this.#getDataOfTheRepository(urlToGo);
        return;
    }

    #mapPokemonsToHTML() {
        return this._pokemons.map(
            (poke) => html`
<label>
<input @change=${this.#handleChange} type="checkbox" value=${poke.name}>
<poke-card .pokemon=${poke}></poke-card>
</label>
`
        );
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
