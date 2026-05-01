import { CURRENCIES, type Currency } from "./currencies";

interface GeoData {
  country_code: string;
  country_name: string;
  city: string;
  region: string;
}

export interface GeoResult {
  currency: Currency;
  countryCode: string;
  countryName: string;
  city: string;
  region: string;
}

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  EC: "USD",
  US: "USD",
  CO: "COP",
  MX: "MXN",
  PE: "PEN",
  CL: "CLP",
  AR: "ARS",
  BO: "BOB",
  BR: "BRL",
};

export const detectCurrencyByIP = async (): Promise<GeoResult | null> => {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const data: GeoData = await res.json();
    const currencyCode = COUNTRY_TO_CURRENCY[data.country_code] || "USD";
    const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
    return {
      currency,
      countryCode: data.country_code || "",
      countryName: data.country_name || "",
      city: data.city || "",
      region: data.region || "",
    };
  } catch {
    return null;
  }
};