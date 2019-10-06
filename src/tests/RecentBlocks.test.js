/* globals jest describe it expect */
// @flow

import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import { RecentBlocksComponent } from '../components/RecentBlocks/RecentBlocks.jsx'
import { RECENT_BLOCKS_PROPS } from './RecentBlocksProps'

describe('Recent blocks render', () => {
  it('should render with pre-defined props', () => {
    const renderer = new ShallowRenderer()
    const element = <RecentBlocksComponent {...RECENT_BLOCKS_PROPS} />
    expect(renderer.render(element)).toMatchSnapshot()
  })
})
