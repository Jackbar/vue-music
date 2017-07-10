<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from 'common/js/dom'
  const transform = prefixStyle('transform')
  const progressBtnWidth = 16
  export default {
    props: {
      precent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      precent(newPrecent) {
        if (newPrecent >= 0 && !this.touch.init) {
          let progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          let offset = newPrecent * progressBarWidth
          this._offset(offset)
        }
      }
    },
    methods: {
      progressTouchStart(e) {
        this.touch.init = true
        this.touch.left = this.$refs.progress.clientWidth
        this.touch.starX = e.touches[0].pageX
      },
      progressTouchMove(e) {
        if (!this.touch.init) {
          return
        }
        let deltaX = e.touches[0].pageX - this.touch.starX
        let offset = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offset)
      },
      progressTouchEnd() {
        this.touch.init = false
        this._triggerPercent()
      },
      progressClick(e) {
        this._offset(e.offsetX)
        this._triggerPercent()
      },
      _triggerPercent() {
        let progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        let precent = this.$refs.progress.clientWidth
        this.$emit('percentChange', precent / progressBarWidth)
      },
      _offset(offset) {
        this.$refs.progress.style.width = offset + 'px'
        this.$refs.progressBtn.style[transform] = `translate3d(${offset}px,0,0)`
      }
    },
    created() {
      this.touch = {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
