export function transformData(data) {
  const totalsByCategoryAndMonth = {}

  // Obtener totales por categoría y mes
  data.forEach(category => {
    category.totalForMonth.forEach((total, index) => {
      if (total > 0) {
        const month = new Date(2023, index, 1).toLocaleDateString('es-AR', { month: 'short' })
        const categoryTotal = totalsByCategoryAndMonth[month] || {}
        categoryTotal[category.name] = total
        totalsByCategoryAndMonth[month] = categoryTotal
      }
      else {
        const month = new Date(2023, index, 1).toLocaleDateString('es-AR', { month: 'short' })
        const categoryTotal = totalsByCategoryAndMonth[month] || {}
        categoryTotal[category.name] = 0
        totalsByCategoryAndMonth[month] = categoryTotal
      }
    })
  })

  // Crear arreglo de objetos por mes
  const currentYear = new Date().getFullYear()
  const result = []
  for (let month = 0; month < 12; month++) {
    const date = new Date(currentYear, month, 1)
    const monthName = date.toLocaleDateString('es-AR', { month: 'short' })
    const totalsByCategory = totalsByCategoryAndMonth[monthName] || {}
    result.push({
      month: monthName,
      ...totalsByCategory,
    })
  }

  // Acortar hasta el mes actual
  const currentMonth = new Date().getMonth()
  result.splice(currentMonth + 1)
  


  return result
}
