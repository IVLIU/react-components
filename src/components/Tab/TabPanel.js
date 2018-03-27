import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class TabPanel extends Component {
  state = {
    header: '',
    hasShown: false // 控制未激活时，不渲染子内容
  }
  componentWillMount () {
    const { headerkey, header, keys, addChildPanel, active } = this.props
    addChildPanel &&
      addChildPanel({
        header,
        key: keys,
        context: this
      })
    this.setState({
      headerkey,
      hasShown: active
    })
  }
  componentWillReceiveProps (nextProps) {
    const { headerkey, header, keys, addChildPanel, active } = nextProps
    if (headerkey !== this.state.headerkey) {
      addChildPanel &&
        addChildPanel({
          header,
          headerkey,
          key: keys,
          context: this
        })
      this.setState({
        headerkey
      })
    }
    if (active && !this.state.hasShown) {
      this.setState({
        hasShown: true
      })
    }
  }
  render () {
    const { children, active, className, defaultLoad } = this.props
    const { hasShown } = this.state
    const classes = classNames('tab-panel', className, {
      active
    })
    return (
      <div className={classes}>
        {(hasShown && children) || (defaultLoad && children)}
      </div>
    )
  }
}
TabPanel.propTypes = {
  /** 头部内容, 可以传入节点 */
  header: PropTypes.any,
  /** header是否是变化的,如果header是需要根据props或者state重新渲染，设置headerkey为可变的数据 */
  headerkey: PropTypes.string,
  /** 特有的key */
  keys: PropTypes.string.isRequired,
  /** 是否active, 会被父组件自动传入，不用关心 */
  active: PropTypes.bool,
  /** 是否在初次加载的时候加载 */
  defaultLoad: PropTypes.bool,
  /** 是否禁用 */
  disabled: PropTypes.bool
}
