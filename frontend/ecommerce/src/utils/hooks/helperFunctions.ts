export function formattedPrice(amount: number) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2, // no paise
  }).format(amount);

  return formatted;
}
