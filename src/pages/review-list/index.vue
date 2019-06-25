<template>
	<div class="rediv-list-container">
		<div class="item">
			<div class="title">
				这是一条新的笔记adda;lskfjdasl;kfsdf jasl;f sa
			</div>
			<div class="desc-container">
				<div class="time-container">
					<img class="time-img" src="http://h0.hucdn.com/open201926/e777352fdc80ca6d_200x200.png">
					<div class="time-text">333 字</div>
				</div>
				<div class="number-container">
					<img class="number-img" src="http://h0.hucdn.com/open201926/d169287f2feaae83_200x200.png" />
					<div class="number-text">12 次</div>
				</div>
			</div>
			<div class="line"></div>
		</div>
		<div class="item">
			<div class="title">
				这是一条新的笔记adda;lskfjdasl;kfsdf jasl;f sa
			</div>
			<div class="desc-container">
				<div class="time-container">
					<img class="time-img" src="http://h0.hucdn.com/open201926/e777352fdc80ca6d_200x200.png">
					<div class="time-text">333 字</div>
				</div>
				<div class="number-container">
					<img class="number-img" src="http://h0.hucdn.com/open201926/d169287f2feaae83_200x200.png" />
					<div class="number-text">12 次</div>
				</div>
			</div>
			<div class="line"></div>
		</div>
	</div>
</template>

<script>
	import ajax from '../../utils/ajax.js'
	export default {
	  data () {
	    return {
	      reviewList: []
		}
	  },
	  methods: {
        async getReviewList (page, pageSize) {
          try {
            let result = await ajax('post', 'get_review_list', { page, page_size: pageSize, need_page: true })
			if (!result || !result.review_list) {

			}
		  } catch (e) {
			console.log(e)
          }
		}
	  },
	  mounted () {
	    this.getReviewList(1, 10)
	  }
	}
</script>

<style>
	.item {
		padding: 22px 26px;
		position: relative;
	}

	.title {
		font-family: PingFangSC-Light;
		font-size: 19px;
		color: #000000;
		letter-spacing: 0;
		margin-bottom: 11px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 335px;
	}

	.time-img {
		width: 20px;
		height: 20px;
		display: inline-block;
		margin-right: 7px;
	}

	.number-img {
		width: 20px;
		height: 20px;
		display: inline-block;
		margin-right: 7px;
	}

	.desc-container {
		display: flex;
	}

	.number-container {
		flex: 1;
		font-family: PingFangSC-Light;
		font-size: 16px;
		color: #000000;
		letter-spacing: 0;
		display: flex;
		align-items: center;
	}

	.time-container {
		flex: 1;
		font-family: PingFangSC-Light;
		font-size: 16px;
		color: #000000;
		letter-spacing: 0;
		display: flex;
		align-items: center;
	}

	.line {
		width: 350px;
		height: 1px;
		background-color: #E8E8E8;
		position: absolute;
		bottom: 0;
		right: 0;
	}

</style>
