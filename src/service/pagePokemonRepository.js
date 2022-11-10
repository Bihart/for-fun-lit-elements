export class PagePokemonRepository  {
    static URL = "https://pokeapi.co/api/v2/pokemon?limit=6";

    static async #fetcher(url) {
        const res = await fetch(url);
        return await res.json();
    }

    static #dataFormat(
        { name,
          stats: [
              { base_stat: hp },
              { base_stat: atk }
          ]
        }
    ) {
        return {
            'name': name,
            'hp': hp,
            'atk': atk
        };

    }

    static async #petition() {
        const page = await this.#fetcher(this.URL);
        const pokemonsUrl = page.results.map(x => x.url);
        const pokemonFetchs = pokemonsUrl.map(url => this.#fetcher(url));
        const pokemosAllDataResponse = await Promise.all(pokemonFetchs);
        return pokemosAllDataResponse.map(this.#dataFormat);
    }

    static getFake() {
        return [
            { name: 'a', hp: 10, atk: 10 },
            { name: 'b', hp: 10, atk: 15 },
            { name: 'c', hp: 15, atk: 10 },
        ];
    }

    static async get() {
        return await this.#petition();
    }
}
