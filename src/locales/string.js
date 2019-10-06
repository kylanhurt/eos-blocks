// @flow

import { en } from './strings/en.js'
import { es } from './strings/es.js'

const url = new URL(window.location.href)
const lang = url.searchParams.get('lang')

window.EOS_BLOCK_EXPLORER_LOCALE = lang || 'en'

const allLocales = { en, es }
export const strings = allLocales[window.EOS_BLOCK_EXPLORER_LOCALE]
