export const readLoginStorage = () => (
  JSON.parse(localStorage.getItem('login')) || false
)

export const saveLoginStorage = (account) => {
  localStorage.setItem('login', JSON.stringify(account) )
}

export const removeLoginStorage = () => {
  localStorage.removeItem('login');
}