import React, { useState, useEffect } from 'react';
import { transformDataAreaGraph } from 'src/lib/expensesMonth';
import { Card, Title, AreaChart } from "@tremor/react";


const dataFormatter = (number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const GraphAreaCustom = ({ data }) => {
  const [transformedData, setTransformedData] = useState([])

  useEffect(() => {
    if (data) {
      const transformed = transformDataAreaGraph(data)
      setTransformedData(transformed)
    }
  }, [data])

  return (
    <div className=" w-full">
      <Card>
        <Title>Gastado en categoria por mes</Title>
        <AreaChart
          className="h-96 mt-4"
          data={transformedData.data}
          index="date"
          categories={transformedData.categories}
          valueFormatter={dataFormatter}
          curveType='natural'
        />
      </Card>
    </div>
  );
};

export default GraphAreaCustom;


