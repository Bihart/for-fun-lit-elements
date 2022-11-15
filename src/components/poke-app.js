import { LitElement, html, css } from "lit";
import { PagePokemonRepository } from "../service/pagePokemonRepository";

export class PokeApp extends LitElement {
    static properties = {
        allPokemons: { type: Array },
        pokemonsToBattle: { type: Array },
    }
    static styles = css`
        :host {
            display: block;
            border: solid 2px rebeccapurple;
            text-align: center;
        }
`;

    constructor() {
        super();
        this.allPokemons = [];
        this.pokemonsToBattle = [];
        this.initPoint = "https://pokeapi.co/api/v2/pokemon?limit=6";
        this.addEventListener('pleaseUpdateMe', this.#handleUpdateMe);
    }

    #handleUpdateMe (event) {
        console.log(event.detail);
    }

    async #getDataOfTheRepository(url) {
        const pokemosAllDataRes = await PagePokemonRepository.get(url);

    }
    render() {
        return html`
            <fetch-paginator .pokemons=${this.allPokemons}
                              home=${this.initPoint}>
            </fetch-paginator>
            <poke-battle></poke-battle>`;
    }
}

export default PokeApp;
