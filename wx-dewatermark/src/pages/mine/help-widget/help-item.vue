<template>
  <view class="card" :class="{ expanded: itemModel.share_shou }">
    <view class="card-header" @click="toggleExpand()">
      <view class="card-header-left">
        <span class="left_title">{{ itemModel.left_title }}</span>
      </view>
      <view class="card-header-right">
        <img class="down_icon" :src="itemModel.share_shou ? itemModel.left_img : itemModel.right_img " alt="">
      </view>
    </view>
    <view v-if="itemModel.share_shou" class="card-body">
      <p class="right_title">{{ itemModel.right_title }}</p>
    </view>
  </view>
</template>
  
<script setup lang="ts">import type { MineItemModel } from '@/public/decl-type';
import type { PropType } from 'vue';

const props = defineProps({
  itemModel: {
    type: Object as PropType<MineItemModel>,
    required: true,
  },
});
const emits = defineEmits(['click'])


const toggleExpand = () => {
  console.log('点击事件')
  emits('click', props.itemModel)
}

</script>
  
<style lang="scss" scoped>
.card {
  border-radius: 10px;
  margin: 10px;
  overflow: hidden;
  transition: height 0.3s ease;
  background-color: $uni-color-fff;
  box-shadow: 0 0 5px $uni-color-fff;
}

.card.expanded {
  height: auto;
}

.card-header {
  display: flex;
  height: 50px;
  width: calc(100vw - 20px);
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.card-header-left {
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-header-right {
  width: 50%;
  text-align: right;
}

.card-body {
  margin-top: 10px;
}

.mcard-header-rightimg {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.down_icon {
  width: 20px;
  height: 20px;
  padding-right: 10px;
  // padding-top: 5px;
  // padding-bottom: 5px;

}
.left_title {
  font-size: 14px;
  font-weight: bold;
  color: $uni-color-333;
  padding-left: 10px;
}

.right_title {
  font-size: 14px;
  color: $uni-color-666;
  padding-top: 0px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;

}
</style>
  