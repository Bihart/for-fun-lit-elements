import { LitElement, html, css } from "lit";

export class PokeApp extends LitElement {
    static properties = {
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
        this.pokemonsToBattle = [];
        this.addEventListener('pleaseUpdateMe', this.#handleUpdateMe);
        this.addEventListener('goToTheBattle', this.#handleBattle);
    }

    #handleUpdateMe (event) {
        console.log(event.detail);
    }

    #handleBattle(event) {
        const details = event.detail.pokemons;
        const poke_cards =  Array.from(details);
        const pokemons = poke_cards.map(x => x.__pokemon);
        this.pokemonsToBattle = pokemons;
    }

    render() {
        return html`
            <fetch-paginator home=${this.initPoint}>
            </fetch-paginator>
            <poke-battle .pokemons=${this.pokemonsToBattle}></poke-battle>`;
    }
}

export default PokeApp;
