const Storage = (key) => ({
  set (v = '') {
    wx.setStorageSync(key, v)
  },
  get () {
    return wx.getStorageSync(key)
  },
  remove () {
    wx.removeStorageSync(key)
  }
})

module.exports = {
  cookie: Storage('_x_session')
}
