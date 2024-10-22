import axios from 'axios'
import config from '../config'

export default async function handler(req, res) {
  const { code } = req.query
  const clientId = config.GITHUB_CLIENT_ID
  const clientSecret = config.GITHUB_SECRET

  if (req.method === 'GET' && code) {
    try {
      const response = await axios.post(
        `${config.GITHUB_BASE_URL}/login/oauth/access_token`,
        null,
        {
          params: {
            client_id: clientId,
            client_secret: clientSecret,
            code,
          },
          headers: {
            Accept: 'application/json',
          },
        },
      )

      res.redirect(
        `${req.headers.origin}/?access_token=${response.data.access_token}`,
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch access token' }, error)
    }
  } else {
    res.status(400).json({ error: 'Invalid request' })
  }
}
