
<script setup lang="ts">
import type { MultipleSelect } from '@/public/decl-type';
import { defineProps, onMounted, onBeforeMount, watch, ref, type PropType } from 'vue';

const props = defineProps({
  titleSrc: String,
});
const localTitleSrc = ref(props.titleSrc);

const onChangeTitle = (value: string) => {
  localTitleSrc.value = value;
  // console.log(`title onChangeTitle titleSrc: ${props.titleSrc}`);

};

onBeforeMount(() => {
  // console.log(`title created titleSrc: ${props.titleSrc}`);

});

onMounted(() => {
  // console.log(`title mounted titleSrc: ${props.titleSrc}`);

});

watch(
  () => props.titleSrc,
  (newValue) => {
    // console.log(`title watch titleSrc: ${newValue}`);
    localTitleSrc.value = newValue;
  },
  { immediate: true }
);


const saveHandle = async () => {
  uni.setClipboardData({
        // @ts-ignore
        data: localTitleSrc.value,
        success() {
            uni.showToast({
                title: '复制成功'
            })
        }
    })
}

</script>

<template>
  <view class="video-container">
    <!-- <uni-easyinput type="textarea" :value="titleSrc" placeholder=""></uni-easyinput> -->
    <uni-easyinput type="textarea" :value="localTitleSrc" placeholder="" @change="onChangeTitle"></uni-easyinput>
  </view>
  <view class="btn-container">
    <button class="save-btn" @click=saveHandle()>
      复制标题
    </button>
  </view>
</template>

<style lang="scss" scoped>



.btn-container {
  background-color: white;
  position: relative;
  border-radius: 5px;
}

.save-btn {
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
</style>