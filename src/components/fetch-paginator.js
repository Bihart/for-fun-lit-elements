import { LitElement, html, css } from "lit";
import { Pokemon_Battle } from "../models/pokemon";
import { PokemonRepository } from "../service/pokeRepository";

export class FetchPaginator extends LitElement {
    static properties = {
        pokemons: { type: Array },
        readyToBattle: { type: Boolean },
    }

    static styles = css`
.poke-container {
    display: grid;
    grid-gap: 10px;
    grid-template: repeat(2, 1fr) / repeat(3, 0.5fr);
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
    #prevUrl;
    #checkeCount;
    constructor() {
        super();
        this.pokemons = [];
        this.#homeUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=6";
        this.#nextUrl = "";
        this.#prevUrl = "";
        this.#checkeCount = 0;
        this.readyToBattle = false;
        this.repo = new PokemonRepository();
    }

    async #getDataOfTheRepository(url) {
        const pokemosAllDataRes = await this.repo.get(url);
        const { next, prev, pokemons } = pokemosAllDataRes;
        this.pokemons = pokemons;
        this.#nextUrl = next;
        this.#prevUrl = prev ?? "";
    }

    async firstUpdated() {
        await this.#getDataOfTheRepository(this.#homeUrl);
    }

    updateReadyToBattle(){
        this.readyToBattle = this.#checkeCount === 2;
    }

    #handleChange (event) {
        event.preventDefault();
        const currTarget = event.target;
        if(currTarget.checked  && this.#checkeCount < 2){
            this.#checkeCount++;
            this.updateReadyToBattle();
            this.#dispatchEventGoToTheBattle();
            return;
        }
        if(!currTarget.checked) {
            this.#checkeCount--;
            this.updateReadyToBattle();
            this.#dispatchEventGoToTheBattle();
            return;
        }
        currTarget.checked = false;
    }


    #mapPokemonsToHTML() {
        return this.pokemons.map(
            (poke) => html`
<label>
<input @change=${this.#handleChange} type="checkbox" value=${poke.name}>
<poke-card .pokemon=${poke}></poke-card>
</label>
`
        );
    }

    dispatchEventPleaseUpdateme(url) {
        const configAndPayload = {
            detail: { url: url, },
            bubbles: true,
            composed: true,
            cancelable: false,
        };
        const myEvent = new Event('pleaseUpdateMe', configAndPayload);
        return this.dispatchEvent(myEvent);
    }
    #dispatchEventGoToTheBattle(){
        const pokemotToSend = this.shadowRoot.querySelectorAll("input:checked + poke-card");
        const configAndPayload = {
            detail: { pokemons: pokemotToSend, },
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
        if (value !== "battle") {
            const urlsToGoMap = new Map([
                ["prev", this.#prevUrl],
                ["home", this.#homeUrl],
                ["next", this.#nextUrl]
            ]);
            const urlToGo = urlsToGoMap.get(value);
            await this.#getDataOfTheRepository(urlToGo);
            return;
        }
        // this.dispatchEventPleaseUpdateme("hola");
        // const winner = Pokemon_Battle.pokeBattel(...this.pokemons);
        // this.#dispatchEventGoToTheBattle();
    }

    #renderButtonBattle(){
        const disabled_p = !this.readyToBattle;
        return html`
<button value="battle" ?disabled=${disabled_p}>Pelear go go go!!</button>`;
    }

    render() {
        return html`
<section class="poke-container">
         ${this.#mapPokemonsToHTML()}
</section>
<section @click=${this.#handleClick}>
<button value="prev" ?disabled=${this.#prevUrl === ""}>Go prev</button>
<button value="home">Go home</button>
<button value="next" ?disabled=${this.#nextUrl === ""}>Go next</button>
${this.#renderButtonBattle()}
</section>
    `;
    }
}
