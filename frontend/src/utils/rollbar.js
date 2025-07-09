import Rollbar from 'rollbar'

const rollbar = new Rollbar({
  accessToken: '94dc6736d4ebe6a32d5d855690373436',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'development',
})

export default rollbar
