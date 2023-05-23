
<script setup lang="ts">
import type { MultipleSelect } from '@/public/decl-type';
import { defineProps, onMounted, onBeforeMount, watch, ref, type PropType } from 'vue';
import { saveImageToPhotosAlbum } from "@/public/savefile";

const props = defineProps({
  coverSrc: String
});

const imageAry = ref([] as MultipleSelect[])

onBeforeMount(() => {
  console.log('created');
});

onMounted(() => {
  console.log('mounted');
});

watch(() => props.coverSrc, (newValue, oldValue) => {
  console.log(`photo watch photos: ${newValue} `);
  if (newValue && newValue.length > 0) {
    const arr = newValue.split(",");
    const newImageAry = [] as MultipleSelect[];
    for (const url of arr) {
      console.log(`url: ${url} `);

      newImageAry.push({
        url: url,
        selectState: true,
      });
    }
    imageAry.value = newImageAry;
  } else {
    imageAry.value = [];
  }
});


const toggleSelect = (index: number) => {
  imageAry.value[index].selectState = !imageAry.value[index].selectState;
}
const saveHandle = async () => {


  const selectedImages = imageAry.value.filter(image => image.selectState);
  if (selectedImages.length <= 0){
    uni.showToast({ 
      title: '请选择图片' ,
      image:'/static/common_warn.png'
      });
    return
  }
  uni.showLoading({ title: '保存中' })

  let successCount = 0
  let failCount = 0

  const promises = selectedImages.map((image) => {
    return new Promise<void>((resolve, reject) => {
      saveImageToPhotosAlbum(image.url, () => {
        successCount++
        resolve()
      }, (err) => {
        console.error('保存失败：', err)
        failCount++
        reject(err)
      })
    })
  })

  Promise.all(promises)
    .then(() => {
      uni.hideLoading()

      if (successCount === selectedImages.length) {
        console.log('全部保存成功')
        uni.showToast({
          title: '全部保存成功'
        });
      } else {
        console.error(`保存失败 ${failCount} 张`)
        uni.showToast({ title: `保存失败${failCount}张,成功${successCount}张`, icon: 'none' });
      }
    })
    .catch((err) => {
      console.error(err)
      uni.hideLoading()
      uni.showToast({ title: '保存失败', icon: 'none' });
    })
}

</script>

<template>
  <view class="video-container">
    <scroll-view class="image-list" scroll-x>
      <view v-for="(image, index) in imageAry" :key="index" class="image-item">
        <image :src="image.url" @click="toggleSelect(index)" :class="{ selected: image.selectState }" />
        <view class="select-btn" @click="toggleSelect(index)">
          <!-- <uni-icons :type="image.selectState ? 'circle-filled' : 'circle'" size="30" color="read"></uni-icons> -->
          <image class="down_icon" mode="aspectFit"
            :src="image.selectState ? '/static/home/home_select_icon.png' : '/static/home/home_unselect_icon.png'">
          </image>

        </view>
      </view>
    </scroll-view>
  </view>
  <view class="btn-container">
    <button class="save-btn" @click=saveHandle()>
      保存封面
    </button>
  </view>
</template>

<style lang="scss" scoped>
.image-list {
  white-space: nowrap;
}

.image-item {
  display: inline-block;
  position: relative;
  margin-right: 10px;
  padding: 10px;

}

.image-item image {
  object-fit: cover;
  /* 图片裁剪，不变形填满 */
  width: 50vw;
  height: 50vw;
}

.image-item .select-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.down_icon {
  // width: 25px;
  // height: 25px;
  padding: 8px;
}

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