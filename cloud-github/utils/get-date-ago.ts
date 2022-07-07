type Unit = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

function parseDate(date: number, unit: Unit) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = month * 12;
  const units = { year, month, week, day, hour, minute, second };
  const time = (Date.now() - date) / units[unit];
  return time <= 1 ? time : Math.floor(time);
}

function getUnit(date: number): [Unit, number] {
  const units: [Unit, number][] = [
    ["year", 360],
    ["month", 30],
    ["week", 7],
    ["day", 1],
    ["hour", 1 / 24],
    ["minute", 1 / (60 * 24)],
    ["second", 1 / (60 * 60 * 24)],
  ];
  const parsedTime = parseDate(date, "day");
  const unit = units.find(([, time]) => parsedTime >= time) || ["second", 1];
  return unit[0] === "day" ? unit : [unit[0], parseDate(date, unit[0])];
}

export function getDateAgo(date: number): string {
  const parser = typeof Intl !== "undefined" && Intl;
  if (!parser) return "some days ago";
  const Parser = new parser.RelativeTimeFormat("en-EN");
  const [unit, time] = getUnit(date);
  return Parser.format(-time, unit);
}
