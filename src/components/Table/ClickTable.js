/*
 * 单选表格
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-04-20 14:26:28
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-08-23 17:51:18
 */
import React, { Component } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

const ClickTable = WrapedComponent =>
  class ClickTable extends Component {
    state = {
      activeIndex: 0
    }
    componentWillMount () {
      const { data, clickable, expandOnly } = this.props
      const shoudInitData = (clickable || expandOnly) && Boolean(data[0])
      if (shoudInitData) {
        this.changeActive(data[0], 0)
      }
    }
    componentWillReceiveProps = (nextProps) => {
      const { data, clickable, expandOnly } = this.props
      if (!_.isEqual(data, nextProps.data)) {
        const shoudInitData = (clickable || expandOnly) && Boolean(nextProps.data[0])
        if (shoudInitData) {
          this.changeActive(nextProps.data[0], 0)
        }
      }
    }
    changeActive = (row, index) => {
      const { clickable, expandOnly, handleRowClick } = this.props
      if (!(clickable || expandOnly)) return

      this.setState({
        activeIndex: index
      })
      handleRowClick && handleRowClick(row, index)
    }
    render () {
      const { clickable, handleRowClick, className, ...others } = this.props
      const { expandOnly } = others
      const { activeIndex } = this.state
      const classes = classNames({
        click: clickable
      }, className)
      return <WrapedComponent
        {...others}
        className={classes}
        activeIndex={(clickable || expandOnly) ? activeIndex : false}
        handleRowClick={this.changeActive}/>
    }
  }
export default ClickTable
