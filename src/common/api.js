const URL = "https://qhdgryytest.hebzhhd.com/api/"
// const URL = "https://172.100.40.39:4343/api/"
import axios from 'axios'
import store from '@/store'



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
let typeList = [{
    "zsr": "总收入",
    "glzb1": "各类收入占比1",
    "glzb2": "各类收入占比2",
    "sszyrs": "实时在院人数",
    "ssmzrs": "实时门诊人数",
    "mzrcglzb": "门诊人次类别占比",
    "ryrszb": "入院人数占比",
    "ddds": "ddds",
    "ghzs": "挂号总数",
    "wjzclsj": "危机值处理时间",
    "mzzs": '实时门诊人数',
    "sscyrs":"实时出院人数",
    "ssryrs":"实时入院人数",
    // 收费处
    "ghslglzb1": "挂号数量各类占比",
    "ghslglzb2": "挂号数量各类占比2",
    "mzjsglzb": "门诊结算数量和各类别占比",
    "zyjsglzb": "住院结算数量和各类别占比",
    "mzzyxj": "门诊住院现金",
    "tsyw": "特殊业务",
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
    "上月": {
        start_date: lastMonth(),
        end_date: lastMonth(true)
    },
    "本年": {
        start_date: formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), 'req') + ' 00:00:00',
        end_date: formatDate(new Date, 'req') + " 00:00:00"
    }
}
let RequestFunc = (type) => {
    let dateType = store.getters.getDateType
    let {
        start_date,
        end_date
    } = dateTypeToDate[dateType]
    let tm = formatDate(new Date)
    store.commit("setReqTimer", tm)
    return axios.get(URL + "qhdgryy/Datascreen/getScreenData?type=" + type + '&start_date=' + (start_date || "") + "&end_date=" + (end_date || ""))
}

let login = (account, password) => {
    return axios.get(URL + "qhdgryy/Datascreen/screenLogin" + '&account=' + (account || "") + "&password=" + (password || ""))
}

let getQrCode = () => {
    return axios.get(URL + 'qhdgryy/datascreen/wxQrcode')
}

let checkCache = (cache_key) => {
    return axios.post(URL + 'qhdgryy/datascreen/checkCache?cache_key=' + cache_key)
}

export {
    RequestFunc,
    login,
    getQrCode,
    checkCache
}