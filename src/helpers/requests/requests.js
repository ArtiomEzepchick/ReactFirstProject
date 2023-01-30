export const urls = {
    posts: 'http://localhost:3001/posts',
    users: 'http://localhost:3001/users'
}

export const getUser = async (field, value) => await fetch(`http://localhost:3001/users?${field + "=" + value}`)