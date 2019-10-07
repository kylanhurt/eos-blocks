// @flow

import React, { PureComponent } from 'react'
import { Collapse } from 'reactstrap'
import DownIcon from 'mdi-react/ChevronDownIcon'

const EnLng = () => (
  <span className="topbar__language-btn-title">
    <span>EN</span>
  </span>
)

const EsLng = () => (
  <span className="topbar__language-btn-title">
    <span>ES</span>
  </span>
)

type TopBarLanguageState = {
  collapse: boolean,
  mainButtonContent: any
}

type TopBarLanguageProps = {

}

class TopbarLanguage extends PureComponent<TopBarLanguageProps, TopBarLanguageState> {
  constructor () {
    super()
    const searchParams = new URLSearchParams(window.location.search)
    const currentLang = searchParams.get('lang') || 'en'
    const chosen = {
      en: <EnLng />,
      es: <EsLng />
    }
    this.state = {
      collapse: false,
      mainButtonContent: chosen[currentLang]
    }
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }))
  }

  changeLanguage = (lng: string) => {
    const currentUrl = window.location.href
    let newUrl = currentUrl
    if (currentUrl.includes('lang=')) {
      const langStartIndex = currentUrl.indexOf('lang=')
      const langEndIndex = langStartIndex + 7
      newUrl.slice(langStartIndex, 7)
      const beforeLang = currentUrl.substring(0, langStartIndex)
      const afterLang = currentUrl.substring(langEndIndex)
      newUrl = `${beforeLang}lang=${lng}${afterLang}`
    } else {
      if (currentUrl.includes('?')) {
        if (currentUrl.includes('&')) {
          newUrl = `${newUrl}&lang=${lng}`
        } else {
          newUrl = `${newUrl}lang=${lng}`
        }
      } else {
        newUrl = `${newUrl}?lang=${lng}`
      }
    }

    switch (lng) {
      case 'en':
        window.location.assign(newUrl)
        this.setState({ mainButtonContent: <EnLng /> })
        break
      case 'es':
        window.location.assign(newUrl)
        this.setState({ mainButtonContent: <EsLng /> })
        break
      default:
        break
    }
  }

  render () {
    const { mainButtonContent, collapse } = this.state

    return (
      <div className="topbar__collapse topbar__collapse--language">
        <button className="topbar__btn" type="button" onClick={this.toggle}>
          {mainButtonContent}
          <DownIcon className="topbar__icon" />
        </button>
        {collapse && <button className="topbar__back" type="button" onClick={this.toggle} />}
        <Collapse
          isOpen={collapse}
          className="topbar__collapse-content topbar__collapse-content--language"
        >
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage('en')}
          >
            <EnLng />
          </button>
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage('es')}
          >
            <EsLng />
          </button>
        </Collapse>
      </div>
    )
  }
}

export default TopbarLanguage
