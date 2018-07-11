import React from 'react'
import RadioBtn from '../Radio/RadioButton'
import { btnTimeRange } from './constant'

export default function (props) {
  const { currentLocale = 'zh_CN', max7d, ...others } = props
  return <RadioBtn options={btnTimeRange(currentLocale, max7d)} {...others}/>
}
