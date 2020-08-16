module.exports = {
    devServer:{
        proxy:{
            'ajax':{
                target:'https://m.maoyan.com/',
                changeOrigin:true
            },
            'api':{
                target:'http://127.0.0.1:3000',
                changeOrigin:true
            }
        }
    }
}