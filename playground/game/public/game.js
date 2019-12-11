
export default function createGame() {

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const x = command.playerX
        const y = command.playerY

        state.players[playerId] = {
            x,
            y
        }
    }

    function addFruit(command) {

        const fruitId = command.fruitId
        const x = command.fruitX
        const y = command.fruitY

        state.fruits[fruitId] = {
            x,
            y
        }
    }

    function removeFruit({ fruitId }) {
        delete state.fruits[fruitId]
    }


    function removePlayer({ playerId }) {
        delete state.players[playerId]
    }

    function movePlayer(command) {

        const player = state.players[command.playerId]
        const keyPressed = command.keyPressed
        const playerId = command.playerId

        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0) {
                    player.y--
                    return
                } 
                player.y = 9
            },
            ArrowDown(player) {
                if (player.y + 1 < state.screen.height) {
                    player.y++
                    return
                }
                player.y = 0
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width) {
                    player.x++
                    return
                }
                player.x = 0
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0) {
                    --player.x 
                    return
                }
                player.x = 9
            },
        }

        const moveFunction = acceptedMoves[keyPressed]

        if (moveFunction && player) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        }

    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]
        for (const fruitId in state.fruits) {
            console.log(`checking for collision for ${playerId}`)
            const fruit = state.fruits[fruitId]
            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`Collision detected ${fruitId}`)
                removeFruit({ fruitId })
            }
        }
    }

    return {
        movePlayer,
        state,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        checkForFruitCollision
    }
}

