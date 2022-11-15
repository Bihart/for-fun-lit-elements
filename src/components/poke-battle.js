import { LitElement, html, css } from "lit";

export class PokeBattle extends LitElement {
    static properties = {
        pokemons: { type: Array },
    }
    static styles = css`
        :host {
            display: block;
            border: solid 2px blanchedalmond;
        }`
    ;

    constructor() {
        super();
        this.pokemons = [];
    }

    #validedContent() {
        const whenEmpty = html`<span> Please select pokemons to the battle.</span>`;
        const whenHavePokemons = this.pokemons.map(
            ({img, name}) => html`
<article>
           <img src=${img} alt=${`[Sprite of ${name}]`}/>
           <p>Name->${name}</p>
</article>`
        );
        return this.pokemons.length === 0 ? whenEmpty : whenHavePokemons;
    }


    render() {
        return html`
<section> Zone of the poke battle </section>
${this.#validedContent()}
     `;
    }
}
