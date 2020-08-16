<template>
    <div class="movie_body">
        <ul>
            <li v-for="item in movieList" :key="item.id">
                <div class="pic_show"><img :src="item.img|setWH"></div>
                <div class="info_list">
                    <div><h2>{{ item.nm }}</h2><span v-if="item.version=='v3d imax'" class="imax"></span></div>
                    <p v-if="item.sc!=0">观众评 <span class="grade">{{ item.sc }}</span></p>
                    <p v-else><span class="grade">{{ item.wish }}</span>人想看</p>
                    <p>{{ item.star }}</p>
                    <p>{{ item.showInfo }}</p>
                </div>
                <div v-if="item.showst==3" class="btn_mall">
                    购票
                </div>
                <div v-else class="btn_pre">
                    预售
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name : 'NowPlaying',
    mounted() {
        this.axios.get('/ajax/movieOnInfoList').then((res) => {
            let data = res.data
            this.movieList = data.movieList
        })
    },
    data() {
        return {
            movieList : []
        }
    },
    methods: {
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
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>