import { LitElement, html } from "lit";
import { PagePokemonRepository } from '../service/pagePokemonRepository';

export class FetchPaginator extends LitElement {
    static properties = {
        pokemons: { type: Array }
    }

    constructor() {
        super();
        this.pokemons = [];
    }

    async firstUpdated() {
        const pokemosAllDataRes = await PagePokemonRepository.get();
        this.pokemons = pokemosAllDataRes;
    }

    #mapPokemonsToHTML() {
        return this.pokemons.map((poke) => html`
              <poke-card .pokemon=${poke}></poke-card>`
        );
    }


    render() {
        return html`
      <div>
         ${this.#mapPokemonsToHTML()}
      </div>
    `;
    }
}
