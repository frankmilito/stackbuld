export function paginate(array: any, page: number, itemsPerPage: number) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
}

export const formatDate = (timestamp: string) => {
  const dateObject = new Date(timestamp);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObject.getUTCMinutes()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateTime;
};

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text; // No need to truncate
  } else {
    return text.slice(3, maxLength) + "..."; // Truncate and add ellipsis
  }
}
