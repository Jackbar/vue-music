<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'
  import musicList from 'components/music-list/music-list'
  export default {
    components: {
      musicList
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
      bgImage() {
        return this.singer.avatar
      },
      title() {
        return this.singer.name
      },
      ...mapGetters([
        'singer'
      ])
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push({
            'path': '/singer'
          })
          return
        }
        getSingerDetail(this.singer.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach(item => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(item.musicData))
          }
        })
        return ret
      }
    },
    created() {
      this._getDetail()
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .slide-enter-active,.slide-leave-active
    transition: all .3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%,0,0)
</style>
