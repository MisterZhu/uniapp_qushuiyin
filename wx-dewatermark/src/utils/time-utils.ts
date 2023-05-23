
//判断date1和date2是否是同一天
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
//判断date是否是昨天
export function isYesterday(date: Date): boolean {
  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  return isSameDay(date, yesterday);
}

//判断date是否是今天
export function isToday(date: Date): boolean {
  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return isSameDay(date, yesterday);
}

//判断date是否是今天
export function isTodayStr(dateStr: string): boolean {
  // 将 date 字段转换为日期对象 '2023-04-05T19:42:03+08:00'
  const date = new Date(dateStr);
  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return isSameDay(date, yesterday);
}