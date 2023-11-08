import React from 'react'
import { Area, AreaChart, LabelList, ResponsiveContainer, XAxis } from 'recharts'
import styles from './ForecastAreaChart.module.css'

export type ChartData = {
  date: string
  temp: number
}

type ForecastAriaChartProps = {
  chartData: ChartData[]
  isAbove: boolean
}

function ForecastAriaChart({ chartData, isAbove }: ForecastAriaChartProps): JSX.Element {
  const temps = chartData.map((item) => item.temp)
  const minTemp = Math.min(...temps)

  const newData = [
    { temp: isAbove ? minTemp / 2 : minTemp * 2 },
    ...chartData,
    { temp: isAbove ? minTemp / 2 : minTemp * 2 },
  ]

  const positiveNumbers: number[] = []
  const negativeNumbers: number[] = []

  // console.log(
  //   'positiveNumbers.every((value) => value >= 0) || negativeNumbers.every((value) => value <= 0)',
  //   positiveNumbers.every((value) => value >= 0) || negativeNumbers.every((value) => value <= 0),
  // )
  // console.log('temps', temps)
  temps.forEach((temp) => {
    if (temp >= 0) {
      positiveNumbers.push(temp)
    } else {
      negativeNumbers.push(temp)
    }
  })

  return (
    <ResponsiveContainer width="100%" height={110} className={styles.container}>
      <AreaChart data={newData} margin={{ top: 30 }}>
        <defs>
          <linearGradient id="colorWarm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffa25b" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffa25b" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#459de9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#459de9" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 7, padding: 0, margin: 0, opacity: 0.8 }}
          height={15}
          tickMargin={-5}
        />
        <Area
          className={styles.area}
          type="natural"
          dataKey="temp"
          stroke={positiveNumbers.every((value) => value >= 0) ? 'transparent' : '#459de9'}
          // fill={
          //   positiveNumbers.every((value) => value >= 0) && negativeNumbers.every((value) => value <= 0)
          //     ? 'url(#colorWarm)' && 'url(#colorCold)'
          //     : positiveNumbers.every((value) => value >= 0)
          //     ? 'url(#colorWarm)'
          //     : negativeNumbers.every((value) => value <= 0)
          //     ? 'url(#colorCold)'
          //     : ''
          // }
          fill={
            positiveNumbers.every((value) => value >= 0)
              ? 'url(#colorWarm)'
              : negativeNumbers.every((value) => value <= 0)
              ? 'url(#colorCold)'
              : ''
          }
          isAnimationActive={false}
        >
          <LabelList dataKey={'temp'} position="insideBottom" className={styles.label} />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ForecastAriaChart
