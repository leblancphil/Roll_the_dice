const players = [['player_one', 'Player One'], ['player_two', 'Player Two']]
let activePlayer = 0
let roundScore = 0
// emplacement du dés
const diceImg = document.querySelector('#dice img')
// emplacement des scores
const playerScores = document.querySelectorAll('.player_score')
//emplacement du joueur actif
let activePlayerZone = document.querySelector('#' + players[activePlayer][0])
// joueur 1 actif par defaut
activePlayerZone.classList.add('active')
//boutons
let btnDice = document.getElementById('dice-button')
let btnHol = document.getElementById('hold-button')

/******************************lancer le dés************************************/
// emplacement du bouton "roll"
document.getElementById('dice-button').addEventListener('click', () => {
    // lancer le dés
    const diceResult = rollTheDice()
    // mettre à jour l'image du dés
    createDiceImg(diceResult)
    if (diceResult === 1) {
        roundScore = 0
        updateRoundScore(0)
        switchActivePlayer()
    } else {
        roundScore += diceResult
        updateRoundScore(roundScore)
    }
})

// bouton "hold score"
document.getElementById('hold-button').addEventListener('click', () => {
    updateTotalScore(activePlayer, roundScore)
    roundScore = 0
    updateRoundScore(0)
    switchActivePlayer()
})
// nouvelle partie "reset button" 
document.getElementById('reset-button').addEventListener('click', () => {

    for (let i = 0; i < 2; i++) {
        console.log(players[i][0])
        const totalScorePlace = document.getElementById(`player_score_${players[i][0]}`)
        console.log(totalScorePlace)
        totalScorePlace.textContent = 0
        updateRoundScore(0)
        createDiceImg(0)

    }
    if (activePlayer == 1) {
        switchActivePlayer()
    }
    btnDice.style.display = "block"
    btnHol.style.display = "block"

})

//faire rouler le dés retourne entre 1 et 6
function rollTheDice() {
    return Math.floor(Math.random() * 6) + 1
}

//changer de joueur
function switchActivePlayer() {
    activePlayer = (activePlayer + 1) % 2
    players.forEach(function (player) { document.querySelector('#' + player).classList.toggle('active') })
    createDiceImg(7)


}

//modifier le score du joueur
function updateRoundScore(score) {
    document.querySelector(`#round_score_${players[activePlayer][0]} .score_temp`).textContent = score

}

//modifier le score total
function updateTotalScore(player, score) {
    const totalScorePlace = document.getElementById(`player_score_${players[player][0]}`)
    const newScore = parseInt(totalScorePlace.textContent) + score
    if (newScore < 100) {
        totalScorePlace.textContent = newScore
    }
    else {
        //victoire 
        totalScorePlace.textContent = `${players[player][1]} WIN !`
        freezGame()
        createDiceImg(0)

    }

}

// creation de l'image du dés selon le resultat
function createDiceImg(diceResult) {
    diceImg.src = `images/${diceResult}.png`
}


function freezGame() {
    btnDice.style.display = "none"
    btnHol.style.display = "none"


}

