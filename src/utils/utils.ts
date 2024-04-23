export function generateYearList(yearsBack: number, yearsForward: number) {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - yearsBack; i <= currentYear + yearsForward; i++) {
    years.push({ key: i.toString(), value: i.toString() });
  }

  return years;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
