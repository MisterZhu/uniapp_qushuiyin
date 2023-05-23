<script setup lang="ts">
import type { Analysis } from '@/public/decl-type';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref, watch } from 'vue'
import AnalysVideo from "./analys-widget/analys-video.vue";
import AnalysTitle from "./analys-widget/analys-title.vue";
import AnalysPhotos from "./analys-widget/analys-photos.vue";
import AnalysCover from "./analys-widget/analys-cover.vue";

let analyModel = ref<Analysis | null>(null)
let items = ['视频', '封面', '标题']
let items2 = ['图集', '封面', '标题']

var current = ref(0)
let activeColor = '#4771f1'
let styleType = 'button'

let styles = [{
    value: 'button',
    text: '按钮',
    checked: true
},
{
    value: 'text',
    text: '文字'
}
]

//接收参数
onLoad(options => {
    // @ts-ignore
    analyModel.value = JSON.parse(decodeURIComponent(options.analyModel as string)) as Analysis
    console.log(`analysis onLoad: ${analyModel.value.title}`);

});
watch(
    () => analyModel,
    (newValue) => {
        console.log(`analysis watch video: ${newValue.value?.video}`);
        console.log(`analysis watch images: ${newValue.value?.images}`);
    },
    { immediate: true }
);
const onClickItem = (e: { currentIndex: number; }) => {

    if (current.value != e.currentIndex) {
        current.value = e.currentIndex;
        console.log('current is now', current.value);
    }
}
// 根据analyModel.value.video是否有值来判断展示items或者items2
const itemsToShow = computed(() => {
    return analyModel.value?.video ? items : items2;
})

// 根据analyModel.value.video是否有值来判断展示
const videoToShow = computed(() => {
    return analyModel.value?.video ? true : false;
})
const photosToShow = computed(() => {
    return analyModel.value?.images ? true : false;
})

</script>

<template>
    <view>
        <uni-section title="解析成功" type="line">
            <view class="uni-padding-wrap uni-common-mt">
                <uni-segmented-control :current="current" :values="itemsToShow" :style-type="styleType"
                    :active-color="activeColor" @clickItem="onClickItem" />
            </view>
            <view class="content">
                <view class="video-container" v-show="current === 0">
                    <!-- <AnalysVideo v-if=videoToShow :videoSrc="analyModel?.video" />
                    <AnalysPhotos v-if=photosToShow :coverSrc="analyModel?.images" /> -->
                    <template v-if="videoToShow">
                        <AnalysVideo :videoSrc="analyModel?.video" />
                    </template>
                    <template v-else>
                        <AnalysPhotos :coverSrc="analyModel?.images" />
                    </template>
                </view>

                <view v-show="current === 1">
                    <view class="video-container">
                        <AnalysCover :coverSrc="analyModel?.cover" />
                    </view>
                </view>
                <view v-show="current === 2">
                    <view class="video-container">
                        <AnalysTitle :titleSrc="analyModel?.title" />
                    </view>
                </view>
            </view>
        </uni-section>
    </view>
</template>
<style lang="scss">
.content {
    /* #ifndef APP-NVUE */
    // display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;
    height: 300px;
    text-align: center;
}

.uni-padding-wrap {
    padding: 5px 70px 15px 70px;
}

.video-container {
    margin: 8px;
}

.video-container .my-video {
    height: 200px;
    border-radius: 5px;
}
</style>