<template>
    <div ref="beam" class="beam" v-bind:style="{transform: `rotate(${beamAngle}deg)`}">
        <Elements
                v-for="element in leftSide"
                v-bind:element="element"
        ></Elements>
        <Elements
                v-for="element in rightSide"
                v-bind:element="element"
        ></Elements>
    </div>
</template>

<script>
    import Elements from "./Element";
    import {generateElement} from "../utils/elementsGenerator";

    export default {
        name: "Beam",
        components: {
            Elements
        },
        computed: {
            beamAngle: function () {
                return this.$store.getters.getCurrentAngle;
            },
            leftSide: function () {
                return this.$store.getters.getLeftSideElements;
            },
            rightSide: function () {
                return this.$store.getters.getRightSideElements;
            }
        },
        mounted() {
            let firstElement = generateElement(true);
            this.$store.commit('addBeamFactor', this.$refs.beam.clientWidth);
            this.$store.commit('addToRightSide', firstElement);

        }
    }
</script>

<style scoped lang="less">
    .beam {
        width: 100%;
        height: 5px;
        background-color: black;
        position: relative;
        transition: transform 0.5s;
    }
</style>