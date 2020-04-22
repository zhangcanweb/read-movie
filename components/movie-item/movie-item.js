// components/movie-item/movie-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movieItemData: {
      type: Object,
      default: {
        movieId: 0,
        coverageUrl: '',
        title: '',
        stars: [1, 1, 1, 1, 1],
        average: '',
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
