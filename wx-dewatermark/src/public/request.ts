//请求地址
// const baseUrl = 'https://aimissu.top/api/v2'
const baseUrl = 'http://127.0.0.1:8080/api/v2'

//獲取token
function getToken():string{
    let token = "Bearer " + uni.getStorageSync('local_token')
    return token
}

//请求默认带loading
function request(
    url: string,
    method: 'GET' | 'POST',
    data: string | object | ArrayBuffer
) {
    return new Promise((resolve, reject)=>{
        uni.showLoading({
            mask:true,
            title:"加载中..."
        })
        uni.request({
            url: baseUrl + url,
            method,
            data,
            header:{
                Authorization:getToken(),
                'Content-Type': 'application/x-www-form-urlencoded' // 设置请求参数格式为表单数据格式
            },
            success:(res:any) => {
                const data = res.data
                if (data.code == 200) {
                    resolve(data)
                }else if (data.code == 401) {
                    //无权访问
                    resolve(data)
                }else if (data.code == 500) {
                    //服务器发生错误
                    uni.showToast({title:'服务器错误',icon:'none',duration:1000})
                    resolve(data)
                }else if (data.code == 202) {
                    //服务器发生错误
                    uni.showToast({title:'给你提示',icon:'none',duration:1000})
                    resolve(data)
                }else{
                    resolve(data)
                }
            },
            fail:(res:any) => {
                uni.showToast({title:'请求失败',icon:'none',duration:1000})
            },
            complete(result) {
                uni.hideLoading()
            },
        })
    })
}
//请求不带loading
function requestNoLoading(
    url: string,
    method: 'GET' | 'POST',
    data: string | object | ArrayBuffer
) {
    return new Promise((resolve, reject)=>{
        uni.request({
            url: baseUrl + url,
            method,
            data,
            header:{
                Authorization:getToken(),
                'Content-Type': 'application/x-www-form-urlencoded' // 设置请求参数格式为表单数据格式
            },
            success:(res:any) => {
                const data = res.data
                if (data.code == 200) {
                    resolve(data)
                }else if (data.code == 401) {
                    //无权访问
                    resolve(data)
                }else if (data.code == 500) {
                    //服务器发生错误
                    uni.showToast({title:'服务器错误',icon:'none',duration:1000})
                    resolve(data)
                }else if (data.code == 202) {
                    //服务器发生错误
                    uni.showToast({title:'给你提示',icon:'none',duration:1000})
                    resolve(data)
                }else{
                    resolve(data)
                }
            },
            fail:(res:any) => {
                uni.showToast({title:'请求失败',icon:'none',duration:1000})
            },
        })
    })
}
//接口
const RequestApi = {
    UserLogin:(data:any)=>request('/user/login','POST',data),
    HomeAnalysis:(data:any)=>request('/user/analysis','POST',data),
    AnalyHistory:(data:any)=>request('/user/analysisRecord','POST',data),
    SignIn:(data:any)=>request('/user/signIn','POST',data)
}
export {RequestApi};
