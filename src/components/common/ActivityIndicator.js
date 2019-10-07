import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../../scss/app.scss'

export class ActivityIndicator extends Component {
  render () {
    return (
      <div className="load__icon-wrap">
        <svg className="load__icon">
          <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </svg>
      </div>
    )
  }
}
