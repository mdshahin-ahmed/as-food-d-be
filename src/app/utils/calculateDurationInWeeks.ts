const calculateDurationInWeeks = (start: string, end: string) => {
  const newStartDate = new Date(start)
  const newEndDate = new Date(end)
  const durationMilliSeconds = newEndDate.getTime() - newStartDate.getTime()
  const days = durationMilliSeconds / (1000 * 60 * 60 * 24)
  const weeks = Math.ceil(days / 7)

  return weeks
}

export default calculateDurationInWeeks
