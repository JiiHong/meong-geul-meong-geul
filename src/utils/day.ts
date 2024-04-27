import dayjs, { extend, locale } from 'dayjs';
import relaviteTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

locale('ko');
extend(relaviteTime);

export function formateAgo(time: string) {
  return dayjs(time).fromNow();
}

export function formateFullTime(time: string) {
  return dayjs(time).format('YYYY-MM-DD HH:mm');
}
