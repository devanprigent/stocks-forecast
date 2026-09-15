import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import { Dataset } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

const SERIES_COLORS = [
  { border: "#0d9488", fill: "rgba(13, 148, 136, 0.14)" },
  { border: "#4f46e5", fill: "rgba(79, 70, 229, 0.12)" },
  { border: "#c2410c", fill: "rgba(194, 65, 12, 0.1)" },
];

interface PropsType {
  datasets: Dataset[];
  line: number;
  showGoal: boolean;
}

export function Chart({ datasets, line, showGoal }: Readonly<PropsType>) {
  const datasetCount = datasets.length;

  if (datasetCount === 0) {
    return (
      <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C4.125 11.625 6.75 8.25 9.375 8.25C12.75 8.25 12.75 15.75 16.125 15.75C18.75 15.75 20.25 13.125 21 11.25M21 11.25V15.75M21 11.25H16.5"
            />
          </svg>
        </div>
        <div>
          <p className="font-medium text-slate-800">No scenario selected</p>
          <p className="mt-1 max-w-xs text-sm text-slate-500">
            Choose at least one scenario on the left to plot your projection.
          </p>
        </div>
      </div>
    );
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 18,
          boxWidth: 8,
          font: { family: "'DM Sans', sans-serif", size: 12 },
          color: "#475569",
        },
      },
      title: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.92)",
        titleFont: { family: "'DM Sans', sans-serif", size: 12, weight: 600 },
        bodyFont: { family: "'DM Sans', sans-serif", size: 13 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label(ctx) {
            const v = ctx.parsed.y;
            if (v == null) return "";
            return ` ${ctx.dataset.label}: ${v.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })} €`;
          },
        },
      },
      annotation: showGoal
        ? {
            annotations: {
              line1: {
                type: "line",
                yMin: line,
                yMax: line,
                borderColor: "rgba(13, 148, 136, 0.85)",
                borderDash: [6, 4],
                borderWidth: 2,
                label: {
                  content: "FIRE target (25× spending)",
                  display: true,
                  position: "start",
                  backgroundColor: "rgba(255,255,255,0.95)",
                  color: "#0f766e",
                  font: { size: 11, weight: "bold", family: "'DM Sans', sans-serif" },
                  padding: { x: 8, y: 4 },
                  borderRadius: 4,
                },
              } as unknown as AnnotationOptions<"line">,
            },
          }
        : undefined,
    },
    scales: {
      x: {
        grid: { color: "rgba(148, 163, 184, 0.25)" },
        ticks: {
          color: "#64748b",
          font: { family: "'DM Sans', sans-serif", size: 11 },
        },
        title: {
          display: true,
          text: "Year",
          color: "#94a3b8",
          font: { size: 11, weight: "bold", family: "'DM Sans', sans-serif" },
        },
      },
      y: {
        suggestedMin: 0,
        ...(showGoal
          ? { suggestedMax: line + line / 2 }
          : {}),
        grid: { color: "rgba(148, 163, 184, 0.25)" },
        ticks: {
          color: "#64748b",
          font: { family: "'DM Sans', sans-serif", size: 11 },
          callback(value) {
            const n = Number(value);
            if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
            if (n >= 1e3) return `${(n / 1e3).toFixed(0)}k`;
            return n;
          },
        },
        title: {
          display: true,
          text: "€ (real)",
          color: "#94a3b8",
          font: { size: 11, weight: "bold", family: "'DM Sans', sans-serif" },
        },
      },
    },
  };

  const chartData = {
    labels: datasets[0].data.map((item) => String(item.year)),
    datasets: datasets.map((dataset, index) => {
      const colors = SERIES_COLORS[index % SERIES_COLORS.length];
      return {
        label: dataset.label,
        data: dataset.data.map((item) => item.value),
        borderColor: colors.border,
        backgroundColor: colors.fill,
        fill: "origin" as const,
        tension: 0.22,
        borderWidth: 2.25,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.border,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      };
    }),
  };

  return <Line data={chartData} options={options} />;
}
