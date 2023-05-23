
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RequestApi } from "@/public/request";
import type { UserInfoModel, MineItemModel } from '@/public/decl-type';
import MineItem from './mine-widget/mine-item.vue';
import MineHeader from './mine-widget/mine-header.vue';
import { onShareAppMessage, onShow } from '@dcloudio/uni-app';

let menu_top = ref<string>('')
let menu_height = ref<string>('')
let safeTop = ref<string>('')
let userInfo = ref<UserInfoModel>()

const itmeAry = <MineItemModel[]>[
    {
        left_img: "/static/mine/mine_task.png",
        left_title: "任务中心",
        right_img: "/static/mine/mine-next-999.png",
        right_title: "免费领取解析次数",
        line_shou: true,
        head_shou: false,
        share_shou: false,
    },
    {
        left_img: "/static/mine/mine_share.png",
        left_title: "分享给好友",
        right_img: "/static/mine/mine-next-999.png",
        right_title: "",
        line_shou: true,
        head_shou: false,
        share_shou: true,

    },
    {
        left_img: "/static/mine/mine_settings.png",
        left_title: "设置",
        right_img: "/static/mine/mine-next-999.png",
        right_title: "",
        line_shou: false,
        head_shou: false,
        share_shou: false,

    },
    {
        left_img: "/static/mine/mine_help.png",
        left_title: "帮助中心",
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
    } else {
        getUserInfo()
    }
}
getLocalUserInfo()

async function requestUserInfoWithCode(code: string) {
    const res: any = await RequestApi.UserLogin({ "code": code })
    console.log(res)
    console.log("local_token = " + res.token)
    uni.setStorageSync('local_token', res.token)
    uni.setStorageSync('local_user_info', JSON.stringify(res.data));
    userInfo.value = res.data;
}
onShow(() => {
    console.log("mine Show");
});
onShareAppMessage(() => {
    const open_id = userInfo.value?.open_id ?? ''; // 获取userInfo的id

    let myObj = {
        title: `来自好友的邀请`,
        path: "/pages/index/index?open_id=" + open_id,
        imageUrl: "https://qiniu.aimissu.top/images/qushuiyin_logo.png"
    }
    return myObj;
});

//获取openid
function getUserInfo() {
    uni.login({
        success: (res) => {
            requestUserInfoWithCode(res.code)
        }
    })
}

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
        case '任务中心':
            uni.navigateTo({
                url: '/pages/mine/task-center'
            })
            break;
        case '分享给好友':
            //onShareAppMessage
            break;
        case '设置':
            uni.navigateTo({
                url: '/pages/mine/setting'
            })
            break;
        case '帮助中心':
            uni.navigateTo({
                url: '/pages/mine/help-center'
            })
            break;
        default:
            break;
    }
}
</script>

<template>
    <view class="container">
        <view class="header">
            <MineHeader></MineHeader>
        </view>
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

.nav-gation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
}

.nav-top {
    height: v-bind('menu_top');
}

.nav-height {
    height: v-bind('menu_height');
    line-height: v-bind('menu_height');
    color: $uni-color-fff;
    padding-left: 20px;
    font-weight: bold;
    font-size: 35rpx;
    padding-top: v-bind('safeTop');
}

.yuyue image {
    width: 100%;
    display: block;
    height: 550rpx;
}
</style>