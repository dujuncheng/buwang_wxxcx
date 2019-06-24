const Storage                = require('./storage.js')

const baseUrl = 'http://www.sharkbaby.club/notebook'

const ajax = (type, method, params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      method: type,
      url: `${baseUrl}?method=${method}`,
      data: params,
      header: {
        'Cookie': `_x_session=${Storage.cookie.get()}`
      },
      success (res) {
        if (res.header && res.header['x_session']) {
          Storage.cookie.set(res.header['x_session'])
        }
        if (res && res.data) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail (e) {
        reject(e)
      }
    })
  })
}

module.exports = ajax
