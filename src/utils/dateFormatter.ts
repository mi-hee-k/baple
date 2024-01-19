export function formatDate(inputDate: Date | string) {
  const date = new Date(inputDate);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  return `${year}. ${month}. ${day} ${hours}:${minutes}`;
}
