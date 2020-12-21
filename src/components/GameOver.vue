<template>
    <div v-if="gameState==3" class="gameOver__wrapper">
        <div class="gameOver">
            <span class="gameOver__text">GAME OVER :(</span>
            <button class="gameOver__button" @click="restartGame">RESTART</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GameOver",
        methods: {
            restartGame() {
                this.$store.dispatch('restartGame');
            }
        },
        computed: {
            gameState: function () {
                return this.$store.getters.getState;
            }
        }
    }
</script>

<style scoped lang="less">
    .gameOver {
        background-color: #eeeeee;
        width: 250px;
        height: 150px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        z-index: 1000;
        border-radius: 5px;
        box-shadow: black 0 0 5px;
        justify-content: space-around;
    }

    .gameOver__wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(24, 24, 24, 0.5);
        z-index: 999;
        display: flex;
    }

    .gameOver__text {
        font-weight: bold;
        font-size: 18px;
    }

    .gameOver__button {
        margin: 10px auto;
        width: 80%;
        height: 50px;
    }
</style>