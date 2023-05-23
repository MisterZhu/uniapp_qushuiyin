<script lang="ts" setup>
import type { MineItemModel, UserInfoModel } from '@/public/decl-type';
import { computed, ref } from 'vue';

import { isToday, isYesterday } from "@/utils/time-utils";
import { RequestApi } from '@/public/request';
import { onShareAppMessage } from '@dcloudio/uni-app';
import HelpItem from "./help-widget/help-item.vue";

let userInfo = ref<UserInfoModel>()

const item = <MineItemModel>{
  left_img: "/static/mine/mine-next-999.png",
  left_title: "分享给好友",
  right_img: "/static/mine/mine-next-999.png",
  right_title: "邀请第1位好友+10次解析次数，第2位+20次，以此类推。当邀请好友>10位时，可去我的->帮助中心->联系客服，获取永久免费解析次数",
  line_shou: true,
  head_shou: false,
  share_shou: true,
}

var list1 = [{
  "title": '1天',
  "desc": '+2'
}, {
  "title": '2天',
  "desc": '+2'
}, {
  "title": '3天',
  "desc": '+3'
}, {
  "title": '4天',
  "desc": '+3'
}, {
  "title": '5天',
  "desc": '+5'
}, {
  "title": '6天',
  "desc": '+5'
}, {
  "title": '7天',
  "desc": '+7'
}]
var rewardAry = [2, 2, 3, 3, 5, 5, 7]
// MARK: 签到
async function requestSignIn() {
  try {
    const res: any = await RequestApi.SignIn({ "sigin_count": userInfo.value?.sigin_count, "sigin_reward": userInfo.value?.sigin_reward })
    console.log(res)
    if (res.code === 200) {
      userInfo.value = res.data
      uni.setStorageSync('local_token', res.token)
      uni.setStorageSync('local_user_info', JSON.stringify(res.data));
      uni.showToast({ title: res.msg, duration: 2000 })

    } else {
      uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
    }
  } catch (error) {
    console.error(error)
    uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
  }

}

//用户信息模块

const getUserIn = () => {
  var uInfo = JSON.parse(uni.getStorageSync('local_user_info'));
  console.log("userInfo = " + `${uInfo}`)
  if (uInfo) {
    userInfo.value = uInfo;
  }
}
getUserIn()

const handleSignIn = () => {
  console.log('clicked handleSign:')
  if (isSigned.value === true) {
    console.log('已签到')
  } else {
    console.log('未签到')
    requestSignIn()
  }

}
const isSigned = computed(() => {
  const createdAt = new Date(userInfo.value?.sigin_time ?? '2023-04-05T19:42:03+08:00');
  if (isToday(createdAt)) {
    console.log('是同一天')

    return true
  } else {
    console.log('不是同一天')

    return false
  }
})
const active = computed(() => {
  // 将 created_at 字段转换为日期对象
  const createdAt = new Date(userInfo.value?.sigin_time ?? '2023-04-05T19:42:03+08:00');

  // 判断日期是否是今天
  if (isToday(createdAt)) {
    console.log('今天');
    return userInfo.value?.sigin_count - 1
    // 判断日期是否是昨天
  } else if (isYesterday(createdAt)) {
    console.log('昨天');
    return userInfo.value?.sigin_count
  } else {
    console.log('断签');
    return userInfo.value?.sigin_count
  }
})
const handleItemClick = (itemModel: any) => {
  console.log('clicked item:', itemModel.left_title)
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
</script>

<template>
  <view class="container">
    <view class="header">
      <view class="header__left">
        <view class="header__info">
          <text class="header__username">已连续签到{{ userInfo?.sigin_count }}天</text>
          <text class="header__userid">
            {{ isSigned ? `今日已签到\n明日继续签到可领取 ${rewardAry[userInfo?.sigin_count + 1]} 次解析次数` : `今日签到可以领取
            ${userInfo?.sigin_reward} 次解析次数` }}
          </text>
        </view>
      </view>
      <view class="header__tip">剩余解析次数：{{ userInfo?.query_count }}</view>
    </view>
    <view class="header__bottom">
      <!-- <image class="vip__icon" @click="copyHandle()" src="/static/mine/mine_vip-icon.png" /> -->
      <text class="vip__title">签到领解析次数</text>
      <!-- "checkbox-filled" -->
      <uni-steps class="sign__step" :options="list1" :active-icon="isSigned ? 'circle-filled' : 'circle'"
        :active="active" />
      <button class="sign-btn" :class="{ 'signed': isSigned }" @click="handleSignIn">{{ isSigned ? '已签到' : '立即签到'
      }}</button>

    </view>
    <view class="share_friend">
      <HelpItem :item-model="item" @click="handleItemClick" />
      <button class="share-button" open-type="share">111</button>

    </view>

  </view>
</template>

<style lang="scss" scoped>
.container {
  background-color: $uni-color-f8f;
  height: 100vh;
}

.share-button {
  position: absolute;
  width: 95%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
// .HelpItem{
//   width: 95vw;
// }
.share_friend{
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 150px;

}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 160px;
  padding: 0px;
  background-color: $uni-color-theme;
  position: relative;
  /* 添加 position 属性，使得 header__bottom 为绝对定位 */

}

.header__left {
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-left: 15px;

  z-index: 10;

}

.header__info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.header__username {
  font-size: 18px;
  color: $uni-color-fff;
  font-weight: bold;
  margin: 0;
}

.header__userid {
  font-size: 14px;
  color: $uni-color-eee;
  margin: 0;
}

.header__tip {
  font-size: 14px;
  color: $uni-color-eee;
  text-align: right;
  margin-right: 12px;
  margin-top: 30px;

  flex: 1;
  z-index: 10;

}

.header__bottom {
  position: absolute;
  /* 绝对定位，相对于 header 的位置 */
  top: 105px;
  /* 距离 header 底部的距离为 0 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 180px;
  width: 90vw;
  margin-left: 5vw;
  background-color: $uni-color-fff;
  /* 背景色为白色，方便查看效果 */
  background-size: cover;

  border-radius: 10px;
  box-shadow: 0px 0px 3px $uni-color-ccc;
}

.vip__title {
  // font-size: 14px;
  // color: #f5ce32;
  margin-bottom: 15px;
}



.sign-btn.signed {
  margin-top: 15px;
  width: 70%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  // background-color: $uni-color-f8f;
  background-image: linear-gradient(to bottom, $uni-color-f7f, $uni-color-f9f);
  color: $uni-color-999;
  border: 1px solid $uni-color-eee;
  border-radius: 5px;
  font-size: 14px;

}

.sign-btn {
  margin-top: 15px;
  width: 70%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: $uni-color-fff;
  background-image: linear-gradient(to bottom, $uni-color-gradient0, $uni-color-gradient1);
  border-radius: 5px;
  font-size: 14px;
}

.sign__step {
  width: 80vw;
}
</style>
