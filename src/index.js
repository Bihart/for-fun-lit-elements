import { FetchPaginator } from "./components/fetch-paginator.js";
import { PokeBattle } from "./components/poke-battle.js";
import { PokeCard } from "./components/poke-card.js";
import { PokeApp } from "./components/poke-app.js";
import { Icon } from "./icons";

window.customElements.define("poke-card", PokeCard);
window.customElements.define("fetch-paginator", FetchPaginator);
window.customElements.define("poke-battle", PokeBattle);
window.customElements.define("poke-app", PokeApp);
window.customElements.define("poke-icon", Icon);
