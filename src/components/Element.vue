<template>
    <div class="element" v-bind:style="elementStyle">
        <span class="element__text"
              v-bind:class="{element__triangle: element.type === 'triangle'}"
        >{{element.weight}}</span>
    </div>
</template>

<script>
    export default {
        name: "Element",
        props: {
            element: Object
        },
        computed: {
            elementStyle: function () {
                let style = {};
                if (!this.element.type) return;
                switch (this.element.type) {
                    case 'triangle':
                        style = {
                            width: 0,
                            height: 0,
                            margin: '0 auto',
                            'border-left': `${this.element.size / 2}px solid transparent`,
                            'border-right': `${this.element.size / 2}px solid transparent`,
                            'border-bottom': `${this.element.size}px solid #dcb809`
                        };
                        break;
                    case 'rectangle':
                        style = {
                            width: `${this.element.size}px`,
                            height: `${this.element.size}px`,
                            'background-color': "#14dc44"
                        };
                        break;
                    case 'circle':
                        style = {
                            width: `${this.element.size}px`,
                            height: `${this.element.size}px`,
                            'background-color': '#24a9dc',
                            'border-radius': '50%'
                        };
                        break;
                }
                style['left'] = `${this.element.x}px`;
                style['top'] = `${this.element.y}px`;
                style['line-height'] = `${this.element.size}px`;
                return style
            }
        }
    }
</script>

<style scoped>
    .element {
        position: absolute;
        transform: translate(-50%, 0);
    }

    .element__text {
        text-align: center;
        font-size: 13px;
        font-weight: bold;
    }

    .element__triangle {
        margin-left: -5px
    }
</style>