export function formatDate(inputDate: Date | string) {
  const date = new Date(inputDate);
  const formattedDate = new Date(inputDate).toLocaleString('ko');
  console.log('formattedDate.length', formattedDate.length);
  if (formattedDate.length === 23) return `${formattedDate.slice(0, 20)}`;
  else if (formattedDate.length === 24) return `${formattedDate.slice(0, 21)}`;
}
