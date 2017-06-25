<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer.js'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer.js'
import ListView from 'base/listView/listView'
const HOT_TITLE = '热门'
const HOT_SINGER_LEN = 10
export default {
  components: {
    ListView
  },
  data() {
    return {
      singers: []
    }
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
      })
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_TITLE) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  },
  created() {
    this._getSingerList()
  }
}
</script>
<style lang="stylus">
  .singer
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
</style>
