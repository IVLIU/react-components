import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Icon extends Component {
  render () {
    const { link, className = {}, ...others } = this.props
    const classes = classnames('icon', ...className)
    return (
      <svg className={classes} {...others}><use xlinkHref={link} /></svg>
    )
  }
}
Icon.propTypes = {
  link: PropTypes.string.isRequired
}
