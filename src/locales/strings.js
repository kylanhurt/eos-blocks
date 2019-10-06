// @flow

import DeviceInfo from 'react-native-device-info'

import en from './en_US'
import es from './strings/es.json'

const allLocales = { en }

const strings: typeof en = { ...en }
const out = { strings }

selectLocale(DeviceInfo.getDeviceLocale())

function mergeStrings (primary: Object, secondary: Object) {
  for (const str in secondary) {
    if (secondary.hasOwnProperty(str)) {
      if (secondary[str]) {
        primary[str] = secondary[str]
      }
    }
  }
}

// Locale formats can be in the form 'en', 'en-US', 'en_US', or 'enUS'
export function selectLocale (locale: string = 'en'): boolean {
  // Break up local into language and region
  const normalizedLocale = locale
    .replace('-', '')
    .replace('-', '')
    .replace('_', '')

  let found = false
  const lang = normalizedLocale.slice(0, 2)

  if (locale === 'en') return true

  // Find pure language match first (ie. find 'es' when 'esMX' is chosen)
  if (allLocales[lang] !== undefined) {
    found = true
    mergeStrings(out.strings, allLocales[lang])
  }

  // Find an exact match
  if (allLocales[normalizedLocale] !== undefined) {
    found = true
    mergeStrings(out.strings, allLocales[normalizedLocale])
  }

  return found
}

export default out
