import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SidebarCategory from './SidebarCategory'
import { strings } from '../../../locales/string'

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  hideSidebar = () => {
    const { onClick } = this.props
    onClick()
  }

  render() {
    const { changeToDark, changeToLight } = this.props
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarCategory title="Layout" icon="layers">
            <button type="button" className="sidebar__link" onClick={changeToLight}>
              <p className="sidebar__link-title">{strings.sidebar_light_theme}</p>
            </button>
            <button type="button" className="sidebar__link" onClick={changeToDark}>
              <p className="sidebar__link-title">{strings.sidebar_dark_theme}</p>
            </button>
          </SidebarCategory>
        </ul>
      </div>
    )
  }
}

export default SidebarContent
