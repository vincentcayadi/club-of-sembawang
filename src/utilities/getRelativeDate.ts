/**
 * Returns a human-readable relative time string
 * e.g., "2 hours ago", "3 days ago"
 */
export const getRelativeDate = (timestamp: string | Date): string => {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diff = now - then

  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = day * 365

  if (diff < minute) return 'just now'
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`
  if (diff < day) return `${Math.floor(diff / hour)}h ago`
  if (diff < week) return `${Math.floor(diff / day)}d ago`
  if (diff < month) return `${Math.floor(diff / week)}w ago`
  if (diff < year) return `${Math.floor(diff / month)}mo ago`
  return `${Math.floor(diff / year)}y ago`
}
