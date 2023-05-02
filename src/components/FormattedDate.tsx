const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function FormattedDate({ date }: { date: string | Date }) {
  date = typeof date === "string" ? new Date(date) : date;

  return (
    <time
      dateTime={date.toISOString()}
      className="text-sm/4 font-medium text-slate-500"
    >
      {dateFormatter.format(date)}
    </time>
  );
}
