import moment from 'moment'

export const timeRange = [
  {
    name: '今天',
    value: 'today'
  },
  {
    name: '1小时',
    value: 'one_hour'
  },
  {
    name: '24小时',
    value: 'twenty_four_hours'
  },
  {
    name: '7天',
    value: 'seven_days'
  },
  {
    name: '30天',
    value: 'thirty_days'
  }
]

export const btnTimeRange = timeRange.slice(2).map(item => ({
  label: item.name,
  value: item.value
}))

export const getStartAndEndTime = (rangeType) => {
  const curHour = new Date().getHours()
  const cur = moment({ hour: curHour })
  const nextHour = cur.add(1, 'hours').clone()
  switch (rangeType) {
    case 'one_hour':
      return {
        start: new Date(cur.subtract(1, 'hours')),
        end: new Date(nextHour)
      }
    case 'twenty_four_hours':
      return {
        start: new Date(cur.subtract(1, 'days')),
        end: new Date(nextHour)
      }
    case 'today':
      return {
        start: new Date(cur.hour(0).minute(0)
          .second(0)),
        end: new Date(nextHour)
      }
    case 'seven_days':
      return {
        start: new Date(cur.subtract(7, 'days').hour(0)
          .minute(0)
          .second(0)),
        end: new Date(nextHour)
      }
    case 'thirty_days':
      return {
        start: new Date(cur.subtract(30, 'days').hour(0)
          .minute(0)
          .second(0)),
        end: new Date(nextHour)
      }

    default:
      return {}
  }
}
export const ranges = {
  '1小时': [
    moment(getStartAndEndTime('one_hour').start),
    moment(getStartAndEndTime('one_hour').end)
  ],
  '24小时': [
    moment(getStartAndEndTime('twenty_four_hours').start),
    moment(getStartAndEndTime('twenty_four_hours').end)
  ],
  '今天': [
    moment(getStartAndEndTime('today').start),
    moment(getStartAndEndTime('today').end)
  ],
  '最近7天': [
    moment(getStartAndEndTime('seven_days').start),
    moment(getStartAndEndTime('seven_days').end)
  ],
  '最近30天': [
    moment(getStartAndEndTime('thirty_days').start),
    moment(getStartAndEndTime('thirty_days').end)
  ]
}
export const locale = {
  format: 'YYYY/MM/DD HH:mm',
  applyLabel: '确认',
  cancelLabel: '取消',
  fromLabel: '从',
  toLabel: '到',
  weekLabel: 'W',
  customRangeLabel: '自定义',
  daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
}
