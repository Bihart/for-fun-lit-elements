import { LitElement, html, css } from "lit";
import { PagePokemonRepository } from '../service/pagePokemonRepository';

export class FetchPaginator extends LitElement {
    static properties = {
        pokemons: { type: Array },
        nextUrl: { type: String },
        prevUrl: { type: String },
        currUrl: { type: String },
    }

    static styles = css`
    :host {
    display: grid;
    grid-gap: 10px;
    grid-template: repeat(2, 1fr) / repeat(3, 0.5fr);
    grid-auto-flow: column;
}`;
    constructor() {
        super();
        this.pokemons = [];
        this.home = "https://pokeapi.co/api/v2/pokemon?limit=6";
        this.nextUrl = "";
        this.prevUrl = "";
        this.currUrl = "";
    }

    async firstUpdated() {
        const pokemosAllDataRes = await PagePokemonRepository.get(this.home);
        const { next, prev, pokemons } = pokemosAllDataRes;
        this.pokemons = pokemons;
        this.nextUrl = next;
        this.prevUrl = prev;
    }

    #mapPokemonsToHTML() {
        return this.pokemons.map(
            (poke) => html`<poke-card .pokemon=${poke}></poke-card>`
        );
    }

    render() {
        return html`
         ${this.#mapPokemonsToHTML()}
    `;
    }
}
