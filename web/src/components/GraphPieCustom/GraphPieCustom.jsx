import React, { useState, useEffect } from 'react';
import { transformDataPieGraph } from 'src/lib/expensesMonth';
import {
  Card,
  Legend,
  DonutChart,
  Flex,
  Toggle,
  ToggleItem,
  Bold,
  Divider,
  List,
  ListItem,
  Metric,
  Text,
  Title,
} from "@tremor/react";

import { ViewListIcon, ChartPieIcon } from "@heroicons/react/outline";


const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

const GraphPieCustom = ({ data }) => {
  const [transformedData, setTransformedData] = useState([])
  const [selectedView, setSelectedView] = useState("chart");

  useEffect(() => {
    if (data) {
      const transformed = transformDataPieGraph(data)
      setTransformedData(transformed)
    }
  }, [data])

  return (
    <div className="col-span-12 xl:col-span-5 w-full lg:w-2/5">
      <Card className="max-w-md mx-auto">
        <Flex className="space-x-8" justifyContent="between" alignItems="center">
          <Title>Total por categoria</Title>
          <Toggle
            defaultValue="chart"
            color="gray"
            onValueChange={(value) => setSelectedView(value)}
          >
            <ToggleItem value="chart" icon={ChartPieIcon} />
            <ToggleItem value="list" icon={ViewListIcon} />
          </Toggle>
        </Flex>
        <Text className="mt-8">Promedio por mes</Text>
        <Metric>
          {
            valueFormatter(Math.round(transformedData.reduce((acc, stock) => acc + stock.value, 0) / 12))
          }
        </Metric>
        <Divider />
        <Text className="mt-8">
          <Bold>Categorias</Bold>
        </Text>
        <Legend
          categories={transformedData.map((city) => city.name)}
          className="mt-6"
        />
        {selectedView === "chart" ? (
          <div>
            <DonutChart
              data={transformedData}
              showAnimation={false}
              category="value"
              index="name"
              valueFormatter={valueFormatter}
              className="mt-6"
            />
          </div>
        ) : (
          <>
            <Flex className="mt-8" justifyContent="between">
              <Text className="truncate">
                <Bold>Categoria</Bold>
              </Text>
              <Text>Gastado</Text>
            </Flex>
            <List className="mt-4">
              {transformedData.map((stock) => (
                <ListItem key={stock.name}>
                  <Text>{stock.name}</Text>
                  <Flex justifyContent="end" className="space-x-2">
                    <Text>
                      {valueFormatter(stock.value)}
                    </Text>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Card>
    </div>
  );
};

export default GraphPieCustom;
