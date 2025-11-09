import { clsx, type ClassValue } from "clsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertAmountToMiliUnits = (amount: number) => {
  return Math.round(amount * 1000);
};
export const convertAmountFromMiliUnits = (amount: number) => {
  return amount / 1000;
};
export const formatCurrency = (amount: number) => {
  const formatedAmount = convertAmountFromMiliUnits(amount);
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(formatedAmount);
};

export const percentageChange = (
  currentPeriod: number,
  previousPeriod: number
) => {
  if (previousPeriod === 0) {
    return previousPeriod === currentPeriod ? 0 : 100;
  }
  return ((currentPeriod - previousPeriod) / previousPeriod) * 100;
};

type period = {
  from: Date | undefined | string;
  to?: Date | undefined | string;
};
export const formatDate = (period?: period) => {
  if (!period?.from) {
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);
    return `${format(defaultFrom, "dd MMM")} - ${format(
      defaultTo,
      "dd MMM yyyy"
    )}`;
  }
  if (period.to) {
    return `${format(period.from, "dd MMM")} - ${format(
      period.to,
      "dd MMM yyyy"
    )}`;
  }
  return `${format(period.from, "dd MMM yyyy")}`;
};

export const formatPercentage = (
  value: number,
  options: { addPrefix: boolean } = { addPrefix: false }
) => {
  const formattedPercentage = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) {
    return `+${formattedPercentage}`;
  }
  return formattedPercentage;
};

export const getAllDays = (
  activeDaysIncome: { _sum: { amount: number | null }; date: Date }[],
  activeDaysExpenses: { _sum: { amount: number | null }; date: Date }[],
  startDay: Date,
  endDay: Date
) => {
  const allDays = eachDayOfInterval({ start: startDay, end: endDay });

  // Convert arrays to Maps for O(1) lookups
  const incomeMap = new Map(
    activeDaysIncome.map((d) => [
      d.date.toISOString().split("T")[0],
      d._sum.amount,
    ])
  );
  const expensesMap = new Map(
    activeDaysExpenses.map((d) => [
      d.date.toISOString().split("T")[0],
      d._sum.amount,
    ])
  );

  // Map through all days and construct the result
  const transactionByDays = allDays.map((day) => {
    const dateKey = day.toISOString().split("T")[0];
    return {
      date: day,
      income: incomeMap.get(dateKey) || 0,
      expenses: expensesMap.get(dateKey) || 0,
    };
  });

  return transactionByDays;
};

export function normalizeDateToUserUtcMidnight(date: Date | string): Date {
  const d = new Date(date);
  // Shift the instant forward by the client's timezone offset (in minutes)
  const withLocalOffset = new Date(d.getTime() + d.getTimezoneOffset() * 60_000);
  // Now build UTC midnight for that local calendar day
  return new Date(Date.UTC(withLocalOffset.getFullYear(), withLocalOffset.getMonth(), withLocalOffset.getDate()));
}


