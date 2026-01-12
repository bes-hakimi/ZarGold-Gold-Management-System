export function getAfghanDate(date: Date) {
  const formatter = new Intl.DateTimeFormat(
    "fa-AF-u-ca-persian",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
    }
  );

  const parts = formatter.formatToParts(date);

  const weekday =
    parts.find(p => p.type === "weekday")?.value ?? "";

  const month =
    parts.find(p => p.type === "month")?.value ?? "";

  const year =
    parts.find(p => p.type === "year")?.value ?? "";

  return {
    weekday,
    month,
    year,
  };
}
