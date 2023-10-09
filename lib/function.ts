export function paginate(array: any, page: number, itemsPerPage: number) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
}

export const formatDate = (timestamp: string) => {
  const originalDate = new Date(timestamp);
  const formattedDate = originalDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  // Format time to 'HH:MM' format
  const formattedTime = originalDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  });

  const formattedDateTime = `${formattedDate} at ${formattedTime}`;
  return formattedDateTime;
};
