import { PagePokemonRepository } from './pagePokemonRepository';
import { WinsPokemonRepository } from './vicotryByPokeRepository';

export class PokemonRepository {

    constructor(){
        this.mem = new Map(this.#savedData());
        this.winsRepo = new WinsPokemonRepository();
    }

    #savedData() {
        const oldMemString = window.localStorage.getItem('cache');
        const oldMem = JSON.parse(oldMemString);
        return oldMem === null ? [] : Object.entries(oldMem);
    }

    #get(url){
        this.#validedWinds(this.mem.get(url));
        return this.mem.get(url);
    }

    #has(url){
        return this.mem.has(url);
    }

    #sync(){
        const entries = this.mem.entries();
        const dataParsed = JSON.stringify(Object.fromEntries(entries));
        window.localStorage.setItem('cache', dataParsed);
    }

    #update(url, realData) {
        this.mem.set(url, realData);
        this.#sync();
    };

    #getVictoryByPokemon(pokemon) {
        const wins = this.winsRepo.get(pokemon);
        return {... pokemon, wins: wins };
    }

    #validedWinds(responsePageRepo) {
        const pokemonsWithWins = responsePageRepo.pokemons.map(
            (pk) => this.#getVictoryByPokemon(pk)
        );
        return {
            ...responsePageRepo,
            pokemons: pokemonsWithWins,
        };
    }

    async get(url) {
        const existInMem_p = this.#has(url);
        if (existInMem_p) {
            return Promise.resolve(this.#get(url));
        }
        const external = await PagePokemonRepository.get(url);
        const realData = this.#validedWinds(external);
        this.#update(url, realData);
        return this.#get(url);
    }
}
