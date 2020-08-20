export function debounce (func,delay) {
    let timer = null
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            console.log(123);
            func.apply(this)
        }, delay);
    }
}
// 获取请求电影参数
export function getParams() {
    let queryArr = []
    if (!this.isLoadAll) {
        // 剩余数量
        let leftMovie = this.total - this.hasShowMovie
        if (leftMovie === 0) {
            this.isLoadAll = true
        }
        // 每次加载的数量
        let size = leftMovie > this.movieSize ? this.movieSize : leftMovie
        // 截取要获取电影的ID
        queryArr = this.movieId.slice(this.hasShowMovie, this.hasShowMovie + size)
        queryArr.forEach(item => {
            this.queryParams += item + ','
        })
        this.queryParams = this.queryParams.substring(0, this.queryParams.length - 1)
    } else {
        this.queryParams = ''
    }
}
 // 加载更多电影
 export function loadMoreMovies(url) {
    if (this.hasShowMovie != this.total && this.queryParams === '') {
        getParams.call(this)
        this.axios.get(url + this.queryParams).then(res => {
            this.movieList = this.movieList.concat(res.data.coming)
            this.hasShowMovie += res.data.coming.length
            this.queryParams = ''
        })
    } else if(this.hasShowMovie == this.total ){
        this.loadAllMsg = '已经到底了'
        console.log(this.loadAllMsg);
    }
    this.$refs.scroll.scroll.finishPullUp()
}