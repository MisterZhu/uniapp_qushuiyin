
<script setup lang="ts">
import type { MineItemModel } from '@/public/decl-type';
import { onShareAppMessage } from '@dcloudio/uni-app';
import type { PropType } from 'vue';

const props = defineProps({
  itemModel: {
    type: Object as PropType<MineItemModel>,
    required: true,
  },
});
const emits = defineEmits(['click'])

const handleClick = () => {
  emits('click', props.itemModel)
}

onShareAppMessage(() => {
    var uInfo = JSON.parse(uni.getStorageSync('local_user_info'));
    const open_id = uInfo?.open_id ?? ''; // 获取userInfo的id
    let myObj = {
        title: `来自好友的邀请`,
        path: "/pages/index/index?open_id=" + open_id,
        imageUrl: "https://qiniu.aimissu.top/images/qushuiyin_logo.png"
    }
    return myObj;
});


// const handleClick = () => {
//   console.log('item clicked:', props.itemModel.left_title)
// }
</script>

<template>
  <view class="header" v-show="itemModel.head_shou"></view>
  <view class="my-component" @click="handleClick()">
    <button v-show="itemModel.share_shou" class="share-button" open-type="share"></button>
    <view class="my-component__left">
      <img class="down_icon" :src="itemModel.left_img" />
      <span class="left_title">{{ itemModel.left_title }}</span>
    </view>
    <view class="my-component__right">
      <span class="right_title">{{ itemModel.right_title }}</span>
      <img class="down_icon" :src="itemModel.right_img" />
    </view>
  </view>
  <view class="footer" v-show="itemModel.line_shou">
    <view class="divider"></view>
  </view>

</template>
  
<style lang="scss" scoped>
/* 与父组件样式保持一致 */
.my-component {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px 15px 15px 20px;
  position: relative;

}

.my-component__left {
  display: flex;
  align-items: center;
}

.my-component__left img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.my-component__right {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

}

.my-component__right img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}

.left_title {
  font-size: 14px;
  font-weight: bold;
  color: $uni-color-333;
  padding-left: 10px;

}

.right_title {
  font-size: 12px;
  color: $uni-color-999;
  padding-bottom: 1px;
}

.down_icon {
  width: 20px;
  height: 20px;
  padding-left: 0px;
  padding-right: 0px;
  // padding-top: 5px;
  // padding-bottom: 5px;

}

.divider {
  margin: 0 20px 0;
  height: 1px;
  background-color: $uni-color-eee;
}

.footer {
  margin: 0;
  height: 1px;
  background-color: $uni-color-fff;
}

.header {
  margin: 0;
  height: 20px;
  background-color: $uni-color-f8f;
}
.share-button {
  position: absolute;
  width: 95%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.share-button.show{
  position: absolute;
  width: 95%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
  