export function dateToString(reportDate: Date) {
  let date = new Date(reportDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
