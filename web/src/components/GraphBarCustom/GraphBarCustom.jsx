import React, { useState, useEffect } from 'react'
import { transformDataBarGraph } from 'src/lib/expensesMonth'
import { Card, Title, BarChart } from "@tremor/react";

const dataFormatter = (number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const GraphBarCustom = ({ data }) => {
  const [transformedData, setTransformedData] = useState(null)

  useEffect(() => {
    if (data) {
      const transformed = transformDataBarGraph(data)
      setTransformedData(transformed)
    }
  }, [data])

  return (
    <div className=" lg:w-4/5  w-full">
      <Card>
        <Title>Total por mes</Title>

        {transformedData && <BarChart
          className="mt-6"
          data={transformedData.data}
          index="name"
          categories={transformedData.categories}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />}
      </Card>
    </div>
  )
};

export default GraphBarCustom;
