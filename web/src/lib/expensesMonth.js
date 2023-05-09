export function transformDataAreaGraph(data) {


  const currentMonthIndex = new Date().getMonth();

  if (!data)
    return []

  let result = data.map((category) => {
    return {
      name: category.name,
      // data tiene que ser category.totalForMonth, acortado hasta este mes
      data: Array.from({ length: currentMonthIndex + 1 }, (_, i) => category.totalForMonth[i]),
      color: category.color,
    };
  });

  return result
}

export function transformDataBarGraph(data) {

  if (!data)
    return []

  let monthsTotal = [];

  const currentMonthIndex = new Date().getMonth();

  let result = data.forEach(element => {
    for (let i = 0; i < element.totalForMonth.length; i++) {
      if (monthsTotal[i] === undefined) {
        monthsTotal[i] = element.totalForMonth[i];
      } else {
        monthsTotal[i] += element.totalForMonth[i];
      }
    }
  });

  return [{
    name: "Total",
    data: Array.from({ length: currentMonthIndex + 1 }, (_, i) => monthsTotal[i]),
  }]
}

export function transformDataPieGraph(data) {
  if (!data)
    return []

  let totalForEachCategory = [];

  let result = data.forEach(element => {
    totalForEachCategory.push(element.totalForMonth.reduce((a, b) => a + b, 0));
  });

  console.log({
    labels: data.map((category) => category.name),
    data: totalForEachCategory
  })


  return {
    labels: data.map((category) => category.name),
    data: totalForEachCategory
  }
}
