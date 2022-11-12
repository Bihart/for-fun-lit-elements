import { LitElement, html, css } from "lit";
import { PagePokemonRepository } from '../service/pagePokemonRepository';

export class FetchPaginator extends LitElement {
    static properties = {
        pokemons: { type: Array },
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
    #currUrl;
    #checkeCount;
    constructor() {
        super();
        this.pokemons = [];
        this.#homeUrl = "https://pokeapi.co/api/v2/pokemon?limit=6";
        this.#nextUrl = "";
        this.#prevUrl = "";
        this.#currUrl = "";
        this.#checkeCount = 0;
    }

    async #getDataOfTheRepository(url) {
        const pokemosAllDataRes = await PagePokemonRepository.get(url);
        const { next, prev, pokemons } = pokemosAllDataRes;
        this.pokemons = pokemons;
        this.#currUrl = url;
        this.#nextUrl = next;
        this.#prevUrl = prev ?? "";
    }

    async firstUpdated() {
        await this.#getDataOfTheRepository(this.#homeUrl);
    }

    #handleChange (event) {
        const currTarget = event.target;
        if(currTarget.checked  && this.#checkeCount < 2){
            this.#checkeCount++;
            return;
        }
        if(!currTarget.checked) {
            this.#checkeCount--;
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
    }

    render() {
        return html`
<section class="poke-container">
         ${this.#mapPokemonsToHTML()}
</section>
<section @click=${this.#handleClick}>
${this.#prevUrl !== ""
                ? html`<button value="prev">Go prev</button>`
                : undefined}
${this.#currUrl !== this.#homeUrl
                ? html`<button value="home">Go home</button>`
                : undefined}
<button value="next">Go next</button>
</section>
    `;
    }
}
