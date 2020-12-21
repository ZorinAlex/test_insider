<template>
    <div class="userInterface__holder">
        <div class="userInterface__buttons">
            <button v-if="gameState==0" class="userInterface__button" @click="play()">
                <font-awesome-icon icon="play"></font-awesome-icon>
            </button>
            <button v-else class="userInterface__button" @click="pause()">
                <font-awesome-icon icon="pause"></font-awesome-icon>
            </button>
        </div>
        <div class="userInterface__text_wrapper">
            <span class="userInterface__text">Left Side Momentum: {{momentum.left.toFixed(2)}} kg*m</span>
            <span class="userInterface__text">Right Side Momentum: {{momentum.right.toFixed(2)}} kg*m</span>
        </div>
        <span class="userInterface__speed">Speed: {{speed}}</span>
    </div>
</template>

<script>
    export default {
        name: "UserInterface",
        methods: {
            play() {
                this.$store.commit('startGame')
            },
            pause() {
                this.$store.commit('pauseGame')
            }
        },
        computed: {
            momentum: function () {
                return this.$store.getters.getMoments;
            },
            speed: function () {
                return this.$store.getters.getSpeed;
            },
            gameState: function () {
                return this.$store.getters.getState;
            }
        }
    }
</script>

<style scoped lang="less">
    @button-icon-color: #202020;
    @background-color: #cbcbcb;
    .userInterface__holder {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50px;
        background-color: @background-color;
    }

    .userInterface__button {
        margin: auto;
        color: @button-icon-color;

        &:hover {
            color: lighten(@button-icon-color, 20%);
        }
    }

    .userInterface__buttons {
        display: flex;
        flex-grow: 1;
    }

    .userInterface__text_wrapper {
        flex-grow: 3;
        display: flex;
        flex-direction: column;
    }

    .userInterface__text {
        margin: auto;
        text-align: left;
        display: flex;
    }

    .userInterface__speed {
        margin: auto;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        text-align: center;
        font-size: 20px;
    }
</style>