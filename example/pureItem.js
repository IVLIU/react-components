import React from 'react'

export default function (props) {
  const { data } = props
  console.log('pure function', data)
  return <div>{data.key}{data.value}</div>
}
