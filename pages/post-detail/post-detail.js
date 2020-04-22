// miniprogram/pages/post-detail/post-detail.js
const {
  postList
} = require('../../data/posts-data')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postId = options.id
    this.setData({
      postData: postList[postId],
      postId
    })
    let collection = wx.getStorageSync(`collection${this.data.postId}`)
    if (collection) {
      this.setData({
        collected: true
      })
    } else {
      this.setData({
        collected: false
      })
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId) {
      this.setData({
        isPlayingMusic: true
      })
    } else {
      this.setData({
        isPlayingMusic: false
      })
    }
    wx.onBackgroundAudioPlay((res) => {
      this.setData({
        isPlayingMusic: true
      })
    })
    wx.onBackgroundAudioPause((res) => {
      this.setData({
        isPlayingMusic: false
      })
    })
  },
  onCollectionTap() {
    let collection = wx.getStorageSync(`collection${this.data.postId}`)
    if (collection) {
      this.setData({
        collected: false
      })
      wx.setStorageSync(`collection${this.data.postId}`, false)
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      this.setData({
        collected: true
      })
      wx.setStorageSync(`collection${this.data.postId}`, true)
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000
      })
    }
  },

  onShareTap() {
    wx.showActionSheet({
      itemList: [
        "分享给李噶",
        "分享给黄噶",
        "分享给大噶"
      ],
      itemColor: "#405f80"
    })
  },

  onMusicTap() {
    const musicItem = postList[this.data.postId].music
    if (this.data.isPlayingMusic) {
      app.globalData.g_currentMusicPostId=null
      app.globalData.g_isPlayingMusic=false
      wx.pauseBackgroundAudio({
        dataUrl: musicItem.url,
        title: musicItem.title,
        coverImgUrl: musicItem.coverImg
      })
      this.setData({
        isPlayingMusic: false
      })
    } else {
      app.globalData.g_currentMusicPostId=this.data.postId
      app.globalData.g_isPlayingMusic=true
      wx.playBackgroundAudio({
        dataUrl: musicItem.url,
        title: musicItem.title,
        coverImgUrl: musicItem.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})