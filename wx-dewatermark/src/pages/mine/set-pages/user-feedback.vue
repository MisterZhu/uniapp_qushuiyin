<script lang="ts" setup>
import { ref } from 'vue';

let feedback = ref<string>('')

const submitFeedback = () => {
  console.log('点击事件')
  uni.showToast({ title: '提交成功', duration: 2000 })

}
</script>

<template>
  <view class="feedback-container">
    <form>
      <view class="form-group">
        <label for="suggestion">您的建议和反馈：</label>
        <textarea id="suggestion" v-model="feedback" placeholder="请输入您的建议与反馈"></textarea>
      </view>
      <view class="form-group">
        <button type="submit" class="submit-button" @click.prevent="submitFeedback()">提交反馈</button>
      </view>
    </form>
  </view>
</template>

<style lang="scss" scoped>
.feedback-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
form {
  margin: 0;
  padding: 0;
}
.form-group {
  flex: 1;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

label {
  display: block;
  margin-bottom: 10px;
}

textarea {
  height: 200px;
  resize: none;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}

.submit-button {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: none;
  background-color: #007aff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
html, body {
  margin: 0;
  padding: 0;
}
</style>