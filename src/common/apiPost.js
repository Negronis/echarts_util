const URL = "https://qhdgryy.hebzhhd.com/api/"
// qhdgryytest
// const URL = "https://172.100.40.39:4343/api/"
import axios from 'axios'
import store from '@/store'
import qs from 'qs'
let config = {
    baseURL: URL,
    withCredentials: false // 允许携带cookie
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        config['data'] = qs.stringify(config['data'])
        config['headers']['Token'] = localStorage.getItem("tk")
        // config['headers']['Token'] = "2c26bdd6-12e5-4b76-b646-4af82a75e5a1"
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);


// 日期标准化
function formatDate(date, type) {
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
        month = "0" + month;
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
        day = "0" + day;
    }
    let hour = date.getHours()
    if (hour.length == 1) {
        hour = "0" + hour
    }
    let min = date.getMinutes()
    if (min.length == 1) {
        min = "0" + min
    }
    let sec = date.getSeconds()
    if (sec.length == 1) {
        sec = "0" + sec
    }
    if (type) {
        return `${year}-${month}-${day}`
    }
    return `${year}年${month}月${day}日 ${hour}时${min}分${sec}秒`;
}
//获取上周
function dateRange() {
    // 获取当前日期对象
    const currentDate = new Date((new Date()).getTime() - 3600 * 24 * 1000 * 7);
    const dayOfWeek = currentDate.getDay();
    const diffToFirstDay = dayOfWeek > 0 ? -(dayOfWeek - 1) : -7;
    // 获取第一天的日期对象
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() + diffToFirstDay);
    // 获取最后一天的日期对象
    const lastDayOfWeek = new Date(currentDate);
    lastDayOfWeek.setDate(currentDate.getDate() + (7 - dayOfWeek) + 1);
    // 将日期对象格式化成字符串
    const firstDayOfWeekStr = firstDayOfWeek.toISOString().split('T')[0];
    const lastDayOfWeekStr = lastDayOfWeek.toISOString().split('T')[0];
    return {
        start_date: firstDayOfWeekStr + " 00:00:00",
        end_date: lastDayOfWeekStr + " 00:00:00"
    }
}
//获取上个月
let lastMonth = (isToday = false) => {
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();
    let h = now.getHours();
    let min = now.getMinutes();
    let s = now.getSeconds();
    m = m >= 10 ? m : '0' + m
    d = d >= 10 ? d : '0' + d
    h = h >= 10 ? h : '0' + h
    min = min >= 10 ? min : '0' + min
    s = s >= 10 ? s : '0' + s
    let today = `${y}-${m}-${d} ${h}:${min}:${s}`;
    if (isToday) {
        return today;
    } else {
        let stampTime = new Date(today).getTime() - (30 * 24 * 3600 * 1000)
        let prveStamp = new Date(stampTime);
        let prveMonth = prveStamp.getMonth() + 1;
        let prveDate = prveStamp.getDate();
        let year = prveStamp.getFullYear();
        prveMonth = prveMonth >= 10 ? prveMonth : '0' + prveMonth
        prveDate = prveDate >= 10 ? prveDate : '0' + prveDate
        return `${year}-${prveMonth}-${prveDate} 00:00:00`
    }
} 
//本季度
function bjd() {
    let now = new Date(); //当前日期 
    let nowYear = now.getFullYear(); //当前年 
    let nowDay = now.getDate(); //当前日 
    let nowMonth = now.getMonth(); //当前月 
    let jd = Math.ceil((nowMonth + 1) / 3)
    let startTime = new Date(nowYear, (jd - 1) * 3, 1);
    let endTime = new Date(nowYear, jd * 3, 0);
    let r = {
        start_date: formatDate(startTime, 'c'),
        end_date: formatDate(endTime, 'd')
    } 
    return r
}
let typeList = [{
    "zsr": "总收入",
    "glzb1": "各类收入占比1 -> 住院 + 健康体检 + 门诊",
    "glzb2": "各类收入占比2 -> 医务性收入 + 药品收入 + 耗材收入",
    "ryrszb": "入院人数占比",
    "mzrcglzb": "门诊人次类别占比",
    "sszyrs": "实时在院人数",
    "ssmzrs": "实时门诊人数",
    "ddds": "ddds",
    "ghzs": "挂号总数",
    "wjzclsj": "危机值处理时间",
    "mzzs": '实时门诊人数',
    // 收费处
    "ghslglzb1": "挂号数量各类占比",
    "ghslglzb2": "挂号数量各类占比2",
    "mzjsglzb": "门诊结算数量和各类别占比",
    "zyjsglzb": "住院结算数量和各类别占比",
    "mzzyxj": "门诊住院现金",
    "tsyw": "特殊业务",
    "hlyy": "绩效考核-合理用药 -> 基本药物采购金额占比 + 重点监控药品占比 + 重点监控耗材收入占比 + 总采购金额",
    "szjg": "绩效考核-收支结构 -> 总费用 + 总医疗服务占比 + 医务性收入",
    "ylfw": "绩效考核-医疗服务-平均住院日",
    "fykz": "绩效考核-费用控制 ->  总均次药品费用增幅 +  总均次费用增幅 + 门诊均次费用增幅",
    "fykzmz": "绩效考核 - 门诊均次费用增幅 - 弃用",
    'dpszjg': "绩效考核-收支结构-2屏 -> 科室：医务性占比 + 医疗服务占比 + 总费用 + 科室名", 
    "sssj":"手术数据",
    //最新大屏用的数据：
    // ---- 左侧数据 ---- //
    "glzb1": "各类收入占比1 -> 住院 + 健康体检 + 门诊",
    "ryrszbV3": "入院人数占比 -> 新版专用",
    "mzrcglzbV3": "门诊人次类别占比 -> 新版",
    "sszyrs": "实时在院人数",
    "ssmzrs": "实时门诊人数",
    // ---- 中间数据 ---- //
    "fykzV3":"费用控制",
    "hlyycgjeV3":"合理用药- 基本药物采购金额占比",
    "hlyyzdjkypV3":"合理用药 - 重点监控药品",
    "hlyygzhcjeV3":"合理用药 - 高值耗材金额占比",
    "wjzclsjV3":"危机处理时间（本月数据分布）",
    "sszbV3":"手术占比",
    // ---- 右侧数据 ---- //
    "szjgV3":"新大屏专用的收支结构-》计算医疗服务占比",
    "zsrV3":"总收入-》新版本按月份",
    "dip":"DIP数据->包含科室结余 + 病种负结余 + 病种正结余" ,
    "cmiYear":"CMI年数据"
}]
let dateTypeToDate = {
    "当日": {
        start_date: formatDate(new Date, 'req') + " 00:00:00",
        end_date: formatDate(new Date((new Date).getTime() + 3600 * 24 * 1000), 'req') + " 00:00:00"
    },
    "昨日": {
        start_date: formatDate(new Date((new Date).getTime() - 3600 * 24 * 1000), 'req') + " 00:00:00",
        end_date: formatDate(new Date, 'req') + " 00:00:00"
    },
    "本周": {
        start_date: dateRange()['start_date'],
        end_date: dateRange()['end_date']
    },
    "本季": {
        start_date: bjd()['start_date'] + " 00:00:00",
        end_date: bjd()['end_date'] + " 00:00:00"
    },
    "上月": {
        start_date: lastMonth(),
        end_date: lastMonth(true)
    },
    "本年": {
        start_date: formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), 'req') + ' 00:00:00',
        end_date: formatDate(new Date, 'req') + " 00:00:00"
    }
}
let RequestFunc = (type, st, ed) => {
    let dateType = store.getters.getDateType
    let {
        start_date,
        end_date
    } = dateTypeToDate[dateType]
    let tm = formatDate(new Date)
    store.commit("setReqTimer", tm)
    if (store.state.dtDateSx.indexOf(type) !== -1) {
        return _axios.post(URL + "qhdgryy/Datascreen/getScreenData", {
            type,
            start_date: dateTypeToDate['当日']['start_date'],
            end_date: dateTypeToDate['当日']['end_date']
        })
    }
    return _axios.post(URL + "qhdgryy/Datascreen/getScreenData", {
        type,
        start_date: st ? st : start_date,
        end_date: ed ? ed : end_date
    })
    return axios.get(URL + "qhdgryy/Datascreen/getScreenData?type=" + type + '&start_date=' + (start_date || "") + "&end_date=" + (end_date || ""))
}

let login = (account, password) => {
    return _axios.post(URL + "qhdgryy/Datascreen/screenLogin", {
        account,
        password
    })
    return axios.get(URL + "qhdgryy/Datascreen/screenLogin" + '&account=' + (account || "") + "&password=" + (password || ""))
}


let getQrCode = () => {
    return axios.post(URL + 'qhdgryy/datascreen/wxQrcode')
    return axios.get(URL + 'qhdgryy/datascreen/wxQrcode')
}

let checkCache = (cache_key) => {
    return axios.post(URL + 'qhdgryy/datascreen/checkCache', {
        cache_key
    })
}
export {
    RequestFunc,
    login,
    getQrCode,
    checkCache
}