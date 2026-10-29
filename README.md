# temperatureconverter

# Temperature Converter

A responsive temperature converter built with HTML, CSS and JavaScript for the Infobyte internship (Task 3).

**Developed by:** Sanketh Kumar
**Live demo:** _add your link here_

## How it works
1. Type a temperature.
2. Choose the unit you are converting **from** and **to** (Celsius, Fahrenheit or Kelvin).
3. Press **Convert**. The result is shown with the correct unit.

## Features
- All four required UI elements: input field, unit dropdowns, Convert button, result display
- Input validation: rejects empty input, letters and symbols
- Extra challenge done: Kelvin support (any unit to any unit)
- Blocks values below absolute zero
- Swap button, Reset button and Enter key support
- Shows the formula used and a Freezing / Cold / Mild / Warm / Hot label
- Quick reference table of key temperatures
- Responsive layout with automatic light and dark theme

## Tech stack
HTML5, CSS3 (Grid, variables, media queries), JavaScript (ES6)

## Project structure
```
index.html   page structure and form
style.css    layout and theme
script.js    validation and conversion logic
README.md    documentation
```

## Test cases
| Input | Result |
|---|---|
| 0 °C to °F | 32 °F |
| 100 °C to K | 373.15 K |
| 98.6 °F to °C | 37 °C |
| 0 K to °C | -273.15 °C |
| -40 °C to °F | -40 °F |
| abc | Error: enter a valid number |
| -300 °C | Error: below absolute zero |

## Run locally
Open `index.html` in any browser.

## Deploy (GitHub Pages)
Repo **Settings → Pages**, branch `main`, folder `/ (root)`, then **Save**. The site will be at `https://<username>.github.io/infobyte-temperature-converter/`.

## Contact
Sanketh Kumar
- LinkedIn: https://www.linkedin.com/in/sanketh-k-387aa432a
- Email: _add your email_
- GitHub: _add your GitHub profile_