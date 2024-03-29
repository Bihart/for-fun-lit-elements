import { LitElement, html, css } from "lit";
import { FetchPaginator } from "./fetch-paginator.js";
import { PokeBattle } from "./poke-battle.js";

export class PokeApp extends LitElement {
	static properties = {
		pokemonsToBattle: { type: Array, },
		signal: { type: Boolean, },
	}
	static styles = css`
		:host {
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			justify-content: center;
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

window.customElements.define("fetch-paginator", FetchPaginator);
window.customElements.define("poke-battle", PokeBattle);
export default PokeApp;
