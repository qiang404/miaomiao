export default {
    path : '/movie',
    component: () => import('@/views/Movie'),
    children : [
        {
            path : 'city',
            component : () => import('@/components/City')
        },
        {
            path : 'nowplaying',
            component : () => import('@/components/NowPlaying')
        },
        {
            path : 'comingsoon',
            component : () => import('@/components/Comingsoon')
        },
        {
            path : 'search',
            component : () => import('@/components/Search')
        },
        {
            path:'detail/:mid',
            components:{
                detail:() => import('@/views/Movie/detail')
            },
            props:{
                detail:true  // 普通路由只需要props:true就行，具有多个路由视图的的则需要单独配置
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowplaying'
        },
    ]
}
