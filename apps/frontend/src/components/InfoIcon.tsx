import Tooltip from "@mui/material/Tooltip";

interface Propstype {
  tooltip: string;
}

export function InfoIcon({ tooltip }: Readonly<Propstype>) {
  return (
    <Tooltip
      title={tooltip}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: "rgba(15, 23, 42, 0.95)",
            fontSize: "0.8125rem",
            maxWidth: 280,
            lineHeight: 1.45,
            px: 1.5,
            py: 1,
            borderRadius: "8px",
          },
        },
      }}
    >
      <span
        className="inline-flex cursor-help text-slate-400 transition hover:text-teal-600"
        tabIndex={0}
        role="img"
        aria-label="More info"
      >
        <svg viewBox="0 0 25 25" fill="none" width={18} height={18}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 11V13C5.5 16.3137 8.18629 19 11.5 19H13.5C16.8137 19 19.5 16.3137 19.5 13V11C19.5 7.68629 16.8137 5 13.5 5H11.5C8.18629 5 5.5 7.68629 5.5 11Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.75 16C11.75 16.4142 12.0858 16.75 12.5 16.75C12.9142 16.75 13.25 16.4142 13.25 16H11.75ZM12.5 11H13.25C13.25 10.5858 12.9142 10.25 12.5 10.25V11ZM11.5 10.25C11.0858 10.25 10.75 10.5858 10.75 11C10.75 11.4142 11.0858 11.75 11.5 11.75V10.25ZM12.5 16.75C12.9142 16.75 13.25 16.4142 13.25 16C13.25 15.5858 12.9142 15.25 12.5 15.25V16.75ZM11.5 15.25C11.0858 15.25 10.75 15.5858 10.75 16C10.75 16.4142 11.0858 16.75 11.5 16.75V15.25ZM12.5 15.25C12.0858 15.25 11.75 15.5858 11.75 16C11.75 16.4142 12.0858 16.75 12.5 16.75V15.25ZM13.5 16.75C13.9142 16.75 14.25 16.4142 14.25 16C14.25 15.5858 13.9142 15.25 13.5 15.25V16.75ZM13.25 8C13.25 7.58579 12.9142 7.25 12.5 7.25C12.0858 7.25 11.75 7.58579 11.75 8H13.25ZM11.75 9C11.75 9.41421 12.0858 9.75 12.5 9.75C12.9142 9.75 13.25 9.41421 13.25 9H11.75ZM13.25 16V11H11.75V16H13.25ZM12.5 10.25H11.5V11.75H12.5V10.25ZM12.5 15.25H11.5V16.75H12.5V15.25ZM12.5 16.75H13.5V15.25H12.5V16.75ZM11.75 8V9H13.25V8H11.75Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </Tooltip>
  );
}
