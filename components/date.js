import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        width="25"
        height="25"
        fill="#000000"
        viewBox="0 0 256 256"
        aria-hidden="true"
      >
        <rect width="256" height="256" fill="none"></rect>
        <rect
          x="40"
          y="40"
          width="176"
          height="176"
          rx="8"
          strokeWidth="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        ></rect>
        <line
          x1="176"
          y1="24"
          x2="176"
          y2="56"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="80"
          y1="24"
          x2="80"
          y2="56"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="40"
          y1="88"
          x2="216"
          y2="88"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
      </svg>
      <time dateTime={dateString}>{format(date, 'yyyy-MM-dd')}</time>
      <style jsx>
        {`
          time {
            margin-right: 10px;
          }
          .icon {
            vertical-align: bottom;
            margin: 0;
            margin-right: 5px;
          }
          .icon line,
          .icon rect[stroke] {
            stroke: var(--color-text-link);
          }
        `}
      </style>
    </p>
  );
}
