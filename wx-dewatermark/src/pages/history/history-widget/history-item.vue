  
<script setup lang="ts">
import type { Analysis } from '@/public/decl-type';
import { RequestApi } from '@/public/request';
import type { PropType } from 'vue';


const props = defineProps({
  analyModel: {
    type: Object as PropType<Analysis>,
    required: true,
  },
});

const copyHandle = async () => {

  uni.setClipboardData({
    // @ts-ignore
    data: props.analyModel.origin_url,
    success() {
      uni.showToast({
        title: '复制成功'
      })
    }
  })
}
// MARK: 解析链接
async function requestAnalysisUrl(url: string) {
  try {
    const res: any = await RequestApi.HomeAnalysis({ "url": url })
    console.log("res = " + res)
    if (res.code === 200) {
      // analyModel = res.data
      // 跳转到二级页面并传递参数
      uni.navigateTo({
        url: '/pages/index/analysis-result?analyModel=' + encodeURIComponent(JSON.stringify(res.data))
      })
    } else {
      uni.showToast({ title: res.msg, icon: 'none', duration: 2000 })
    }
  } catch (error) {
    console.error(error)
    uni.showToast({ title: '请求失败', icon: 'none', duration: 2000 })
  }
}

const handleSubmit = async () => {
  if (props.analyModel.origin_url != '') {
    const str = props.analyModel.origin_url
    if (str.includes('http://') || str.includes('https://')) {
      requestAnalysisUrl(str ?? '')
    } else {
      uni.showToast({ title: '输入的链接格式不正确', icon: 'none', duration: 2000 })
    }
  } else {
    uni.showToast({ title: '请输入要解析的链接', icon: 'none', duration: 2000 })
  }
}
</script>

<template>
  <view class="custom-component">
    <!-- 组件最外层包裹的view，设置边距和圆角 -->
    <view class="component-wrapper">
      <view class="component-header">
        <!-- 文本标签，用来展示内容 -->
        <text class="component-text">{{ analyModel.origin_url }}</text>
      </view>
      <view class="component-footer">
        <!-- 两个按钮，右对齐 -->
        <view class="copy-btn" @click="copyHandle()">复制链接</view>
        <view class="component-button" @click="handleSubmit()">重新解析</view>
      </view>
    </view>
  </view>
</template>
  
<style lang="scss" scoped>
/* 组件最外层包裹的view的样式 */
.component-wrapper {
  margin: 12px 8px 10px 8px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px $uni-color-ccc;
  background-color: $uni-color-fff;
  overflow: hidden;
}

/* 组件头部样式，包括文本标签 */
.component-header {
  padding: 12px;
}

/* 文本标签样式 */
.component-text {
  font-size: 14px;
  line-height: 1.5;
}

/* 组件底部样式，包括两个按钮 */
.component-footer {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
}

/* 按钮样式 */
.component-button {
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 3px;
  color: $uni-color-fff;
  // background-image: linear-gradient(to bottom, $uni-color-gradient0, $uni-color-gradient1);
  background-color: $uni-color-theme;
  font-size: 14px;
  cursor: pointer;
}

.copy-btn {
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: $uni-color-f8f;
  color: $uni-color-333;
  font-size: 14px;
  border: 1px solid $uni-color-ccc;
  cursor: pointer;

}
</style>
  