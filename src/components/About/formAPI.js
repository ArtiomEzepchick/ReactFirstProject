export function fetchForm(usersData) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(usersData), 500)
  )
}