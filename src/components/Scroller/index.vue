<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroller',
    props: {
        handleToScroll:{
            type:Function,
            default: function () {}
        },
        handleToPullUp: {
            type:Function,
            default:function () {}
        },
        url:{
            type:String,
            default:''
        },
        that:{
            type:Object,
            default:null
        }
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
            tap:true,
            probeType:1,
            pullUpLoad: true
        })
        this.scroll.on('pullingUp',() => {
            this.handleToPullUp.call(this.that,this.url)
        })
    },
    methods:{
        toScrollTop(y) {
            this.scroll.scrollTo(0,y)
        }
    }
}
</script>

<style scoped>
    .wrapper{
        height: 100%;
    }
</style>
