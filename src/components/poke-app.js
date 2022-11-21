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

    #handleBattle(event) {
        const details = event.detail.pokemons;
        const poke_cards =  Array.from(details);
        const pokemons = poke_cards.map(x => x.__pokemon);
        this.pokemonsToBattle = pokemons;
    }

    render() {
        return html`
            <fetch-paginator .signal=${this.signal}>
            </fetch-paginator>
            <poke-battle .pokemons=${this.pokemonsToBattle}></poke-battle>`;
    }
}

export default PokeApp;
