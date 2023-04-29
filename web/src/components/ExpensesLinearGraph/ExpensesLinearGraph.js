import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { transformData } from 'src/lib/expensesMonth'

import { useQuery } from '@redwoodjs/web'

const CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      totalForMonth
      color
    }
  }
`

const ExpensesLinearGraph = () => {

  const { data } = useQuery(CATEGORIES)
  const [transformedData, setTransformedData] = useState([])

  useEffect(() => {
    if (data) {
      const transformed = transformData(data?.categories)
      setTransformedData(transformed)
    }
  }, [data])

  return (
    <div class="w-full max-w-full mt-0 lg:w-7/12 lg:flex-none">
      <div class="relative z-20 flex flex-col min-w-0 break-words order-0 border-solid  border-black-125 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border">
        <div class="py-6 pb-0 mb-0 border-b-0 border-solid border-black-125 rounded-t-2xl">
          <h6 class="text-2xl font-bold text-[#FFFFFF] mb-4">Expenses in this year</h6>
        </div>
        <div class="flex">
          <div className="w-full h-80 rounded-lg">
            {data ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={transformedData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: "xs", fill: "white" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: "xs", fill: "white" }}
                  />

                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                      padding: "8px",
                      border: "none",
                    }}
                    labelStyle={{ fontWeight: "bold" }}
                    itemStyle={{ fontWeight: "normal" }}
                  />
                  {data.categories.map((category, index) => (
                    <Area
                      type="monotone"
                      dataKey={category.name}
                      stackId={index}
                      stroke={category.color}
                      fill={category.color}
                      key={category.name}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500 font-semibold text-sm">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensesLinearGraph
