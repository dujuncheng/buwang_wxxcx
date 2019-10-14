<template>
	<div class="rediv-list-container">
		<div class="tips">
			<template v-if="waitNum > 0">
				待复习<span class="big-num">{{waitNum}} </span> 篇, 已复习<span class="big-num">{{doneNum}}</span>篇
			</template>
			<template  v-if="waitNum === 0 ">
				恭喜你，笔记全部都复习完了
			</template>
		</div>
		<div class="item" v-for="(item, index) in reviewList" :key="index" @click="goContent(item.note_id)">
			<div class="title">
				{{item.title}}
			</div>
			<div class="desc-container">
				<div class="time-container">
					<img class="time-img" src="http://h0.hucdn.com/open201926/e777352fdc80ca6d_200x200.png">
					<div class="time-text">{{item.contentLength}} 字</div>
				</div>
				<div class="number-container">
					<img class="number-img" src="http://h0.hucdn.com/open201926/d169287f2feaae83_200x200.png" />
					<div class="number-text">{{item.review_num}} 次</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="circle" v-if="item.needReview"></div>
		</div>
	</div>
</template>

<script>
	import ajax from '../../utils/ajax.js'
    import { Base64 } from 'js-base64'
	import { REVIEW_PAGE_SIZE } from '../../config/const.js'
    import EventBus from '../../utils/eventBus.js'

	export default {
	  data () {
	    return {
	      reviewList: [],
		  page: 1,
          hasMore: true,
		  waitNum: 0,
		  doneNum: 0
		}
	  },
      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh () {
        this.refresh();
      },
      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom () {
        if (this.hasMore) {
          this.page = this.page + 1
          this.getReviewList(this.page, REVIEW_PAGE_SIZE)
		}
      },
	  onShow() {
        this.refresh()
	  },
      methods: {
        refresh() {
          this.page = 1
          this.reviewList = []
          this.hasMore = true
          this.getReviewList(this.page, REVIEW_PAGE_SIZE)
		},
        goContent (noteId) {
          if (noteId) {
            wx.navigateTo({
			  url: `/pages/content-page/index?note_id=${noteId}`
			})
		  }
		},
        async getReviewList (page, pageSize) {
          try {
            let result = await ajax('post', 'get_review_list', { page, page_size: pageSize, need_page: true })

			if (!result || !result.review_list || !result.success) {
			  return
			}
			let newArr = this.filterReviewList(result.review_list)

			if (newArr.length < REVIEW_PAGE_SIZE) {
			  this.hasMore = false
			}

			this.reviewList = this.reviewList.concat(newArr)
			this.doneNum = result.done_num
			this.waitNum = result.wait_num
		  } catch (e) {
			console.log(e)
          }
		},
        /**
		 * 过滤一下 result.review_list 数组
         * @param reviewList
         * @returns {*}
         */
        filterReviewList (reviewList) {
          for (let i = 0; i < reviewList.length; i++) {
            reviewList[i].content = Base64.decode(reviewList[i].content)
			reviewList[i].contentLength = reviewList[i].content.length
            reviewList[i].needReview = this.checkNeedReview(reviewList[i].notify_time)
          }
          return reviewList
		},
        checkNeedReview (num) {
          let time = Number(num) * 1000
		  let now = new Date().getTime()

		  if (time < now) {
		    return true
		  } else {
		    return false
		  }
		}
	  },
	  mounted () {
	    this.getReviewList(1, REVIEW_PAGE_SIZE)
        let bus = new EventBus()
        bus.on('refresh', this.refresh, this)
	  }
	}
</script>

<style>
	.rediv-list-container {
		padding-top: 99rpx;
	}
	.tips {
		width: 100vw;
		height: 99rpx;
		font-family: PingFang-SC-Regular;
		font-size: 28rpx;
		color: #99521F;
		letter-spacing: 0;
		line-height: 32rpx;
		background: #FFF2E6;
		display: flex;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
	}
	.big-num {
		font-size: 36rpx;
		color: #FF1940;
		margin-left: 6rpx;
		margin-right: 6rpx;
	}
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

	.circle {
		position: absolute;
		right: 30px;
		top: 126rpx;
		width: 10px;
		height: 10px;
		background-color: red;
		border-radius: 50%;
	}

</style>
