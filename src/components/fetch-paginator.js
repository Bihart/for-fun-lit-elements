import { LitElement, html } from "lit";

export class FetchPaginator extends LitElement {
    static properties = {
        pokemons: { type: Array }
    }

    constructor() {
        super();
        this.pokemons = [];
    }
    async #fetcher(url) {
        const res = await fetch(url);
        return await res.json();
    }

    async firstUpdated() {
        const URL = "https://pokeapi.co/api/v2/pokemon?limit=6";
        const page = await this.#fetcher(URL);
        const pokemonsUrl = page.results.map(x => x.url);
        const pokemonPromises = pokemonsUrl.map(url => this.#fetcher(url));
        const pokemosAllDataRes = await Promise.all(pokemonPromises);
        this.pokemons = pokemosAllDataRes;
    }

    #mapURLandNames() {
        function localParse({name, stats: [ {base_stat: hp}, {base_stat: atk}]}) {
            return {
                'name': name,
                'hp': hp,
                'atk': atk
            };
        };

        const localToParse = this.pokemons.map(localParse);
        return localToParse.map(({name, hp, atk}) => html`
              <poke-card name=${name} hp=${hp} atk=${atk}></poke-card>`
        );
    }


    render() {
        return html`
      <div>
         ${this.#mapURLandNames()}
      </div>
    `;
    }
}
