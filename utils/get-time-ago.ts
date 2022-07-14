type Unit = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = month * 12;
const msUnits = { year, month, week, day, hour, minute, second };
const daysUnits: [Unit, number][] = [
  ["year", 360],
  ["month", 30],
  ["week", 7],
  ["day", 1],
  ["hour", 1 / 24],
  ["minute", 1 / (60 * 24)],
  ["second", 1 / (60 * 60 * 24)],
];

function parseDate(date: number, unit: Unit) {
  const time = (Date.now() - date) / msUnits[unit];
  return time <= 1 ? time : Math.floor(time);
}

function getUnit(date: number): [Unit, number] {
  const parsedTime = parseDate(date, "day");
  const unit = daysUnits.find(([, time]) => parsedTime >= time) || ["second", 1];
  return unit[0] === "day" ? unit : [unit[0], parseDate(date, unit[0])];
}

export function getTimeAgo(date: number): string {
  if (typeof Intl === "undefined") return "days ago";
  const [unit, time] = getUnit(date);
  return unit === "second" ? "less than a minute ago" : new Intl.RelativeTimeFormat("en-EN").format(-time, unit);
}
