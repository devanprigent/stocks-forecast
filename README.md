# Stocks Forecast

A small **React** web app that projects long-term portfolio value under several contribution assumptions. It plots **after-tax, inflation-adjusted** wealth over time (today’s euros) and can overlay a **FIRE-style target** based on the 25× annual spending rule.

## Features

- **Three scenarios** (combinable on the chart):
  - **Lump sum (no new contributions)** — Starting capital only: no new contributions; gains are taxed; values shown in real (inflation-adjusted) terms.
  - **Fixed annual contributions** — Same **annual** contribution every year (derived from monthly salary and the % you invest).
  - **Growing contributions (salary raises)** — Contributions grow with salary and an annual salary increase rate.
- **Adjustable parameters**: horizon (years), expected ROI, starting capital, inflation, monthly salary, % of salary invested, salary increase (for the growing scenario).
- **Optional goal line**: “25× rule” target from estimated annual spending (portion of salary not invested), shown as a horizontal reference on the chart.
- **Chart.js** line chart with multiple series and annotations.


## Getting started

**Requirements:** Node.js 18+ (or current LTS) recommended.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Other scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint               |

## Project layout

```
src/
  App.tsx
  components/
    Chart.tsx         # Chart.js line chart + optional goal annotation
    InfoIcon.tsx      # Tooltip helper for scenario hints
    ParametersBox.tsx # Numeric inputs
    ScenariosBox.tsx  # Scenario checkboxes
  utils.ts            # Compounding, tax, inflation projections
  types.ts            # Shared TypeScript types
```

## Roadmap / ideas

- [ ] Explicit “inflation-adjusted” toggle or labeling in the UI.
- [ ] Split visualization of contributions vs. growth (interest).

## Disclaimer

This tool is for **education and planning experiments only**. It simplifies taxes, returns, and inflation. Consult a qualified professional before making financial decisions.
