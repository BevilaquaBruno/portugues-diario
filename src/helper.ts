export function returnDbDateFormatted(date: Date) {
  return date.toISOString().split('T')[0];
}