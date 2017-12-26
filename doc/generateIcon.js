var glob = require('glob')
var fs = require('fs')
var result = glob.sync('./src/images/svg/*.svg')
var t = result.map((item) => {
  return {
    name: 'icon' + item.replace('./src/images/svg/', '').replace('.svg', '').replace(/-/g, '_'),
    url: item.replace('./src', '@')
  }
}).filter(item => item.name !== 'icon2')
const imp = t.map(item => {
  return `import ${item.name} from '${item.url}'`
}).join('\n')

const iconList = t.map(item => {
  return `
    <div className="icon-wrap">
      <Icon className="example-icons" link={${item.name}}/>
      <p className="icon-name">${item.name.replace('icon', '')}</p>
    </div> 
  `
}).join('\n')

const ret = `
${imp}
import React, { Component } from 'react'
import Icon from './src/components/Icon'

export default class IconList extends Component {
  render () {
    return (
      <div>
        ${iconList}
        <div className="clear"></div>
      </div>
    )
  }
}
`

fs.writeFileSync('./doc/IconList.js', ret)
