const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const result = document.getElementById("result");

const currencyList = [
  { code: "USD", flag: "🇺🇸", sign: "$", name: "US Dollar" },
  { code: "EUR", flag: "🇪🇺", sign: "€", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", sign: "£", name: "British Pound" },
  { code: "INR", flag: "🇮🇳", sign: "₹", name: "Indian Rupee" },
  { code: "JPY", flag: "🇯🇵", sign: "¥", name: "Japanese Yen" },
  { code: "CNY", flag: "🇨🇳", sign: "¥", name: "Chinese Yuan" },
  { code: "CAD", flag: "🇨🇦", sign: "$", name: "Canadian Dollar" },
  { code: "AUD", flag: "🇦🇺", sign: "$", name: "Australian Dollar" },
  { code: "CHF", flag: "🇨🇭", sign: "CHF", name: "Swiss Franc" },
  { code: "RUB", flag: "🇷🇺", sign: "₽", name: "Russian Ruble" },
  { code: "AED", flag: "🇦🇪", sign: "د.إ", name: "UAE Dirham" }
];

currencyList.forEach(currency => {
  let option1 = document.createElement("option");
  option1.value = currency.code;
  option1.textContent = `${currency.flag} ${currency.code} (${currency.sign})`;
  fromCurrency.appendChild(option1);

  let option2 = document.createElement("option");
  option2.value = currency.code;
  option2.textContent = `${currency.flag} ${currency.code} (${currency.sign})`;
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    result.textContent = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    const fromSymbol = currencyList.find(c => c.code === from)?.sign || from;
    const toSymbol = currencyList.find(c => c.code === to)?.sign || to;

    result.textContent = `✅ ${fromSymbol}${amount} ${from} = ${toSymbol}${converted} ${to}`;
  } catch (error) {
    result.textContent = "❌ Error fetching exchange rate.";
  }
}
