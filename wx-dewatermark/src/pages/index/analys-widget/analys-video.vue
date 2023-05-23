<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { savePosterPath, saveVideoToPhotosAlbum } from "@/public/savefile";

const props = defineProps({
    videoSrc: String
});
const copyHandle = async () => {

    uni.setClipboardData({
        // @ts-ignore
        data: props.videoSrc,
        success() {
            uni.showToast({
                title: '复制成功'
            })
        }
    })
}
const saveHandle = () => {
    // savePosterPath(props.videoSrc ?? '')
    uni.showLoading({
        title: '正在保存视频...'
    });
    saveVideoToPhotosAlbum(props.videoSrc ?? '', () => {
        uni.hideLoading()
        uni.showToast({
            title: '保存成功'
        });
    }, (err) => {
        console.error('保存失败：', err)
        uni.hideLoading()
        uni.showToast({
            title: '保存失败',
            icon: 'none'
        });
        showAlerts()
    })
}
const showAlerts = () => {
    uni.showModal({
        title: '保存失败',
        content: '可能因下载链接小程序不支持，请复制链接去浏览器下载视频',
        showCancel: false, // 不展示取消按钮
        confirmText: "复制链接", // 确认按钮文字 
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定');
                copyHandle()
            }
        }
    });
}
</script>

<template>
    <view class="video-container">
        <video ref="videoRef" :src="videoSrc" controls></video>

    </view>
    <view class="btn-container">
        <button class="copy-btn" @click=copyHandle()>复制链接</button>
        <button class="save-btn" @click=saveHandle()>保存视频</button>

    </view>
</template>

<style lang="scss" scoped>
.video-container {
    background-color: black;
    position: relative;
    border-radius: 5px;

}

.btn-container {
    background-color: black;
    position: relative;
    border-radius: 5px;

}

.video-container video {
    display: block;
    margin: 0 auto;
    /* 水平居中 */
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    /* 按比例填充，可能会裁剪部分视频 */
}

.copy-btn {
    position: absolute;
    left: 8px;
    width: 45%;
    top: calc(100% + 15px);
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: $uni-color-fff;
    color: $uni-color-gradient1;
    border-radius: 5px;

    font-size: 16px;
    border: 1px solid $uni-color-gradient1;
}

.save-btn {
    position: absolute;
    width: 45%;
    right: 8px;
    top: calc(100% + 15px);
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: $uni-color-fff;
    background-image: linear-gradient(to bottom, $uni-color-gradient0, $uni-color-gradient1);
    border-radius: 5px;
    font-size: 16px;
}
</style>