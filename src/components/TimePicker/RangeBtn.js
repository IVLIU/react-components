import React from 'react'
import RadioBtn from '../Radio/RadioButton'
import { btnTimeRange } from './constant'

export default function (props) {
  return <RadioBtn options={btnTimeRange} {...props}/>
}
