<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("111App Launch");

  let menu_but = uni.getStorageSync('MenuButton')
  if (!menu_but) {
    //获取胶囊按钮的坐标
    const res = uni.getMenuButtonBoundingClientRect()
    uni.setStorageSync('MenuButton', res)

    const temInfo = uni.getSystemInfoSync()
    let statusBarHeight = temInfo.statusBarHeight ?? 0
    uni.setStorageSync('SafeAreaInsetTop', (statusBarHeight - 20))

  }
  console.log(menu_but);




  // uni.getSystemInfo({
  //     success: (res) => {
  //       const query = uni.createSelectorQuery()
  //       query.select('.uni-icon-uniE904').boundingClientRect()
  //       query.exec((rects) => {
  //         const rightButtonRect = rects[0]
  //         const rightButtonTop = res.windowHeight - rightButtonRect.bottom
  //         const rightButtonRight = res.windowWidth - rightButtonRect.right
  //         console.log(`Right button top: ${rightButtonTop}px`)
  //         console.log(`Right button right: ${rightButtonRight}px`)
  //       })
  //     }
  //   })

});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
html,
body,
#app{
  widows: 100%;
  height: 100%;
}

</style>
