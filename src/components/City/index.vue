<template>
    <div class="city_body">
        <Loading v-if="isLoading"/>
        <div v-else class="city_list">
            <Scroller ref="city_list">
            <div>
                <div class="city_hot">
                    <h2>热门城市</h2>
                    <ul class="clearfix">
                        <li v-for="item in hotCity" :key="item.id" @tap="handleToCity(item.id,item.nm)">{{ item.nm }}</li>
                    </ul>
                </div>
                <div class="city_sort" ref="city_sort">
                    <div v-for="item in cityList" :key="item.index">
                        <h2>{{ item.index }}</h2>
                        <ul>
                            <li v-for="(value,index) in item.list" :key="index" @tap="handleToCity(value.id,value.nm)">{{ value.nm }}</li>
                        </ul>
                    </div>
                </div>
            </div>
         </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name : 'City',
    mounted() {

        let clist = window.localStorage.getItem('cityList')
        let hlist = window.localStorage.getItem('hotList')
        if (clist && hlist) {
            this.cityList = JSON.parse(clist) // 转JSON
            this.hotCity = JSON.parse(hlist)
            this.isLoading = false

        } else {
        this.axios.get('/api/cityList').then((res) => {
            let cityData = res.data
            if (cityData.code === 0 ) {
                this.formatCityList(cityData.data.cities)
                this.isLoading = false
                window.localStorage.setItem('cityList',JSON.stringify(this.cityList)) // JSON转字符串存储
                window.localStorage.setItem('hotList',JSON.stringify(this.hotCity))
            } else {
                console.log('数据请求失败')
            }

        })
        }
    },
    data() {
        return {
            hotCity: [{
                id: 1,
                nm: "北京",
                py: "beijing"
            },
            {
                id: 10,
                nm: "上海",
                py: "shanghai"
            },
            {
                id: 20,
                nm: "广州",
                py: "guangzhou"
            },
            {
                id: 30,
                nm: "深圳",
                py: "shenzhen"
            },
            {
                id: 57,
                nm: "武汉",
                py: "wuhan"
            },
            {
                id: 40,
                nm: "天津",
                py: "tianjin"
            },
            {
                id: 42,
                nm: "西安",
                py: "xian"
            },
            {
                id: 55,
                nm: "南京",
                py: "nanjing"
            },
            {
                id: 50,
                nm: "杭州",
                py: "hangzhou"
            },
            {
                id: 59,
                nm: "成都",
                py: "chengdu"
            },
            {
                id: 45,
                nm: "重庆",
                py: "chongqing"
            },
        ],
            cityList:[],
            isLoading:true
        }
    },
    methods: {
        handleToIndex(index) {
            let h2 = this.$refs.city_sort.getElementsByTagName('h2')
             this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
            
        },
        formatCityList(cities) {
            let cityList = []
            for (let i = 0; i < cities.length; i++) {
                let firstLetter = cities[i].py.substring(0,1).toUpperCase()
                if (toCom(firstLetter)) {   // 新添加index
                    cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i.id]}]})
                } else { // 累加到已有index中
                    for (let j = 0; j<cityList.length; j++) {
                        if (cityList[j].index === firstLetter) {
                            cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                        }
                    }
                }
            }
            function toCom(firstLetter) {
                for (let i =0; i < cityList.length; i++) {
                    if  (cityList[i].index === firstLetter) {
                        return false
                    }
                }
                return true
            }
            for (let i = 0;i < cityList.length;i++) {
                let flag = true
                for (let j = 1; j < cityList.length;j++) {
                    let bmp = []
                    if (cityList[j-1].index > cityList[j].index) {
                        bmp = cityList[j-1]
                        cityList[j-1] = cityList[j]
                        cityList[j] = bmp
                        flag = false
                    }
                }
                if (flag) break
            }
            this.cityList = cityList
        },
        handleToCity(id,nm) {
            this.$store.commit('city/CITY_INFO',{id,nm})
            window.localStorage.setItem('nowNm',nm)
            window.localStorage.setItem('nowId',id)
            this.$router.push('/movie/nowplaying')
        }
    },
}
</script>
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;cursor: pointer;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

</style>