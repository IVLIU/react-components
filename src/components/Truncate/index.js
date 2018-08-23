import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import TextTruncate from 'react-text-truncate'
import classNames from 'classnames'

export default class index extends PureComponent {
  state = {
    expand: false,
    truncated: false
  }
  static propTypes = {
    /** 是否默认展开 */
    defaultExpand: PropTypes.bool,
    /** 超过多少行开始截断 */
    line: PropTypes.num,
    /** 展开的提示 */
    more: PropTypes.node,
    /** 收起的提示 */
    less: PropTypes.node,
    /** 是否可以展开收起 */
    canReadMore: PropTypes.bool
  }
  static defaultProps = {
    line: 1,
    more: '展开',
    less: '收起',
    canReadMore: true
  }
  toggleLines = () => {
    const expand = !this.state.expand
    this.setState({
      expand
    })
    this.props.onToggle && this.props.onToggle(expand)
  }
  handleTruncate = () => {
    this.setState({
      truncated: !this.state.truncated
    })
  }
  render() {
    const { children, canReadMore, more, less, line, ...others } = this.props
    const { expand } = this.state
    const moreDom = <a className="truncate-expand" onClick={this.toggleLines}>{expand ? less : more}</a>
    const classes = classNames({
      'break-all': line > 1
    }, 'truncate')
    return expand
      ? <Fragment>
        {children} {moreDom}
      </Fragment>
      : <TextTruncate {...others} text={children}
        line={line}
        containerClassName={classes}
        onTruncated={this.handleTruncate}
        textTruncateChild={canReadMore ? moreDom : ''}/>
  }
}
