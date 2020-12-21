<template>
    <div id="fallarea" ref="fallarea" class="fallArea_wrapper">
        <Elements
                v-bind:element="element"
        ></Elements>
    </div>
</template>

<script>
    import Elements from "./Element";
    import {generateElement} from "../utils/elementsGenerator"

    export default {
        name: "FallArea",
        components: {
            Elements
        },
        data() {
            return {
                element: {},
                stopPositionY: 500,
                animation: undefined
            }
        },
        beforeMount() {
            window.addEventListener('keydown', this.onKeyDown);
        },
        beforeDestroy() {
            window.removeEventListener('keydown', this.onKeyDown);
            window.cancelAnimationFrame(this.animation);
            this.animation = undefined;
        },
        mounted() {
            this.placeElement();
            this.calcCollisionHeight();
            this.animation = window.requestAnimationFrame(
                this.moveDown
            );
        },
        methods: {
            onKeyDown(event) {
                if (this.gameState === 1) {
                    if (event.key === "ArrowLeft") this.moveLeft();
                    if (event.key === "ArrowRight") this.moveRight();
                    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                        this.calcCollisionHeight();
                    }
                }
            },
            moveDown() {
                if (this.gameState === 1) {
                    this.element.y += this.speed;
                    if (this.element.y >= this.stopPositionY) {
                        this.$store.dispatch('elementFalled', this.element);
                        this.placeElement();
                        this.calcCollisionHeight();
                    }
                }
                window.requestAnimationFrame(this.moveDown);
            },
            calcCollisionHeight() {
                let fallAreaHeigth = this.$refs.fallarea.clientHeight;
                let beamHalfWidth = this.$refs.fallarea.clientWidth / 2;
                let elementPositionX = this.element.x;
                let beamRotation = this.$store.getters.getCurrentAngle;
                let correctionY = (beamHalfWidth - elementPositionX) * Math.tan(Math.abs(beamRotation) * Math.PI / 180);
                if (beamRotation > 0) {
                    this.stopPositionY = fallAreaHeigth - correctionY - this.element.size;
                } else {
                    this.stopPositionY = fallAreaHeigth + correctionY - this.element.size;
                }
            },
            moveLeft() {
                this.element.x -= 5;
                if (this.element.x < 0) this.element.x = 0
            },
            moveRight() {
                this.element.x += 5;
                if (this.element.x > this.$refs.fallarea.clientWidth / 2) this.element.x = this.$refs.fallarea.clientWidth / 2
            },
            placeElement() {
                this.element = generateElement();
            }
        },
        computed: {
            gameState: function () {
                return this.$store.getters.getState;
            },
            speed: function () {
                return this.$store.getters.getSpeed;
            },
        }
    }
</script>

<style scoped lang="less">
    .fallArea_wrapper {
        width: 100%;
        height: 70%;
        position: relative;
    }
</style>