import countDaysInMonth from "count-days-in-month";

const getDays = (month_year: string): number => {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const [month, year] = month_year.split(",");
  return countDaysInMonth(
    Number(year.trimStart()),
    months.indexOf(month.toLowerCase())
  );
};

export default getDays;
