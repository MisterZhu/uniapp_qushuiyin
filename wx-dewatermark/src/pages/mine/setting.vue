
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UserInfoModel, MineItemModel } from '@/public/decl-type';
import MineItem from './mine-widget/mine-item.vue';
import { onShow } from '@dcloudio/uni-app';

let menu_top = ref<string>('')
let menu_height = ref<string>('')
let safeTop = ref<string>('')
let userInfo = ref<UserInfoModel>()

const itmeAry = <MineItemModel[]>[
    {
        left_img: "/static/mine/mine_secunity1.png",
        left_title: "隐私政策",
        right_img: "/static/mine/mine-next-999.png",
        right_title: "",
        line_shou: true,
        head_shou: false,
        share_shou: false,
    },
    {
        left_img: "/static/mine/mine_agreement.png",
        left_title: "用户协议",
        right_img: "/static/mine/mine-next-999.png",
        right_title: "",
        line_shou: true,
        head_shou: false,
        share_shou: false,

    },
    // {
    //     left_img: "/static/mine/mine_aboutUs.png",
    //     left_title: "关于我们",
    //     right_img: "/static/mine/mine-next-999.png",
    //     right_title: "",
    //     line_shou: false,
    //     head_shou: false,
    //     share_shou: false,

    // },
    {
        left_img: "/static/mine/mine_fankui.png",
        left_title: "建议反馈",
        right_img: "/static/mine/mine-next-999.png",
        right_title: "",
        line_shou: false,
        head_shou: true,
        share_shou: false,

    },
]
//用户信息模块

const getLocalUserInfo = () => {
    var uInfo = JSON.parse(uni.getStorageSync('local_user_info'));
    console.log("userInfo = " + `${uInfo}`)
    if (uInfo) {
        userInfo.value = uInfo;
    }
}
getLocalUserInfo()


onShow(() => {
    console.log("setting Show");
});

onMounted(() => {
    let menu_but = uni.getStorageSync('MenuButton')
    menu_top.value = menu_but.top + 'px'
    menu_height.value = menu_but.height + 'px'
    let SafeAreaInsetTop = uni.getStorageSync('SafeAreaInsetTop')
    safeTop.value = '0px'
    // console.log("SafeAreaInsetTop = " + SafeAreaInsetTop);

})

// const handleClick = (index: number) => {
//   console.log('item clicked:', index)
// }
const handleItemClick = (itemModel: any) => {
    console.log('clicked item:', itemModel.left_title)
    switch (itemModel.left_title) {
        case '隐私政策':
            uni.navigateTo({
                url: '/pages/mine/set-pages/user-privacy'
            })
            break;
        case '用户协议':
            uni.navigateTo({
                url: '/pages/mine/set-pages/user-protocol'
            })
            break;
        case '建议反馈':
            uni.navigateTo({
                url: '/pages/mine/set-pages/user-feedback'
            })
            break;
        default:
            break;
    }
}
</script>

<template>
    <view class="container">
        <view class="group">
            <MineItem v-for="(item, index) in itmeAry" :key="index" :item-model="item" @click="handleItemClick" />
        </view>

    </view>
</template>

<style lang="scss" scoped>
.container {
    background-color: $uni-color-f8f;
    height: 100vh;
}
</style>