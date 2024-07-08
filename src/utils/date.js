// will fix timezone issue
export function getLocalDate(dateString) {
  const unconvertedDate = new Date(dateString);
  const convertedDate = new Date(
    unconvertedDate.valueOf() + unconvertedDate.getTimezoneOffset() * 60 * 1000
  );

  return convertedDate;
}
