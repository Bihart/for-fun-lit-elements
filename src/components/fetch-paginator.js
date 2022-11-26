import { LitElement, html, css } from "lit";
import { PokemonRepository } from "../service/pokeRepository";

export class FetchPaginator extends LitElement {
    static properties = {
        _pokemons: {
            type: Array,
            state: true
        },
        signal: { type: Boolean },
    }

    static styles = css`
:host {
   display: flex;
   flex-direction: column;
   gap: 1em;
   margin: 1em;
   padding: 1em;
   width: max(45vw, 550px);
   border-radius: 0.3em;
   box-sizing: border-box;
}

.poke-container {
    display: grid;
    grid-gap: 10px;
    grid-template: repeat(2, 1fr) / repeat(3, 1fr);
}

.btns-container {
   align-self: center;
}

input {
  display: none;
}

input:checked + poke-card {
  box-shadow: 0px 5px 10px -4px #999, 0px 10px 5px -5px red;
}
input:checked + poke-card::after {
  content: "";
  position: absolute;
  background-color: red;
  height: 7px;
  bottom: 0;
  left: 0;
  right: 0;
}

button {
  border-radius: 5px;
  border: solid 2px transparent;
  background-color: transparent;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

button[disabled] {
  pointer-events: none;
  opacity: 0.8;
  cursor: default;
}

button:hover:not([disabled]) {
  transform: scale(1.1);
}
`;
    #linksToNav
    #currUrl;
    #checkedsPokemons;
    #checkeCount;
    constructor() {
        super();
        this._pokemons = [];
        this.#linksToNav = new Map([
            ["prev", ""],
            ["home", "https://pokeapi.co/api/v2/pokemon?offset=0&limit=6"],
            ["next", ""]
        ]);
        this.#currUrl = "";
        this.#checkedsPokemons = new Map();
        this._signal = false;
        this.#checkeCount = 0;
        this.repo = new PokemonRepository();
    }

    set signal(newVal) {
        if (!newVal) {
            this._signal = newVal;
            return;
        }
        this._signal = false;
        this.#getDataOfTheRepository(this.#currUrl);
    }

    async #getDataOfTheRepository(url) {
        const pokemosAllDataRes = await this.repo.get(url);
        const { next, prev, pokemons } = pokemosAllDataRes;
        this._pokemons = pokemons;
        this.#currUrl = url;
        this.#linksToNav.set("next", next);
        this.#linksToNav.set("prev", prev ?? "");
    }

    async firstUpdated() {
        const homeUrl = this.#linksToNav.get("home");
        await this.#getDataOfTheRepository(homeUrl);
    }

    #handleChange(event) {
        event.preventDefault();
        const currTarget = event.target;
        const pokeCard = currTarget.nextElementSibling;
        const poke = pokeCard.__pokemon;
        const { name: pokeName } = poke;
        if (currTarget.checked && this.#checkeCount < 2) {
            this.#checkedsPokemons.set(pokeName, true);
            this.#checkeCount++;
            this.#dispatchEventGoToTheBattle("add", poke);
            return;
        }
        if (!currTarget.checked) {
            this.#checkeCount--;
            this.#checkedsPokemons.delete(pokeName);
            this.#dispatchEventGoToTheBattle("remove", poke);
            return;
        }
        currTarget.checked = false;
    }

    #dispatchEventGoToTheBattle(command, poke) {
        const configAndPayload = {
            detail: {
                command: command,
                pokemon: poke,
            },
            bubbles: true,
            composed: true,
            cancelable: false,
        };
        const myEvent = new CustomEvent('goToTheBattle', configAndPayload);
        this.dispatchEvent(myEvent);
    }

    #uncheckAllCheckbox() {
        const checkboxs = this.shadowRoot.querySelectorAll('input[type=checkbox]');
        Array.from(checkboxs).forEach(x => x.checked = false);
    }

    #getValueInHandleClick(target) {
        const { tagName }  = target;
        if (tagName === "POKE-ICON") {
            return target.getAttribute("name");
        }
        if (tagName === "BUTTON") {
            return target.getAttribute("value");
        }
        throw "Invalid target";
    }

    async #handleClick(event) {
        const target = event.target;
        const value = this.#getValueInHandleClick(target);
        const urlToGo = this.#linksToNav.get(value);
        this.#uncheckAllCheckbox();
        await this.#getDataOfTheRepository(urlToGo);
    }

    #mapPokemonsToHTML() {
        const render_by_pokemon = (poke) => {
            const { name: pokeName } = poke;
            const isChecked = this.#checkedsPokemons.has(pokeName);
            return html`
<label>
<input @change=${this.#handleChange}
       type="checkbox"
       value=${pokeName}
       .checked=${isChecked}>
  <poke-card .pokemon=${poke}></poke-card>
</label>
`
        };

        return this._pokemons.map(render_by_pokemon);
    }

    render() {
        const prevIsEmptyLink = this.#linksToNav.get("prev") === "";
        const nextIsEmptyLink = this.#linksToNav.get("next") === "";
        return html`
<section class="poke-container">
   ${this.#mapPokemonsToHTML()}
</section>
<section class="btns-container">
  <button @click=${this.#handleClick} value="prev"
          ?disabled=${prevIsEmptyLink}>
    <poke-icon name="prev"/>
  </button>
  <button @click=${this.#handleClick} value="home">
    <poke-icon name="home"></poke-icon>
  </button>
  <button @click=${this.#handleClick} value="next"
          ?disabled=${nextIsEmptyLink}>
    <poke-icon name="next"></poke-icon>
  </button>
</section>
    `;
    }
}
