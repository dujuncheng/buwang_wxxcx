<template>
	<div class="rediv-list-container">
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
		</div>
	</div>
</template>

<script>
	import ajax from '../../utils/ajax.js'
    import { Base64 } from 'js-base64'
	import {REVIEW_PAGE_SIZE} from '../../config/const.js'

	export default {
	  data () {
	    return {
	      reviewList: [],
		  page: 1,
          hasMore: true,
		}
	  },
      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh() {
        this.page = 1
		this.reviewList = []
		this.hasMore = true
        this.getReviewList(this.page, REVIEW_PAGE_SIZE)
      },
      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom() {
        if (this.hasMore) {
          this.page = this.page + 1
          this.getReviewList(this.page, REVIEW_PAGE_SIZE)
		}
      },
      methods: {
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
			  wx.showModal({
				type: 'error',
				message: '网络错误，请稍后再试'
			  })
			  return
			}
			let newArr = this.filterReviewList(result.review_list)

			if (newArr.length < REVIEW_PAGE_SIZE) {
			  this.hasMore = false
			}

			this.reviewList = this.reviewList.concat(newArr)

		  } catch (e) {
			console.log(e)
          }
		},
        /**
		 * 过滤一下 result.review_list 数组
         * @param reviewList
         * @returns {*}
         */
        filterReviewList(reviewList) {
          for (let i = 0; i < reviewList.length; i++) {
            reviewList[i].content = Base64.decode(reviewList[i].content)
			reviewList[i].contentLength = reviewList[i].content.length
            reviewList[i].needReview = this.checkNeedReview(reviewList[i].notify_time)
          }
          return reviewList
		},
        checkNeedReview(num) {
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
