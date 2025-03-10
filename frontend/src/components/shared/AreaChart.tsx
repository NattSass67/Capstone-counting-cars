/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useState, useEffect, useRef } from 'react'


export interface StatsViewData {
  time: string // The date in 'YYYY-MM-DD' format as a string
  visits: string // Number of visits as a string
  visitors: string // Number of visitors as a string
}

// Custom Tooltip Component
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: any[]
  label?: string
}) => {
  if (active && payload && payload.length) {
    console.log(payload)
    return (
      <div className="rounded-md bg-gray-800 p-2 text-white shadow-md">
        <p className="font-semibold">{`Date: ${label}`}</p>
        <p>{`Visits: ${payload[0].value}`}</p>
        <p>{`Visitors: ${payload[1].value}`}</p>
      </div>
    )
  }

  return null
}

export default function TrackerChart({ data }: { data: StatsViewData[] }) {
  const containerRef = useRef<HTMLDivElement>(null) // Ref for the container
  const [containerWidth, setContainerWidth] = useState(500) // Default width
  const [containerHeight, setContainerHeight] = useState(400) // Default height

  // Function to update width and height based on the container's size
  const updateSize = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth) // Capture container width
      setContainerHeight(containerRef.current.offsetHeight) // Capture container height
    }
  }

  // Capture the initial size on mount and update on resize
  useEffect(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <ResponsiveContainer ref={containerRef} width="100%" height="100%">
      <AreaChart
        width={containerWidth}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="1 2" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} /> {/* Use custom tooltip */}
        <Area
          type="monotone"
          dataKey="visits"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="visitors"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

