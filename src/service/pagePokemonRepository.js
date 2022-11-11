export class PagePokemonRepository  {
    static async #fetcher(url) {
        const res = await fetch(url);
        return await res.json();
    }

    static #extractDataPokemon(
        { name,
          sprites: { front_default: img },
          stats: [
              { base_stat: hp },
              { base_stat: atk }
          ]
        }
    ) {
        return {
            'name': name,
            'hp': hp,
            'atk': atk,
            'img': img,
        };

    }
    static async #petitionPokemons({ results: pokemons }) {
        const pokemonsUrl = pokemons.map(x => x.url);
        const pokemonFetchs = pokemonsUrl.map(url => this.#fetcher(url));
        const pokemosAllDataResponse = await Promise.all(pokemonFetchs)
              .catch(() => console.error("fallo el promise.all :c"));
        return pokemosAllDataResponse.map(this.#extractDataPokemon);
    }

    static async #petition(url) {
        const page = await this.#fetcher(url)
              .catch(() => console.error("fallo el fetch :c"));

        const nextUrl = page.next ?? '';
        const prevUrl = page.previous ?? '';
        const pokemons = await this.#petitionPokemons(page);
        return {
            next: nextUrl,
            prev: prevUrl,
            pokemons: pokemons
        };
    }

    static getFake() {
        const missingNoImgUrl = "https://static.wikia.nocookie.net/espokemon/images/d/d8/MissingNo..png/revision/latest?cb=20160304145740";
        return {
            next: "https://google.com",
            prev: "https://youtube.com",
            pokemons: [
                { name: 'a', hp: 10, atk: 10, ulr: missingNoImgUrl },
                { name: 'b', hp: 10, atk: 15, ulr: missingNoImgUrl },
                { name: 'c', hp: 15, atk: 10, ulr: missingNoImgUrl },
            ]
        };
    }

    static async get(url) {
        return await this.#petition(url);
    }
}
