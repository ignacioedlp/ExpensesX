import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { transformDataAreaGraph } from 'src/lib/expensesMonth';

const options = {
  chart: {
    id: 'gastos-chart',
    toolbar: {
      show: true,
    },
    background: '#2B2C31'
  },
  theme: {
    mode: 'dark',
  },
  xaxis: {
    categories: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    labels: {
      style: {
        colors: '#9AA5B1',
        fontSize: '14px',
        fontFamily: 'Satoshi, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-xaxis-label',
      }
    }
  },
  yaxis: {
    title: {
      text: 'Total de Gastos',
      style: {
        color: '#9AA5B1',
        fontSize: '14px',
        fontFamily: 'Satoshi, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-xaxis-label',
      }
    },
    labels: {
      style: {
        colors: '#9AA5B1',
        fontSize: '14px',
        fontFamily: 'Satoshi, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-xaxis-label',
      },
      formatter: (value) => {
        return `$ ${value}`;
      }
    }
  },
  colors: [
    '#3C50E0',
    '#80CAEE',
    '#3056D3',
    '#10B981',
    '#F43F5E',
    '#6366F1',
    '#8B5CF6',
    '#EC4899',
    '#F97316',
    '#F59E0B',
    '#10B981',
    '#3B82F6',
    '#6366F1',
    '#8B5CF6',
    '#EC4899',
    '#F97316',
    '#F59E0B',
    '#10B981',
  ],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [3, 3, 3, 3, 3, 3, 3, 3, 3],
    curve: 'smooth',
  },
  markers: {
    size: 5,
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '14px',
    fontFamily: 'Satoshi, sans-serif',
    fontWeight: 400,
    labels: {
      colors: '#9AA5B1',
    },
  },
  grid: {
    borderColor: '#f1f1f1',
  },
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
    <div className=" rounded-sm  px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 bg-[#2B2C31] w-full border">
      <div className="flex flex-wrap items-start justify-between gap-3 pt-3 sm:flex-nowrap">
        <div className="flex flex-wrap w-full gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className="text-2xl font-bold mb-4">Total for category</p>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end w-full max-w-45">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="px-3 py-1 text-xs font-medium text-black bg-white rounded shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="px-3 py-1 text-xs font-medium text-black rounded hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="px-3 py-1 text-xs font-medium text-black rounded hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div> */}
      </div>

      <div className='w-full'>
        <div id="chartOne" className="mx-auto">
          <Chart
            options={options}
            series={transformedData}
            type="area"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default GraphAreaCustom;


