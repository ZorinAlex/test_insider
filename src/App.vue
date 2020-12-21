<template>
    <div id="app">
        <UserInterface/>
        <GameScene/>
    </div>
</template>

<script>
    import GameScene from './components/GameScene.vue'
    import UserInterface from './components/UserInterface.vue'

    export default {
        name: 'App',
        components: {
            GameScene,
            UserInterface
        }
    }
</script>

<style lang="less">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    body {
        margin: 0;
    }
</style>
