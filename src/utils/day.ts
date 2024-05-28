import dayjs, { extend, locale } from 'dayjs';
import relaviteTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';

extend(utc);
extend(timezone);
extend(relaviteTime);
dayjs.tz.setDefault('Asia/Seoul');
locale('ko');

export function formateAgo(time: string) {
  return dayjs(time).tz().fromNow();
}

export function formateFullTime(time: string) {
  return dayjs(time).tz().format('YYYY-MM-DD HH:mm');
}

export function createTime() {
  return dayjs().format();
}
