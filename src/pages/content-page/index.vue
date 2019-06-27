<template>
	<div class="content-container">
		<h1>{{noteObj.title}}</h1>

		<wemark :md="noteObj.content" highlight type="wemark"></wemark>

		<button type="primary" @click="sumitReview">确认已经复习</button>
	</div>
</template>

<script>
	import ajax from '../../utils/ajax.js'
    import { Base64 } from 'js-base64'
    import EventBus from '../../utils/eventBus.js'

	export default {
	  data () {
	    return {
          noteId: '',
		  noteObj: ''
		}
	  },
	  methods: {
        async sumitReview () {
          let result = await ajax('post', 'review_this', { note_id: this.noteId })

          if (!result || !result.success) {
            wx.showToast({
              title: '网络错误，请稍后再试'
            })
			return
          }

          this.bus.emit('refresh')
          wx.showModal({
            title: '恭喜棒棒哒你~',
            content: '又复习了一个笔记',
            success (res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
		},
	    async getContent (noteId) {
          let result = await ajax('post', 'get_content', { note_id: noteId })

          if (!result || !result.success) {
            wx.showToast({
              title: '网络错误，请稍后再试'
            })
			return
          }
          let noteObj = result.data.content
		  noteObj.content = Base64.decode(noteObj.content)
		  this.noteObj = noteObj
		}
	  },
	  onLoad (options) {
	    if (!options || !options.note_id) {
	      wx.showToast({
            title: 'note_id没有找到噢~',
		  })
	      return
		}
	    this.noteId = Number(options.note_id)

		this.bus = new EventBus()
	    this.getContent(this.noteId)
	  }
	}
</script>

<style>
	.content-container {
		padding: 22px 26px;
		position: relative;
	}
</style>
