export const useHttp = () => {
  const token = sessionStorage.getItem('blogToken')
  const request = async (
    url,
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : null }
  ) => {
    const response = await fetch(url, { method, body, headers })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error(`${JSON.stringify(data.errors)}`)
      }
      throw new Error(`Failed to load resource: the server responded with a status of ${response.status}`)
    }
    return data
  }

  return { request }
}
