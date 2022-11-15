import { WinsPokemonRepository } from '../service/vicotryByPokeRepository';

class Pokemon_Battle {
    static pokeBattel(pk1, pk2){
        const { hp: hpP1, atk: atkP1} = pk1;
        const { hp: hpP2, atk: atkP2} = pk2;
        const turnToWinP1 = Math.floor(hpP2 / atkP1);
        const turnToWinP2 = Math.floor(hpP1 / atkP2);
        const winer = turnToWinP1 > turnToWinP2  ? pk1 : pk2;
        const repo = new WinsPokemonRepository();
        repo.update(winer);
        return winer;
    }
}

export { Pokemon_Battle };
