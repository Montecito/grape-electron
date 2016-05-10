import minimatch from 'minimatch'

var os = require('os')

export function isWindows() {
  return os.type() === 'Windows_NT'
}

export function isOSX() {
  return os.type() === 'Darwin'
}

export function osType() {
  if (isWindows()) return 'win'
  if (isOSX()) return 'osx'
}

export function isNotificationSupported() {
  return (
      isWindows() &&
        parseInt(os.release().split('.')[0]) < 10
  ) ? false : true
}

function getHost(url) {
  const withoutProtocol = url.split('//')[1]
  if (withoutProtocol) return withoutProtocol.split('/')[0]
  return null
}

export function isExternalUrl(url, current) {
  if (!url || !current) return true

  const newHost = getHost(url)
  const currentHost = getHost(current)
  if (!newHost) return true
  return !minimatch(newHost, `**${currentHost}`)
}
