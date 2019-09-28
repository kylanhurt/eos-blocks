// @flow
import React from 'react'

export class RecentBlocksComponent extends React.Component {

  componentDidMount (){
    const { fetchChainInfo } = this.props
    fetchChainInfo()
  }

  render () {
    return (
      <span>Hello</span>
    )
  }
}