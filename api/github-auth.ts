import axios from 'axios'

export default async function handler(req, res) {
  const { code } = req.query
  const clientId = 'Ov23liu77XGEEac2QoSR'
  const clientSecret = 'ceb925f1aa234c4e2fd5513deb73ad6aa87b5d32'

  if (req.method === 'GET' && code) {
    try {
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
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
        `https://data-guard-five.vercel.app/?access_token=${response.data.access_token}`,
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch access token' }, error)
    }
  } else {
    res.status(400).json({ error: 'Invalid request' })
  }
}
