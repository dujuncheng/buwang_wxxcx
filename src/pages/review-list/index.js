import App from './index.vue'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarTitleText: "日拱一卒",
    enablePullDownRefresh: true,
    usingComponents: {
    }
  }
}
