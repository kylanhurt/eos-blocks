// @flow

const initialState = {
  en: {},
  es: {}
};

const locale  = (state = initialState, action) => {
  switch (action.type) {
    case 'LOCALE':
      return action.data
    default:
      return state
  }
}

export const localeReducer = {
  locale
}