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
  // const data = [
  //   { date: '17.11', temp: 1 },
  //   { date: '18.11', temp: 0 },
  //   { date: '19.11', temp: 2 },
  //   { date: '19.11', temp: 3 },
  //   { date: '20.11', temp: 4 },
  //   { date: '20.11', temp: 5 },
  //   { date: '20.11', temp: 6 },
  //   { date: '21.11', temp: -1 },
  //   { date: '22.11', temp: -2 },
  //   { date: '22.11', temp: -3 },
  // ]

  const newData = [
    { temp: isAbove ? minTemp / 2 : minTemp * 2 },
    ...chartData,
    { temp: isAbove ? minTemp / 2 : minTemp * 2 },
  ]

  const gradientOffset = () => {
    const dataMax = Math.max(...chartData.map((i) => i.temp))
    const dataMin = Math.min(...chartData.map((i) => i.temp))
    console.log('dataMax', dataMax)
    console.log('dataMin', dataMin)

    if (dataMax <= 0) {
      return 0
    }
    if (dataMin >= 0) {
      return 1
    }
    return dataMax / (dataMax - dataMin)
  }

  const off = gradientOffset()

  return (
    <ResponsiveContainer width="100%" height={110}>
      <AreaChart width={500} height={400} data={newData} margin={{ top: 30 }}>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 7, padding: 0, margin: 0, opacity: 0.8 }}
          height={15}
          tickMargin={-5}
        />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#ffa25b" stopOpacity={1} />
            <stop offset={off} stopColor="#459de9" stopOpacity={1} />
          </linearGradient>
          {/*<linearGradient id='colorWarm' x1='0' y1='0' x2='0' y2='1'>*/}
          {/*  <stop offset='5%' stopColor='#ffa25b' stopOpacity={0.8} />*/}
          {/*  <stop offset='95%' stopColor='#ffa25b' stopOpacity={0} />*/}
          {/*</linearGradient>*/}
          {/*<linearGradient id='colorCold' x1='0' y1='0' x2='0' y2='1'>*/}
          {/*  <stop offset='5%' stopColor='#459de9' stopOpacity={0.8} />*/}
          {/*  <stop offset='95%' stopColor='#459de9' stopOpacity={0} />*/}
          {/*</linearGradient>*/}
        </defs>
        <Area type="monotone" dataKey="temp" stroke="#000" fill="url(#splitColor)">
          <LabelList dataKey={'temp'} position="insideBottom" className={styles.label} />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  )
}

//   return (
//     <ResponsiveContainer width="100%" height={110}>
//       <AreaChart
//         width={500}
//         height={400}
//         data={newData}
//         margin={{
//           top: 30,
//         }}
//       >
//         <XAxis
//           dataKey="date"
//           axisLine={false}
//           tickLine={false}
//           style={{ fontSize: 7, padding: 0, margin: 0, opacity: 0.8 }}
//           height={15}
//           tickMargin={-5}
//         />
//         <defs>
//           <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
//             <stop offset={offGreen} stopColor="green" stopOpacity={1} />
//             <stop offset={offRed} stopColor="red" stopOpacity={1} />
//           </linearGradient>
//         </defs>
//         <Area type="monotone" dataKey="temp" stroke="#000" fill="url(#splitColor)">
//           <LabelList dataKey={'temp'} position="insideBottom" className={styles.label} />
//         </Area>
//       </AreaChart>
//     </ResponsiveContainer>
//   )
// }

export default ForecastAriaChart
