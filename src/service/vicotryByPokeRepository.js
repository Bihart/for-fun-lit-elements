export class WinsPokemonRepository {

    constructor(){
    }

    #getMem() {
        const memString = window.localStorage.getItem('wins');
        const mem = JSON.parse(memString) ??  {};
        return mem;
    }

    #get(pokename){
        const mem = this.#getMem();
        return mem[pokename];

    }

    #has(pokename){
        const mem = this.#getMem();
        return mem[pokename] !== undefined;
    }

    #addWin(pokename) {
        const mem = this.#getMem();
        const oldWinds = mem[pokename] ?? 0;
        mem[pokename] = oldWinds + 1;
        const memString = JSON.stringify(mem);
        window.localStorage.setItem('wins', memString);
    };

    get({name}) {
        const existInMem_p = this.#has(name);
        if (existInMem_p) {
            return this.#get(name);
        }
        return 0;
    }

    update({name}) {
        this.#addWin(name);
    }
}
