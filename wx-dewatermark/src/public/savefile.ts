// 保存图片
function saveImageToPhotosAlbum(imageUrl: string, successCallback: () => void, failCallback: (errMsg: string) => void) {
    uni.getSetting({
        success: (res) => {
            if (res.authSetting['scope.writePhotosAlbum'] === false) {
                // 用户之前拒绝过授权，引导用户开启授权
                uni.openSetting({
                    success: (settingRes) => {
                        if (settingRes.authSetting['scope.writePhotosAlbum']) {
                            // 用户开启了授权，调用保存图片的方法
                            saveImage(imageUrl, successCallback, failCallback);
                        } else {
                            // 用户仍然拒绝授权，执行失败回调
                            failCallback && failCallback("用户未授权访问相册");
                        }
                    },
                    fail: () => {
                        // 打开设置页面失败，执行失败回调
                        failCallback && failCallback("打开设置页面失败");
                    }
                })
            } else {
                // 用户已经授权，调用保存图片的方法
                saveImage(imageUrl, successCallback, failCallback);
            }
        },
        fail: () => {
            // 获取用户授权信息失败，执行失败回调
            failCallback && failCallback("获取用户授权信息失败");
        }
    })
}
function saveImage(imageUrl: string, successCallback: () => void, failCallback: (errMsg: string) => void) {
    uni.downloadFile({
        url: imageUrl,
        success: (res: any) => {
            uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: () => {
                    successCallback && successCallback();
                },
                fail: (res: any) => {
                    failCallback && failCallback(res.errMsg);
                }
            })
        },
        fail: (res: any) => {
            failCallback && failCallback(res.errMsg);
        }
    })
}

function savePosterPath(url: string) {
    uni.showLoading({
        title: '正在保存视频...'
    });
    //获取用户的当前设置。获取相册权限
    uni.getSetting({
        success: (res) => {
            //如果没有相册权限
            if (!res.authSetting["scope.writePhotosAlbum"]) {
                //向用户发起授权请求
                uni.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: () => {
                        downloadVidel(url)
                        //授权成功保存图片到系统相册
                        console.error('savePosterPath 授权成功');
                    },
                    //授权失败
                    fail: () => {
                        uni.hideLoading();
                        uni.showModal({
                            title: "您已拒绝获取相册权限",
                            content: "是否进入权限管理，调整授权？",
                            success: (res) => {
                                if (res.confirm) {
                                    //调起客户端小程序设置界面，返回用户设置的操作结果。（重新让用户授权）
                                    uni.openSetting({
                                        success: (res) => {
                                            console.log(res.authSetting);
                                        },
                                    });
                                } else if (res.cancel) {
                                    return uni.showToast({
                                        title: "已取消！",
                                        icon: 'none' 
                                    });
                                }
                            },
                        });
                    },
                });
            } else {
                //如果已有相册权限，直接保存图片到系统相册
                downloadVidel(url)
            }
        },
        fail: (res) => { },
    });
}
function downloadVidel(url: string) {

    uni.downloadFile({
        // @ts-ignore
        url: url,
        success: (res) => {
            console.log('tempFilePath :'+ res.tempFilePath)
            if (res.statusCode === 200) {
                uni.saveVideoToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: () => {
                        uni.hideLoading() // 请求失败后也要隐藏loading
                        uni.showToast({
                            title: '保存成功'
                        });
                    },
                    fail(error) {

                        uni.hideLoading()
                        uni.showToast({ title: '保存失败', icon: 'none' });
                        console.error('saveVideoToPhotosAlbum fail' + error);
                    },
                });
            }
        },
        fail(error) {
            uni.hideLoading()
            uni.showToast({ title: '保存失败', icon: 'none' });
            console.error('downloadFile fail' + error);

        },
        complete: (res) => { uni.hideLoading(); },
    });
}
// 保存视频
function saveVideoToPhotosAlbum(imageUrl: string, successCallback: () => void, failCallback: (errMsg: string) => void) {
    uni.getSetting({
        success: (res) => {
            if (res.authSetting['scope.writePhotosAlbum'] === false) {
                // 用户之前拒绝过授权，引导用户开启授权
                uni.openSetting({
                    success: (settingRes) => {
                        if (settingRes.authSetting['scope.writePhotosAlbum']) {
                            // 用户开启了授权，调用保存图片的方法
                            saveVideo(imageUrl, successCallback, failCallback);
                        } else {
                            // 用户仍然拒绝授权，执行失败回调
                            failCallback && failCallback("用户未授权访问相册");
                        }
                    },
                    fail: () => {
                        // 打开设置页面失败，执行失败回调
                        failCallback && failCallback("打开设置页面失败");
                    }
                })
            } else {
                // 用户已经授权，调用保存图片的方法
                saveVideo(imageUrl, successCallback, failCallback);
            }
        },
        fail: () => {
            // 获取用户授权信息失败，执行失败回调
            failCallback && failCallback("获取用户授权信息失败");
        }
    })
}
function saveVideo(imageUrl: string, successCallback: () => void, failCallback: (errMsg: string) => void) {
    uni.downloadFile({
        url: imageUrl,
        success: (res: any) => {
            uni.saveVideoToPhotosAlbum({
                filePath: res.tempFilePath,
                success: () => {
                    successCallback && successCallback();
                },
                fail: (res: any) => {
                    failCallback && failCallback(res.errMsg);
                }
            })
        },
        fail: (res: any) => {
            failCallback && failCallback(res.errMsg);
        }
    })
}
//接口
export { saveImageToPhotosAlbum, savePosterPath, saveVideoToPhotosAlbum};