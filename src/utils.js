
/*
Description: Helper functions for TV show information.
*/

// Remove HTML tags from show summaries
export function cleanSummary(summary) {
  if (!summary) {
    return 'Not available'
  }

  const doc = new DOMParser().parseFromString(summary, 'text/html')
  return doc.body.textContent.trim() || 'Not available'
}

// Format the last updated date
export function formatDate(timestamp) {
  if (!timestamp) {
    return 'Not available'
  }

  return new Date(timestamp * 1000).toLocaleString()
}
