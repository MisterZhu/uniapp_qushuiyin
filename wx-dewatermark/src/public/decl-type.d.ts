//-------------------类型声明文件：d.ts文件--------------------


// 首页第一项数据：数据解析
export interface Analysis {
    title: string;
    bigFile: false;
    cover: string;
    down:  string;
    download_image: string;
    images: string;
    url: string;
    video:string;
    origin_url:string;
}
// 用户信息数据解析
export interface UserInfoModel {
    avater: string;
    created_at: string;
    id: int;
    open_id: string;
    password: string
    query_count: int;
    role: int;
    telephone: string
    updated_at: string;
    user_id: string;
    username: string;
    sigin_count: int;
    sigin_reward: int;
    sigin_time: string;
}

// 多选数据模型
export interface MultipleSelect {
    url: string;
    selectState: boolean;
}

// item数据模型
export interface MineItemModel {
    left_img: string;
    left_title: string;
    right_img: string;
    right_title: string;
    line_shou: boolean;
    head_shou: boolean;
    share_shou: boolean;

}