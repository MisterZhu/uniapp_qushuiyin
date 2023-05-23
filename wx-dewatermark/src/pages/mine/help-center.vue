<template>
  <view class="container">
    <view>
      <HelpItem v-for="(item, index) in itmeAry" :key="index" :item-model="item" @click="handleItemClick" />
    </view>
    <button class="server-btn" open-type="contact" :bindcontact="handleContact">联系客服</button>
    <view class="title_bg">
      <p class="right_title">客服在线时间：工作日 9:00-12:00 13:00-18:00</p>
    </view>


  </view>
</template>
  
<script setup lang="ts">
import type { MineItemModel } from "@/public/decl-type";
import HelpItem from "./help-widget/help-item.vue";
import { onMounted, ref } from "vue";
const itmeAry = ref<MineItemModel[]>([
  {
    left_img: "/static/mine/mine-up-999.png",
    left_title: "如何复制视频链接？",
    right_img: "/static/mine/mine-down-999.png",
    right_title: "在视频或图集来源的APP中点击该视频或图集的分享，在分享选项里找到“复制链接”并点击，然后回到全站去水印小程序，点击粘贴按钮，再点击解析即可",
    line_shou: true,
    head_shou: false,
    share_shou: false,
  },
  {
    left_img: "/static/mine/mine-up-999.png",
    left_title: "提示提取失败怎么办？",
    right_img: "/static/mine/mine-down-999.png",
    right_title: "请检查链接是否有效？可以把链接粘贴到浏览器尝试打开，若浏览器中无法正常打开播放，则该链接是无效的。如果浏览器能打开，请看解析次数是否大于0。如果解析次数大于0，请点击下方的联系人工客服反馈。",
    line_shou: true,
    head_shou: false,
    share_shou: false,

  },
])
const handleItemClick = (itemModel: any) => {
  const index = itmeAry.value.findIndex(item => item === itemModel)

  console.log('clicked item:', index)
  itemModel.share_shou = !itemModel.share_shou
  itmeAry.value[index] = itemModel
}
// 在 mounted 时打印设备信息
onMounted(() => {
  console.log(uni.getSystemInfoSync())
})

// 处理联系客服事件
const handleContact = (event: any) => {
  console.log(event)
}

</script>
<style lang="scss" scoped>
.container {
  background-color: $uni-color-f8f;
  height: 100vh;
}

.server-btn {
    width: 100%;
    top: 30px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: $uni-color-fff;
    background-color: $uni-color-gradient0;
    font-size: 16px;
    border-radius: 0;
}

.title_bg {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 45px;
}
.right_title {
  font-size: 14px;
  color: $uni-color-999;
  text-align: center;
}

</style>