//criando obj jogadores
const player01 = {
    NOME: 'Mario',
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};
const player02 = {
    NOME: 'Luigi',
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

//RollDice
async function RollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch(true){
        case random < 0.33:
            result = 'RETA';
            break;

        case random < 0.66:
            result = 'CURVA';
            break;

        default:
            result = 'CONFRONTO';
            break;;
    };

    return result;
};

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character01, character02) {
    //rodadas
    for(let round = 1; round <= 5; round++){
        console.log(`Rodada ${round}`);
       
        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);


        //dice result
        let diceResult01 = await RollDice();
        let diceResult02 = await RollDice();

        //test skill
        let testSkill01 = 0;
        let testSkill02 = 0;

        if(block === "RETA"){
            testSkill01 = diceResult01 + character01.VELOCIDADE;
            testSkill02 = diceResult02 + character02.VELOCIDADE;

            await logRollResult(character01.NOME, "velocidade", diceResult01, character01.VELOCIDADE);
            await logRollResult(character02.NOME, "velocidade", diceResult02, character02.VELOCIDADE);
        }

        if(block === "CURVA"){
            testSkill01 = diceResult01 + character01.MANOBRABILIDADE;
            testSkill02 = diceResult02 + character02.MANOBRABILIDADE;

            await logRollResult(character01.NOME, "manobrabilidade", diceResult01, character01.MANOBRABILIDADE);
            await logRollResult(character02.NOME, "manobrabilidade", diceResult02, character02.MANOBRABILIDADE);
        }

        if(block === "CONFRONTO"){
            let powerResult01 = diceResult01 + character01.PODER;
            let powerResult02 = diceResult02 + character02.PODER;

            console.log(`${character01.NOME} confrontou com ${character02.NOME}!`);
            
            await logRollResult(character01.NOME, "poder", diceResult01, character01.PODER);
            await logRollResult(character02.NOME, "poder", diceResult02, character02.PODER);


            if(powerResult01 > powerResult02 && character02.PONTOS > 0){
                console.log(
                    `${character01.NOME} venceu o confronto! ${character02.NOME} perdeu 1 ponto`
                );

                character02.PONTOS--;
            }

            if(powerResult02 > powerResult01 && character01.PONTOS > 0){
                console.log(
                    `${character02.NOME} venceu o confronto! ${character01.NOME} perdeu 1 ponto`
                );

                character01.PONTOS--;
            }

            console.log(powerResult01 === powerResult02 ? "confronto empatado" : "");
        };

        //verificando o vencedor    
        if(testSkill01 > testSkill02){
            console.log(`${character01.NOME} marcou um ponto!`);
            character01.PONTOS++;
        }else if(testSkill02 > testSkill01){
            console.log(`${character02.NOME} marcou um ponto!`);
            character02.PONTOS++;
        }

        console.log("-----------------------------------");
    };

};

//declara o vencedor
async function declareWinner(character01, character02) {
    console.log("Resultado final:");
    console.log(`${character01.NOME}: ${character01.PONTOS}`);
    console.log(`${character02.NOME}: ${character02.PONTOS}`);

    if(character01.PONTOS > character02.PONTOS){
        console.log(`\n${character01.NOME} venceu a corrida! Parabens!`);
    } else if(character02.PONTOS > character01.PONTOS){
        console.log(`\n${character02.NOME} venceu a corrida! Parabens!`);
    } else{
        console.log("A corrida terminou em empate");
    }
}

//principal function
(async function main() {
    console.log(`Corrida entre ${player01.NOME} e ${Player02.NOME} começando... \n`);

    //chamada das funções
    await playRaceEngine(player01, Player02);
    await declareWinner(player01, Player02);
})();