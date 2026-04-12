export interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // rate relative to 1 USD
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "Dólar (USD)", flag: "🇺🇸", rate: 1 },
  { code: "COP", symbol: "$", name: "Peso colombiano (COP)", flag: "🇨🇴", rate: 4150 },
  { code: "MXN", symbol: "$", name: "Peso mexicano (MXN)", flag: "🇲🇽", rate: 17.5 },
  { code: "PEN", symbol: "S/", name: "Sol peruano (PEN)", flag: "🇵🇪", rate: 3.75 },
  { code: "CLP", symbol: "$", name: "Peso chileno (CLP)", flag: "🇨🇱", rate: 950 },
  { code: "ARS", symbol: "$", name: "Peso argentino (ARS)", flag: "🇦🇷", rate: 900 },
  { code: "BOB", symbol: "Bs", name: "Boliviano (BOB)", flag: "🇧🇴", rate: 6.9 },
  { code: "BRL", symbol: "R$", name: "Real brasileño (BRL)", flag: "🇧🇷", rate: 5 },
];

export const convertPrice = (usdPrice: number, currency: Currency): number => {
  const converted = usdPrice * currency.rate;
  // Round to nice numbers for large currencies
  if (currency.rate >= 100) return Math.round(converted / 100) * 100;
  if (currency.rate >= 10) return Math.round(converted);
  return Math.round(converted * 100) / 100;
};

export const formatPrice = (usdPrice: number, currency: Currency): string => {
  const converted = convertPrice(usdPrice, currency);
  if (currency.rate >= 100) {
    return `${currency.symbol}${converted.toLocaleString("es")}`;
  }
  return `${currency.symbol}${converted}`;
};
