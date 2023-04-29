import { useEffect } from "react";
import { Chart } from "chart.js";

const CategoriesBarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chartData = categories.map((category) => ({
      label: category.name,
      data: category.totalExpensesByMonth,
      borderColor: category.color,
      fill: false,
    }));

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: chartData,
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }, [categories]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
}

export default CategoriesBarChart
