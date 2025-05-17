import { startOfDay, subDays, eachDayOfInterval, format } from 'date-fns'
import { Order } from '../MBill/mbill.model'
import { Expense } from '../expense/expense.model'

const getDailyAnalytics = async () => {
  const today = startOfDay(new Date())
  const last30Days = subDays(today, 30)

  // Create an array of the last 30 days
  const daysArray = eachDayOfInterval({ start: last30Days, end: today }).map(
    (date) => format(date, 'dd-MM-yyyy'),
  )

  // Fetch and aggregate orders
  const orders = await Order.aggregate([
    { $match: { status: 'delivered', updatedAt: { $gte: last30Days } } },
    {
      $group: {
        _id: { $dateToString: { format: '%d-%m-%Y', date: '$updatedAt' } },
        totalAmount: { $sum: '$price' },
      },
    },
    { $project: { x: '$_id', y: '$totalAmount', _id: 0 } },
  ])

  // Fetch and aggregate expenses
  const expenses = await Expense.aggregate([
    { $match: { createdAt: { $gte: last30Days } } },
    {
      $group: {
        _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
        totalAmount: { $sum: '$amount' },
      },
    },
    { $project: { x: '$_id', y: '$totalAmount', _id: 0 } },
  ])

  // Function to fill missing days
  const fillMissingDays = (data: { x: string; y: number }[]) => {
    const dataMap = new Map(data.map((item) => [item.x, item.y]))
    return daysArray.map((day) => ({
      x: day,
      y: dataMap.get(day) || 0,
    }))
  }

  // Fill missing days for both orders and expenses
  const filledOrders = fillMissingDays(orders)
  const filledExpenses = fillMissingDays(expenses)

  // Combine the data
  return [
    { id: 'Income', data: filledOrders },
    { id: 'Expense', data: filledExpenses },
  ]
}

export const analyticsServices = {
  getDailyAnalytics,
}
