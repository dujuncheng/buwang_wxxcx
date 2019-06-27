<template>
	<div >
		<!-- 【小程序原生】使用自己封装的业务组件  -->
		<tuan-avater :tuanAvaters="tuanAvaters"></tuan-avater>
		<!-- 【小程序原生】 使用 第三方封装的 ui 组件 -->
		<!--<van-button type="primary">按钮</van-button>-->
		<Bubble :bubble-data="bubbleData"></Bubble>
	</div>
</template>

<script>
	import Bubble from '../../components/Bubble.vue'
  export default {
    name: 'importTemplate',
	components: {
      Bubble
	},
	data () {
      return {
        tuanAvaters: [
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png'
		],
        bubbleData: [
          {
            avatar: 'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
            nick: 'aaaa',
            text: '哈哈哈哈',
          },
          {
            avatar: 'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
            nick: 'aaaa',
            text: '哈哈哈哈',
          },
          {
            avatar: 'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
            nick: 'aaaa',
            text: '哈哈哈哈',
          },{
            avatar: 'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
            nick: 'aaaa',
            text: '哈哈哈哈',
          }
		]
	  }
	}
  }
</script>

<style lang="less">

</style>
