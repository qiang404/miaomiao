<template>
    <div class="cinema_body">
        <ul>
            <li v-for="item in cinemaList" :key="item.id">
                <div>
                    <span>{{ item.nm }}</span>
                    <span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{ item.addr}}</span>
                    <span>{{ item.distance }}</span>
                </div>
                <div class="card">
                    <div class="bl" v-if="item.tag.allowRefund">退</div>
                    <div class="bl" v-if="item.tag.endorse">改签</div>
                    <div class="or" v-if="item.tag.snack">小吃</div>
                    <div class="or" v-if="item.tag.vipTag">折扣卡</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name : 'Clist',
    data() {
        return {
            cinemaList:[]
        }
    },
    methods: {
        getDate() {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDate()
            return `${year}-${month}-${day}`
        }
    },
    mounted() {
        let day = this.getDate()
       this.axios({
           method:'get',
           url:'ajax/cinemaList',
           params:{
                day:day,
                ci:1,
                limit:20
           }
       }).then(res => {
           let data = res.data
           if (Object.keys(data).length > 0) {
               this.cinemaList = data.cinemas
           }
           console.log(this.cinemaList);
       })
    }
}
</script>
<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}   
</style>
