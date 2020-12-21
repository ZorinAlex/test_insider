import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import {generateElement} from '../utils/elementsGenerator'

export default new Vuex.Store({
    state: {
        leftSideElements: [],
        rightSideElements: [],
        leftSideMoment: 0,
        rightSideMoment: 0,
        currentAngle: 0,
        gameState: 0,
        beamFactor: 0,
        beamLength: 0,
        speed: 1
    },
    getters: {
        getCurrentAngle(state) {
            return state.currentAngle
        },
        getLeftSideElements(state) {
            return state.leftSideElements;
        },
        getMoments(state) {
            return {left: state.leftSideMoment, right: state.rightSideMoment};
        },
        getRightSideElements(state) {
            return state.rightSideElements;
        },
        getState(state) {
            return state.gameState
        },
        getSpeed(state) {
            return state.speed
        }
    },
    mutations: {
        startGame(state) {
            state.gameState = 1;
        },
        pauseGame(state) {
            state.gameState = 0;
        },
        increaseSpeed(state) {
            state.speed++;
        },
        addToLeftSide(state, element) {
            state.leftSideElements.push(element);
            let distance = (state.beamLength / 2 - element.x) * state.beamFactor;
            state.leftSideMoment += element.weight * distance;
            if (state.leftSideElements.length % 2 === 0 && state.speed < 5) {
                state.speed += 0.5
            }
        },
        addToRightSide(state, element) {
            state.rightSideElements.push(element);
            let distance = (element.x - state.beamLength / 2) * state.beamFactor;
            state.rightSideMoment += element.weight * distance;
        },
        calculateRotation(state) {
            let diff = state.rightSideMoment - state.leftSideMoment;
            state.currentAngle = Math.floor(diff * 0.5);
            if (Math.abs(state.currentAngle) >= 15 || Math.abs(diff) >= 20) {
                //stop game :(
                state.gameState = 3;
            }
        },
        addBeamFactor(state, beamLength) {
            let beamLengthReal = 10;
            state.beamLength = beamLength;
            state.beamFactor = beamLengthReal / beamLength
        },
        cleanGame(state) {
            state.leftSideElements = [];
            state.rightSideElements = [];
            state.speed = 1;
            state.leftSideMoment = 0;
            state.rightSideMoment = 0;
            state.currentAngle = 0
        }
    },
    actions: {
        elementFalled({commit, getters}, element) {
            element.y = -element.size;
            commit('addToLeftSide', element);
            if (getters.getLeftSideElements.length > 1) {
                let rightElement = generateElement(true);
                commit('addToRightSide', rightElement);
            }
            commit('calculateRotation');
        },
        restartGame({commit}) {
            commit('cleanGame');
            let rightElement = generateElement(true);
            commit('addToRightSide', rightElement);
            commit('pauseGame');
        }
    }
})
