import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../Icon'
import iconArrow from '@/images/svg/coor-arrow.svg'
import pureRender from 'pure-render-decorator'
import autobind from 'autobind-decorator'
import Loading from '../Loading'

/**
 * 基本的盒子，用于组成页面的各个小容器
 * 可设置标题，自带Loading样式，自身可判断是否有数据而进行展示/隐藏
 */
@pureRender
export default class Box extends Component {
  constructor (props) {
    super(props)
    const { defaultOpen = true } = this.props
    this.state = {
      open: defaultOpen
    }
  }
  isBoxShow () {
    const { data, isLoading } = this.props
    // 正在加载时，展示Box
    if (isLoading) {
      return true
    }
    // 判断有没有内容
    return Array.isArray(data) ? data.length : data &&
      data !== 0
  }
  @autobind
  toggleOpen (e) {
    e.preventDefault()
    this.setState({
      open: !this.state.open
    })
  }
  renderTitle () {
    const { title, collapse, toggleRender } = this.props
    const { open } = this.state
    return (
      <div className="box-title">
        {title}
        {
          collapse
            ? <div className="box-title-toggle" onClick={this.toggleOpen}>
              {
                toggleRender
                  ? toggleRender(open)
                  : <Fragment>
                    <Icon className="box-title-toggle-icon" link={iconArrow} />
                    { open ? '收起' : '展开' }
                  </Fragment>
              }
            </div>
            : ''
        }
      </div>
    )
  }
  render () {
    const { className, title, children,
      isLoading, border, contentHeight,
      collapse, ...others } = this.props
    const { open } = this.state
    const classes = classNames(
      'box',
      className, {
        border,
        collapse,
        open
      }
    )
    const show = this.isBoxShow()

    if (!show) { return null }

    return (
      <div className={classes} {...others}>
        {
          title
            ? this.renderTitle()
            : null
        }
        <div className="box-content" style={{
          height: contentHeight ? parseInt(contentHeight) : ''
        }}>
          {
            isLoading ? <Loading className="box-loading" size="lg"/> : children
          }
        </div>
      </div>
    )
  }
}
Box.defaultProps = {
  isLoading: false
}
Box.propTypes = {
  /** 盒子的标题，可以省略 */
  title: PropTypes.any,
  /** 盒子依赖的数据，会根据是否有该数据而判断是否展示该盒子 */
  data: PropTypes.any,
  /** 是否正在Loading, 是的话会自带Loading样式 */
  isLoading: PropTypes.bool,
  /** 是否带border */
  border: PropTypes.bool,
  /** 是否可以折叠 */
  collapse: PropTypes.bool,
  /** 自定义折叠按钮 */
  toggleRender: PropTypes.func,
  /** 自定义盒子高度 */
  contentHeight: PropTypes.string
}
