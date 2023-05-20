export function transformDataAreaGraph(data) {

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const transformedData = []

  for (let i = 0; i <= currentMonth; i++) { // Start from February (position 0)
    const thisDate = new Date(currentYear, i, 1) // Set the day to 1 to get the beginning of the month
    const dateString = `${monthNames[i]} ${thisDate.getFullYear().toString().substr(-2)}`

    const dataObject = { date: dateString }

    data.forEach(item => {
      dataObject[item.name] = item.totalForMonth[i] || 0
    })

    transformedData.push(dataObject)
  }

  return {
    data: transformedData,
    categories: data.map((category) => category.name)
  }
}

export function transformDataBarGraph(data) {

  if (!data)
    return []

  let monthsTotal = [];

  const currentMonthIndex = new Date().getMonth();

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  let result = data.forEach(element => {
    for (let i = 0; i < element.totalForMonth.length; i++) {
      if (monthsTotal[i] === undefined) {
        monthsTotal[i] = element.totalForMonth[i];
      } else {
        monthsTotal[i] += element.totalForMonth[i];
      }
    }
  });

  let transformedData = Array.from({ length: currentMonthIndex + 1 }, (_, i) => monthsTotal[i]);

  let final = {
    topic: "total"
  }

  transformedData.forEach((month, i) => {
    const dateString = `${monthNames[i]}`

    final[dateString] = month;
  })

  let months = monthNames.slice(0, transformedData.length);

  return {
    data: [final],
    // categories es el arreglo de monthNames hasta el tamano del transformedData
    categories: months
  }
}

export function transformDataPieGraph(data) {
  if (!data)
    return []

  let transformedData = [];

  data.forEach((element) => {
    transformedData.push({
      name: element.name,
      value: element.totalForMonth.reduce((a, b) => a + b, 0),
    })
  });

  return transformedData;
}
