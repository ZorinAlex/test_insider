<template>
    <div class="gameScene__wrapper">
        <GameOver/>
        <FallArea/>
        <Beam/>
        <Base/>
    </div>
</template>

<script>
    import Beam from "./Beam";
    import Base from "./Base";
    import FallArea from "./FallArea";
    import GameOver from "./GameOver";

    export default {
        components: {
            Beam, Base, FallArea, GameOver
        }
    }
</script>

<style scoped lang="less">
    .gameScene__wrapper {
        width: 80%;
        height: 100%;
        display: flex;
        margin: 0 auto;
        flex-direction: column;
    }
</style>
