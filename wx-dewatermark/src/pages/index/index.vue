

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RequestApi } from "@/public/request"
import type { Analysis, UserInfoModel } from '@/public/decl-type';
import { onLoad, onShow } from '@dcloudio/uni-app';

const inputValue = ref<string>('')
const hidePasteBtn = ref<boolean>(false)
let userInfo = ref<UserInfoModel>()
let analyModel = ref<Analysis>()

let openid = uni.getStorageSync('openid')
const inviter_openid = ref<string>('')

// MARK: 注册&获取用户信息
async function requestUserInfoWithCode(code: string) {
  const res: any = await RequestApi.UserLogin({ "code": code, "inviter_id":inviter_openid })
  console.log(res)
  console.log("local_token = " + res.token)
  uni.setStorageSync('local_token', res.token)
  uni.setStorageSync('local_user_info', JSON.stringify(res.data));
  userInfo.value = res.data
}
const getLocalUserInfo = () => {
  var uInfo = JSON.parse(uni.getStorageSync('local_user_info'));
  console.log("userInfo = " + `${uInfo}`)
  if (uInfo) {
    userInfo.value = uInfo;
  }
}
// MARK: 解析链接
async function requestAnalysisUrl(url: string) {
  try {
    const res: any = await RequestApi.HomeAnalysis({ "url": url })
    console.log("res = " + res)
    if (res.code === 200) {
      analyModel.value = res.data
      getUserInfo() 
      // 跳转到二级页面并传递参数
      uni.navigateTo({
        url: '/pages/index/analysis-result?analyModel=' + encodeURIComponent(JSON.stringify(analyModel.value))
      })
    } else {
      uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
    }
  } catch (error) {
    console.error(error)
    uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
  }
}

const handleSubmit = () => {
  if (inputValue.value != '') {
    const str = inputValue.value
    if (str.includes('http://') || str.includes('https://')) {
      requestAnalysisUrl(str ?? '')
      // requestAnalyList()
      // uni.navigateTo({
      // url: '/pages/index/analysis-photo?analyModel=' + '我是首页过来的'
      // })
    } else {
      uni.showToast({ title: '输入的链接格式不正确', icon: 'none', duration: 2000 })

    }
  } else {
    uni.showToast({ title: '请输入要解析的链接', icon: 'none', duration: 2000 })
  }
}
//获取openid
function getUserInfo() {
  uni.login({
    success: (res) => {
      requestUserInfoWithCode(res.code)
    }
  })
}
getUserInfo()

onShow(() => {
  console.log("App Show");
  getLocalUserInfo()
});
//接收参数
onLoad(options => {
  if (options) {
    // 处理逻辑
    console.log(`index onLoad:`, options);
    inviter_openid.value = options.open_id
  }
});

const handleInput = () => {
  hidePasteBtn.value = !!inputValue.value
}

//粘贴链接
const handlePaste = () => {
  uni.getClipboardData({
    success: function (res) {
      console.log('获取粘贴板内容：', res.data)
      inputValue.value = res.data
      hidePasteBtn.value = !!inputValue.value
    },
    fail: function (err) {
      console.log('获取粘贴板内容失败：', err)
    }
  })
  console.log('点击事件')

}
//免费获取
const handleFreeGet = () => {
  uni.navigateTo({
    url: '/pages/mine/task-center'
  })
}
onMounted(() => {
  hidePasteBtn.value = !!inputValue.value
})

</script>

<template>
  <view class="top_bg">
    <!-- <uni-image class="down_icon" mode="aspectFit" src="/static/home/home_download_icno.png"></uni-image> -->
    <image class="down_icon" mode="aspectFit" src="/static/home/home_download_icno.png"></image>
    <text class="top_text">剩余解析次数：{{ userInfo?.query_count }}次</text>
    <button @click="handleFreeGet" class="freeget_btn">免费领次数</button>

  </view>
  <view class="input_wrap">
    <textarea v-model="inputValue" @input="handleInput" name="" id="" cols="100" rows="30" maxlength="1000" placeholder=""></textarea>
    <button v-if="!hidePasteBtn" @click="handlePaste" class="paste_btn">粘贴</button>
    <view v-if="!hidePasteBtn" class="paste_text">
      点击粘贴要提取视频的链接
    </view>
  </view>
  <button @click="handleSubmit" class="submit_btn">解析</button>
</template>

<style lang="scss" scoped>
.top_bg {
  height: 40px;
  border-radius: 5px;
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 10px;
  background-color: $uni-bg-lightblue;
  display: flex;
}

.down_icon {
  width: 20px;
  height: 20px;
  padding: 10px;
}

.top_text {
  /* height: 30px; */
  line-height: 40px;
  font-size: 12px;
  color: $uni-color-gradient1;
  text-align: center;
  font-weight: bold;
}

.freeget_btn {
  display: flex;
  justify-content: center;
  height: 30px;
  line-height: 30px;
  /* 等于按钮高度 */
  background-image: linear-gradient(to bottom, $uni-color-gradient0, $uni-color-gradient1);
  color: $uni-color-fff;
  font-size: 10px;
  border-radius: 5px;
  margin-top: 5px;
  margin-right: 5px;
}

.submit_btn {
  display: flex;
  justify-content: center;
  height: 40px;
  line-height: 40px;
  /* 等于按钮高度 */
  background-image: linear-gradient(to bottom, $uni-color-gradient0, $uni-color-gradient1);
  color: $uni-color-fff;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 12px;
  margin-left: 12px;
}

.input_wrap {
  height: 180px;
  border: 1px solid $uni-color-ccc;
  border-radius: 5px;
  margin: 12px;
  background-color: $uni-color-dcd;
  position: relative;
}

textarea {
  width: 95%;
  height: 95%;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
}

.paste_btn {
  position: absolute;
  top: 35%;
  left: 40%;
  width: 20%;
  height: 32px;
  background-image: linear-gradient(to bottom, $uni-color-gradient0, $uni-color-gradient1);

  color: $uni-color-fff;
  font-size: 13px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulse 2s ease-in-out infinite;
  z-index: 1000;

}

.paste_btn span {
  font-size: 20px;
  color: $uni-color-fff;
}

.paste_text {
  position: absolute;
  top: 55%;
  width: 100%;
  font-size: 13px;
  color: $uni-color-999;
  text-align: center;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>