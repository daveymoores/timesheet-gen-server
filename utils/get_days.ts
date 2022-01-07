import daysInMonth from "@stdlib/time-days-in-month";

const getDays = (month_year: string): number => {
  const [month, year] = month_year.split(",");
  return daysInMonth(month.toLowerCase(), Number(year.trimStart()));
};

export default getDays;
