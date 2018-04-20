/*
 * 提供可折叠的功能
 * @Author: wangweixin@threatbook.cn
 * @Date: 2018-04-20 10:43:53
 * @Last Modified by: wangweixin@threatbook.cn
 * @Last Modified time: 2018-04-20 11:19:25
 */
import React, { Component, Fragment } from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames'
import autobind from 'autobind-decorator'

const CollapseRow = Row =>
  class CollapseRow extends Component {
    state = {
      show: false
    }
    componentWillMount () {
      const { showExpand } = this.props
      if (showExpand) {
        this.setState({
          show: showExpand
        })
      }
    }
    @autobind
    toggleShow (...args) {
      const { expandRowRender, onClick } = this.props

      // 如果不可展开，则进行其他向上传递
      if (!expandRowRender) {
        return onClick && onClick.apply(null, args)
      }

      this.setState({
        show: !this.state.show
      })
    }
    render () {
      const { expandRowRender, className, ...others } = this.props
      const { rowData, rowIndex, columns, rowHasChild } = others
      const { show } = this.state
      const classes = classNames({
        'has-expand': expandRowRender,
        'show-expand': show
      }, className)

      return (
        <Fragment>
          <Row {...others}
            expandShow={show}
            onClick={this.toggleShow}
            className={classes}/>
          {
            show && expandRowRender
              ? <tr className="table-body-expand-row">
                <td colSpan={rowHasChild ? columns.length + 1 : columns.length}>
                  {expandRowRender(rowData, rowIndex, columns)}
                </td>
              </tr>
              : null
          }
        </Fragment>
      )
    }
  }
export default CollapseRow
