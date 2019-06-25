<template>
	<div >
		<!-- 使用自己封装的业务组件  -->
		<tuan-avater :tuanAvaters="tuanAvaters"></tuan-avater>
		<!-- 使用 第三方封装的 ui 组件 -->
		<!--<van-button type="primary">按钮</van-button>-->
	</div>
</template>

<script>
  export default {
    name: 'importTemplate',
	data () {
      return {
        tuanAvaters: [
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png',
          'http://h0.hucdn.com/open201925/0c922ac30f3ff748_750x590.png'
		]
	  }
	}
  }
</script>

<style lang="less">

</style>
