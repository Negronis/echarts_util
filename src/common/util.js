import {
    Message
} from 'iview'
let Util = {
    Clear() {
        Message.destroy()
    },
    Load(msg, dur) {
        this.Clear()
        Message.loading({
            content: msg || '正在加载，请稍后',
            duration: dur || 99999
        })
    },
    Suc(msg, dur, fn) {
        this.Clear()
        Message.success({
            content: msg || '请求成功',
            duration: dur || 2,
            onclose: fn && fn()
        })
    },
    Fail(msg, dur) {
        this.Clear()
        Message.error({
            content: msg || '请求失败',
            duration: dur || 2
        })
    },
    Warn(msg, dur) {
        this.Clear()
        Message.warning({
            content: msg || '注意',
            duration: dur || 2
        })
    },
    formatDate(date, type) {
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
        if (String(min).length == 1) {
            min = "0" + min
        }
        let sec = date.getSeconds()
        if (String(sec).length == 1) {
            sec = "0" + sec
        }
        if (type == 'times') {
            return `${year}/${month}/${day} ${hour}:${min}:${sec}`;
        }
        if (type) {
            return `${year}-${month}-${day}`
        }
        return `${year}年${month}月${day}日 ${hour}时${min}分${sec}秒`;
    },
    scheduleRefresh(tenfn , hourfn) {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();

        // 计算下一个10分钟的时间
        let nextTenMinutes = 10 - (currentMinutes % 10);
        if (nextTenMinutes === 10) {
            nextTenMinutes = 0;
        }
        const timeUntilNextTenMinutes = (nextTenMinutes * 60 - currentSeconds) * 1000;

        // 计算下一个整点的时间
        const timeUntilNextHour = (60 - currentMinutes - (currentSeconds > 0 ? 1 : 0)) * 60 * 1000;

        // 设置定时器在下一个10分钟时刷新
        setTimeout(() => {
            console.log('Refresh at 10 minutes mark');
            tenfn();
            // 设置定时器在下一个整点时刷新
            setTimeout(() => {
                console.log('Refresh at hour mark');
                hourfn();
            }, timeUntilNextHour);
        }, timeUntilNextTenMinutes);
    }
}

export default Util