export const formatDateTime = (timestamp: string): string => {
  const now = new Date()
  let date = now
  if (timestamp) date = new Date(timestamp)

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', // Full month name (e.g., "March")
    day: 'numeric', // Day without leading zero
  })
}
