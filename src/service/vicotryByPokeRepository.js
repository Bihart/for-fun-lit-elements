export class WinsPokemonRepository {

    constructor(){
        this.mem = new Map(this.#savedData());
    }

    #savedData() {
        const oldMemString = window.localStorage.getItem('wins');
        const oldMem = JSON.parse(oldMemString);
        return oldMem === null ? [] : Object.entries(oldMem);
    }

    #get(pokeName){
        return this.mem.get(pokeName);
    }

    #has(pokeName){
        return this.mem.has(pokeName);
    }

    #sync(){
        console.debug('Sí se esta sync');
        const entries = this.mem.entries();
        const dataParsed = JSON.stringify(Object.fromEntries(entries));
        window.localStorage.setItem('wins', dataParsed);
    }

    #addWin(pokeName) {
        const oldWinds = this.#get(pokeName);
        this.mem.set(pokeName, oldWinds + 1);
        this.#sync();
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
