export const getDateTime = (timeStamp: number) => {
  const now = new Date();
  const date = new Date(timeStamp * 1000);
  const diffInMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) {
    if (hours === 0) {
      if (minutes === 0) {
        return `${seconds}s ago`;
      } else {
        return `${minutes}m ago`;
      }
    } else {
      return `${hours}h ago`;
    }
  } else if (days <= 7) {
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString(); // Return only date string
  }
};
