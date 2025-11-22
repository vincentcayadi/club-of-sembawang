/**
 * Formats a date/time in a readable format
 */
export const formatDateTime = (timestamp: string | Date): string => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

/**
 * Formats just the date
 */
export const formatDate = (timestamp: string | Date): string => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date)
}
