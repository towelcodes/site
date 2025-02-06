export function getRelativeTime(unixTimestamp) {
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ];

  const now = Math.floor(Date.now() / 1000);
  let diff = unixTimestamp - now;

  for (const [unit, seconds] of units) {
    if (Math.abs(diff) >= seconds || unit === 'second') {
      const value = Math.round(diff / seconds);
      return new Intl.RelativeTimeFormat("en", { numeric: 'auto' }).format(value, unit);
    }
  }
}
