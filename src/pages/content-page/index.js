import App from './index.vue'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    pageOrientation: 'auto',
    navigationBarTitleText: "日拱一卒",
    enablePullDownRefresh: true,
    usingComponents: {
      wemark: "/native/wemark/wemark"
    }
  }
}
