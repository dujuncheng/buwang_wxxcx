import App from './index.vue'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    usingComponents: {
      'tuanAvater': '/native/tuanAvater/tuanAvater'
    }
  }
}
