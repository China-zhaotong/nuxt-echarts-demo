<template>
    <div>
        <!--直接加载svg字符串即可-->
        <div v-html="svg"></div>
    </div>
</template>
<script>
export default {

    //nuxt 提供的一个hook，fetch is a hook called during server-side rendering after the component instance is created, and on the client when navigating. 
    async fetch(){
     //请求我们的echarts服务端中间件
      this.svg = await fetch(
            'http://localhost:3000/server-middleware/echarts/helloEchartsSSR'
        ).then(res => res.text())  
    },
    data(){
        return {
            svg:''
        }
    }
}
</script>