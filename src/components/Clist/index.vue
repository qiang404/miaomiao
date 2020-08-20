<template>
    <div class="cinema_body">
        <Scroller :handleToPullUp='loadCinema' ref="scroll">
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
        </Scroller>
    </div>
</template>
<script>
export default {
    name : 'Clist',
    data() {
        return {
            cinemaList:[],
            day:'',
            offset:0,
            limit:20,
            hasMore:true,
            prevCityId:-1
        }
    },
    methods: {
        getDate() {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDate()
            return `${year}-${month}-${day}`
        },
        loadCinema() {
            let cityId = this.$store.state.city.id
            if (this.prevCityId !== cityId) {
                this.cinemaList = []
                this.hasMore = true
            }
            if (this.hasMore) {
                this.day = this.getDate()
                this.axios({
                    method: 'get',
                    url: 'ajax/cinemaList',
                    params: {
                        day: this.day,
                        cityId: cityId,
                        limit: this.limit,
                        offset: this.offset
                    }
                }).then(res => {
                    let data = res.data
                    if (Object.keys(data).length > 0) {
                        this.cinemaList = this.cinemaList.concat(data.cinemas)
                        this.hasMore = data.paging.hasMore
                        this.offset +=  data.paging.limit
                        this.prevCityId = cityId
                    }
                    this.$refs.scroll.scroll.finishPullUp()
                })
            }
            
        }
    },
    activated() {
      this.loadCinema()
    },
    updated() {
        this.$refs.scroll.scroll.refresh()
    },
}
</script>
<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px; overflow: hidden; z-index: 1;}
.cinema_body ul li{  border-bottom:1px solid #e6e6e6;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;margin-left: 5px;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
