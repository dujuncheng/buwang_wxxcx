/* eslint-disable */

/*
 * @Author: lizhou.lu
 * @Date: 2018-05-07 09:59:55
 * @Last Modified by: lizhou.lu
 * @Last Modified time: 2018-05-08 16:58:16
 * @Desc: 冒泡氛围组件。
 */
<template>
  <div class="bubble-ui" :class="fadeName">
    <img class="bubble-avatar" :src="bubble.avatar" />
    <p class="bubble-text"><span class="user-name">{{bubble.nick}}</span><span class="user-text">{{bubble.text}}</span></p>
  </div>
</template>
<script>
    /* eslint-disable */
let timer = null;
let index = 0;
export default {
    props: ['bubbleData'],
    data() {
        return {
            fadeName: {
                fadeIn: true,
                fadeOut: false,
            },
            bubble: {
                avatar: '',
                nick: '',
                text: '',
            },
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.setData();
            this.start();
        });
    },
    methods: {
        start() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.toggle();
                this.show();
            }, 2500);
        },
        show() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.setData();
                this.toggle();
                this.start();
            }, 200);
        },
        setData() {
            if (index >= this.bubbleData.length) {
                index = 0;
            }
            this.bubble = this.bubbleData[index++];
        },
        toggle() {
            const {fadeOut, fadeIn} = this.fadeName;
            this.fadeName.fadeOut = !fadeOut;
            this.fadeName.fadeIn = !fadeIn;
        },
    },
};
</script>
<style lang="less" scoped>
.fadeIn{
  animation: fadeIn 0.2s linear forwards;
}
.fadeOut{
  animation: fadeOut 0.2s linear forwards;
}
@keyframes fadeIn {
  from{
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  to{
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeOut {
   from{
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to{
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }
}
.bubble-ui{
  box-sizing: border-box;
  position: absolute;
  top: 19px;
  left: 16 px;
  height: 46px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  background-image: linear-gradient(-269deg, rgba(225,0,207,0.8) 0%, rgba(107,0,246, 0.8) 100%);
  border-radius: 60 px;
  padding-right: 27px;
  max-width: 430px;
  transform: translate3d(0, 60px, 0);
  z-index: 999;
}
.bubble-avatar{
  width: 38px;
  height: 38px;
  margin: 0 6px 0 5px;
  flex: 0 0 auto;
  border-radius: 50%;
}
.bubble-text{
  display: inline-block;
  font-size: 24px;
  color: #fff;
  flex: 0 0 auto;
  span{
    display: inline-block;
    vertical-align: middle;
  }
  .user-name{
    max-width: 96px;
  }
}
</style>

