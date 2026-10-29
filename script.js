"use strict";

const form = document.getElementById("form");
const tempInput = document.getElementById("temp");
const fromSel = document.getElementById("from");
const toSel = document.getElementById("to");
const swapBtn = document.getElementById("swap");
const resetBtn = document.getElementById("reset");
const errorEl = document.getElementById("error");
const resultBox = document.getElementById("result");
const resultLine = document.getElementById("resultLine");
const resultValue = document.getElementById("resultValue");
const feelEl = document.getElementById("feel");
const formulaEl = document.getElementById("formula");

// Every unit knows how to convert to and from Celsius
const UNITS = {
  celsius:    { symbol: "°C", toC: (v) => v,                  fromC: (c) => c },
  fahrenheit: { symbol: "°F", toC: (v) => ((v - 32) * 5) / 9, fromC: (c) => (c * 9) / 5 + 32 },
  kelvin:     { symbol: "K",  toC: (v) => v - 273.15,         fromC: (c) => c + 273.15 },
};

const FORMULAS = {
  "celsius-fahrenheit": "°F = °C × 9/5 + 32",
  "celsius-kelvin": "K = °C + 273.15",
  "fahrenheit-celsius": "°C = (°F − 32) × 5/9",
  "fahrenheit-kelvin": "K = (°F − 32) × 5/9 + 273.15",
  "kelvin-celsius": "°C = K − 273.15",
  "kelvin-fahrenheit": "°F = (K − 273.15) × 9/5 + 32",
};

const NUMBER_PATTERN = /^[+-]?(\d+\.?\d*|\.\d+)$/; // 25, -3.5, .5, +7
const ABSOLUTE_ZERO_C = -273.15;
const MAX_VALUE = 1e12;

/* ---------- helpers ---------- */

// Round to 2 decimals and drop trailing zeros: 97.880000 -> "97.88", 100.00 -> "100"
const round = (n) => String(Number(n.toFixed(2)));

function describe(celsius) {
  if (celsius <= 0) return { key: "freezing", text: "Freezing" };
  if (celsius < 15) return { key: "cold", text: "Cold" };
  if (celsius < 25) return { key: "mild", text: "Mild" };
  if (celsius < 35) return { key: "warm", text: "Warm" };
  return { key: "hot", text: "Hot" };
}

function showError(message) {
  errorEl.textContent = message;
  resultBox.hidden = true;
  tempInput.setAttribute("aria-invalid", "true");
}

function clearError() {
  errorEl.textContent = "";
  tempInput.removeAttribute("aria-invalid");
}

/* ---------- main conversion ---------- */

function convert() {
  clearError();
  const raw = tempInput.value.trim();

  // Validate that the input is a number
  if (raw === "") return showError("Please enter a temperature.");
  if (!NUMBER_PATTERN.test(raw)) return showError("Enter a valid number, for example 25 or -3.5.");

  const value = parseFloat(raw);
  if (Math.abs(value) > MAX_VALUE) return showError("That number is too large.");

  const from = fromSel.value;
  const to = toSel.value;
  const celsius = UNITS[from].toC(value);

  if (celsius < ABSOLUTE_ZERO_C - 1e-9) {
    return showError("That is below absolute zero (-273.15 °C, -459.67 °F, 0 K). Enter a higher value.");
  }

  const result = UNITS[to].fromC(celsius);
  const feel = describe(celsius);

  resultLine.textContent = `${round(value)} ${UNITS[from].symbol} =`;
  resultValue.textContent = `${round(result)} ${UNITS[to].symbol}`;
  feelEl.textContent = feel.text;
  formulaEl.textContent = from === to ? "Same unit, no conversion needed." : `Formula: ${FORMULAS[`${from}-${to}`]}`;
  resultBox.dataset.feel = feel.key;
  resultBox.hidden = false;
}

/* ---------- events ---------- */

form.addEventListener("submit", (e) => {
  e.preventDefault();
  convert();
});

tempInput.addEventListener("input", clearError);

// Re-convert automatically when a result is showing and the unit changes
[fromSel, toSel].forEach((sel) => sel.addEventListener("change", () => {
  if (!resultBox.hidden) convert();
}));

swapBtn.addEventListener("click", () => {
  [fromSel.value, toSel.value] = [toSel.value, fromSel.value];
  if (tempInput.value.trim() !== "") convert();
});

resetBtn.addEventListener("click", () => {
  tempInput.value = "";
  fromSel.value = "celsius";
  toSel.value = "fahrenheit";
  clearError();
  resultBox.hidden = true;
  tempInput.focus();
});

document.getElementById("year").textContent = new Date().getFullYear();