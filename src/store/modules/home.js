const state = {
  carousel: {
    // 控制显示的闪购物品
    flashPurchaseInfo: {
      wrapperWidth: 0, // 可是区域宽度
      listWidth: 0, // 总长度
      itemWidth: 0,
      itemsLength: 0,
      current: 1,
      total: 0,
      debuggerInfo: ''
    },
    listStyle: {
      transform: 'translate3d(0,0,0)',
      width: ''
    },
    itemStyle: {
      width: ''
    }
  }
}
const getters = {
  listStyle (state) {
    return state.carousel.listStyle
  },
  itemStyle (state) {
    return state.carousel.itemStyle
  },
  flashPurchaseInfo (state) {
    return state.carousel.flashPurchaseInfo
  },
  isDisablePre (state) {
    return state.carousel.flashPurchaseInfo.current === 1
  },
  isDisableNext (state) {
    let {
      current,
      total
    } = state.carousel.flashPurchaseInfo
    return current === total
  }
}

const actions = {
  async setListStyle ({
    commit
  }, style) {
    return commit('setListStyle', style)
  },
  async setItemStyle ({
    commit
  }, style) {
    return commit('setItemStyle', style)
  },
  async setFlashPurchaseInfo ({
    commit
  }, info) {
    return commit('setFlashPurchaseInfo', info)
  },
  async flashPurchaseCarouselChange ({
    commit
  }, flag) {
    return commit('changeFlashPruchaseCarousel', flag)
  }
}

const mutations = {
  setListStyle (state,
    style
  ) {
    state.carousel.listStyle = Object.assign(state.carousel.listStyle, style)
  },
  setItemStyle (state,
    style
  ) {
    state.carousel.itemStyle = Object.assign(state.carousel.itemStyle, style)
  },
  setFlashPurchaseInfo (state,
    info
  ) {
    state.carousel.flashPurchaseInfo = Object.assign(state.carousel.flashPurchaseInfo, info)
  },
  changeFlashPruchaseCarousel (state,
    flag
  ) {
    let style = {}
    let {
      listWidth,
      wrapperWidth,
      current: oldCurrent,
      total
    } = state.carousel.flashPurchaseInfo
    // 首页或者末页无法点击
    let translateX
    let newCurrent
    if (flag === -1) {
      if (oldCurrent === 1) return console.log('pre erro')
      newCurrent = oldCurrent - 1
      state.carousel.flashPurchaseInfo.current = newCurrent

      translateX = (newCurrent - 1) * wrapperWidth
    } else {
      if (oldCurrent === total) return console.log('next erro')
      newCurrent = oldCurrent + 1
      state.carousel.flashPurchaseInfo.current = newCurrent

      if (newCurrent === total) {
        translateX = listWidth - wrapperWidth
      } else {
        translateX = oldCurrent * wrapperWidth
      }
    }

    style = {
      transform: 'translate3d(-' + translateX + 'px,0,0)'
    }
    // debugger info
    state.carousel.flashPurchaseInfo.debuggerInfo = 'newCurrent:' + newCurrent + ';translateX:' + translateX
    state.carousel.listStyle = Object.assign(state.carousel.listStyle, style)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
