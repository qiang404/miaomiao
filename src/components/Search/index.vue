<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model='keyword'>
            </div>					
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in movieList" :key="item.id">
                    <div class="img"><img :src="item.img|setWH"></div>
                    <div class="info">
                        <p><span>{{ item.nm }}</span><span>{{ item.sc }}</span></p>
                        <p>{{ item.enm }}</p>
                        <p>{{ item.cat }}</p>
                        <p>{{ item.rt }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name : 'Search',
    data() {
        return {
            keyword:'',
            movieList:[],
            cinema:[],
        }
    },
    methods: {
        cancelRequest() {
            if (typeof this.source === 'function') {
                this.source('终止请求')
            }
        }
    },
    watch: {
        keyword(newVal) {
            let that = this
            this.cancelRequest()

            this.axios({
                url:'/ajax/search',
                method:'get',
                params:{
                    kw:newVal,
                    cityId:236,
                    stype:-1,
                },
                cancelToken: new this.axios.CancelToken(function (c) {
                    that.source = c
                })
            }).then((res) => {
               let data = res.data
               if (Object.keys(data)[0] === 'movies') {
                    this.movieList = res.data.movies.list
                    if (data.cinemas) this.cinema = res.cinemas
               } else {
                   this.movieList = []
               }
            }).catch((err) => {
                if (this.axios.isCancel(err)) {
                    // console.log('Request canceled',err.message) // 请求如果被取消，这里是返回取消的message
                } else {
                    // handle error
                    console.log(err)
                }
            })
        }
    },
}
</script>
<style scoped>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
</style>