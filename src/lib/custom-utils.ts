export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

export function formatItemCount(views: number, countableItem: string): string {
  const formattedNumber = formatNumber(views);
  return `${formattedNumber} ${views === 1 ? countableItem : `${countableItem}s`}`;
}

export function parseServerActionResponse<T>(response: T): T {
  return JSON.parse(JSON.stringify(response));
}

export function getFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase();
}
