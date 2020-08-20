<template>
    <div class="movie_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else :that="mythis" :url="url" :handleToPullUp="loadMoreMovies" ref="scroll">
            <ul>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img|setWH"></div>
                    <div class="info_list">
                        <div>
                            <h2 @tap="handleToDetail(item.id)">{{ item.nm }}</h2><span v-if="item.version=='v3d imax'" class="imax"></span>
                        </div>
                        <p><span class="grade">{{ item.wish }}</span> 人想看</p>
                        <p>{{ item.star }}</p>
                        <p>{{ item.rt }}</p>
                    </div>
                    <div v-if="item.showst==1" class="btn_pre">
                        想看
                    </div>
                    <div v-else class="btn_wish">
                        预售
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>
<script>

import {loadMoreMovies} from '@/Common/Ulits.js'

export default {
    name : 'Comingsoon',
    activated() {
        let cityId = this.$store.state.city.id
        if (this.prevCityId === cityId) return
        this.isLoading = true
       this.axios.get('/ajax/comingList?token&ci='+cityId).then((res) => {
           let data = res.data
           this.movieList = data.coming
           this.movieId = data.movieIds
           this.movieSize = this.movieList.length
           this.hasShowMovie = this.movieList.length
           this.total = this.movieId.length
           this.isLoading = false
           this.prevCityId = cityId
           this.url =`/ajax/moreComingList?token=&ci=${cityId}&movieIds=`
       })
    },
    data() {
        return {
            movieList : [], // 电影列表
            movieId:[], // 上拉加载更多电影Id
            total:0,    // 该城市正在热映电影总数量
            movieSize:0, // 每一页电影数量
            loadAllMsg:'', // 加载全部电影提示信息
            hasShowMovie:0, // 已经加载电影数量
            queryParams:'', // 请求更多电影参数
            loadMoreMovies:loadMoreMovies,
            url:'',
            mythis:this,
            isLoadAll:false,
            isLoading:true,
            prevCityId:-1
        }
    },
    methods: {
        handleToDetail(mid) {
            this.$router.push('/movie/detail/'+mid)
        }
    },
    updated() {
        if (this.isLoading) return
        this.$refs.scroll.scroll.refresh()
    },
}
</script>
<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{float: left; font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .info_list .imax{display: inline-block;background-size: contain;background-image: url(../../assets/maxs.png);width: 43px;height: 14px;margin-top: 5px;}
.movie_body .btn_wish , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .btn_wish{ background-color: #faaf00;}
</style>