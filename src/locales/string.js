// @flow

import { en } from './strings/en.js'
import { es } from './strings/es.js'
if (typeof window === 'undefined') {
  global.window = {}
}
// window.location breaks upon testing in node
const href = window.location ? window.location.href : 'http://myDomain.com/fake'
const url = new URL(href)
const lang = url.searchParams.get('lang')

window.EOS_BLOCK_EXPLORER_LOCALE = lang || 'en'

const allLocales = { en, es }
export const strings = allLocales[window.EOS_BLOCK_EXPLORER_LOCALE]
