// moment-timezone
import moment from 'moment-timezone';
// endmoment-timezone

const filters = {
  // moment-timezone
  // 格式化时间
  formateDate: (value, string) => {
    return moment(value).format(string);
  },
  // endmoment-timezone
  // 倒计时
  LowDate: value => {
    let h = 0;
    let m = 0;
    let s = 0;
    if (value > 3600000) {
      h = parseInt(value / 3600000);
      m = parseInt((value - h * 3600000) / 60000);
      s = parseInt((value - h * 3600000 - m * 60000) / 1000);
    } else {
      m = parseInt(value / 60000);
      s = parseInt((value - m * 60000) / 1000);
    }
    if (h < 10) {
      h = '0' + h;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    if (value > 3600000) {
      return `${h}:${m}:${s}`;
    } else {
      return `${m}:${s}`;
    }
  }
};

export default filters;
