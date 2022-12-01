export const fetchForm = (fields) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fields), 500)
  )
}