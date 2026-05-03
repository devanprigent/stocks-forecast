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
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import { Dataset } from "./types";

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

interface PropsType {
  datasets: Dataset[];
  line: number;
  showGoal: boolean;
}

export function Chart({ datasets, line, showGoal }: Readonly<PropsType>) {
  const datasetCount = datasets.length;

  if (datasetCount === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        No scenario selected
      </div>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
      annotation: showGoal
        ? {
            annotations: {
              line1: {
                type: "line",
                yMin: line,
                yMax: line,
                borderColor: "black",
                borderWidth: 2,
                label: {
                  content: "Target",
                  enabled: true,
                  position: "center",
                },
              } as AnnotationOptions<"line">,
            },
          }
        : undefined,
    },
    scales: showGoal
      ? {
          y: {
            suggestedMin: 0,
            suggestedMax: line + line / 2,
          },
        }
      : undefined,
  };

  const chartData = {
    labels: datasets[0].data.map((item) => item.year),
    datasets: datasets.map((dataset, index) => {
      const { borderColor, backgroundColor } = generateColor(index, datasetCount);
      return {
        label: dataset.label,
        data: dataset.data.map((item) => item.value),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: "origin",
      };
    }),
  };

  function generateColor(
    index: number,
    total: number
  ): { borderColor: string; backgroundColor: string } {
    const hue = (index / total) * 360;
    return {
      borderColor: `hsl(${hue}, 70%, 50%)`,
      backgroundColor: `hsla(${hue}, 70%, 50%, 0.3)`,
    };
  }

  return <Line data={chartData} options={options} />;
}
