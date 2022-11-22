import { LitElement, html, css } from "lit";

export class PokeApp extends LitElement {
    static properties = {
        pokemonsToBattle: { type: Array, },
        signal: { type: Boolean, },
    }
    static styles = css`
        :host {
            display: flex;
        }
`;
    constructor() {
        super();
        this.pokemonsToBattle = [];
        this.signal=false;
        this.addEventListener('UpdateCards', this.#handleUpdateCard);
        this.addEventListener('goToTheBattle', this.#handleBattle);
    }

    #handleUpdateCard (event) {
        const signal =  event.detail.signal;
        this.signal= signal;
    }

    #addPokemon (pokemon) {
        this.pokemonsToBattle.push(pokemon);
        this.requestUpdate();
    }

    #removePokemon(pokemon) {
        const { name } = pokemon;
        const indexTaget = this.pokemonsToBattle
            .map(x => x.name)
            .indexOf(name);

        const pokemonExist = indexTaget !== -1;

        if (pokemonExist) {
            this.pokemonsToBattle.splice(indexTaget, 1);
            this.requestUpdate();
        }
    }


    #handleBattle(event) {
        const { command, pokemon } = event.detail;
        if ( command == "add" ) {
            this.#addPokemon(pokemon);
            return;
        }
        if ( command == "remove") {
            this.#removePokemon(pokemon);
            return;
        }
    }

    render() {
        return html`
            <fetch-paginator .signal=${this.signal}></fetch-paginator>
            <poke-battle .pokemons=${this.pokemonsToBattle}></poke-battle>`;
    }
}

export default PokeApp;
