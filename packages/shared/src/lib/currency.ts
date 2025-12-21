export const CURRENCIES = [
  {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    label: "$ (US Dollars)",
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    label: "£ (GBP)",
  },
  {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    label: "€ (Euro)",
  },
  {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    label: "¥ (Yen)",
  },
  {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    label: "₹ (Rupees)",
  },
  {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    label: "A$ (Australian Dollars)",
  },
  {
    code: "CAD",
    symbol: "CA$",
    name: "Canadian Dollar",
    label: "CA$ (Canadian Dollars)",
  },
  {
    code: "HKD",
    symbol: "HK$",
    name: "Hong Kong Dollar",
    label: "HK$ (Hong Kong Dollars)",
  },
  {
    code: "SGD",
    symbol: "SGD$",
    name: "Singapore Dollar",
    label: "SGD$ (Singapore Dollars)",
  },
  {
    code: "TWD",
    symbol: "NT$",
    name: "New Taiwan Dollar",
    label: "NT$ (Taiwanese Dollars)",
  },
  {
    code: "NZD",
    symbol: "NZ$",
    name: "New Zealand Dollar",
    label: "NZ$ (New Zealand Dollars)",
  },
  {
    code: "BRL",
    symbol: "R$",
    name: "Brazilian Real",
    label: "R$ (Brazilian Real)",
  },
  {
    code: "ZAR",
    symbol: "ZAR",
    name: "South African Rand",
    label: "ZAR (South African Rand)",
  },
  {
    code: "CHF",
    symbol: "CHF",
    name: "Swiss Franc",
    label: "CHF (Swiss Franc)",
  },
  {
    code: "ILS",
    symbol: "₪",
    name: "Israeli Shekel",
    label: "₪ (Israeli Shekel)",
  },
  {
    code: "PHP",
    symbol: "₱",
    name: "Philippine Peso",
    label: "₱ (Philippine Peso)",
  },
  {
    code: "KRW",
    symbol: "₩",
    name: "South Korean Won",
    label: "₩ (Korean Won)",
  },
  {
    code: "PLN",
    symbol: "zł",
    name: "Polish Złoty",
    label: "zł (Polish złoty)",
  },
  {
    code: "CZK",
    symbol: "Kč",
    name: "Czech Koruna",
    label: "Kč (Czech koruna)",
  },
] as const;

export type Currency = (typeof CURRENCIES)[number];
export type CurrencyCode = Currency["code"];
