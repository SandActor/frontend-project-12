module.exports = {
  webServer: {
    command: 'npx start-server -s ./frontend -p 5002',
    url: 'http://localhost:5002',
    timeout: 60000,
    reuseExistingServer: true,
  },
}
