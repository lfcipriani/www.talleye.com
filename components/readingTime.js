export default function ReadingTime({ minutes }) {
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
        <circle
          cx="128"
          cy="128"
          r="88"
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="16"
        ></circle>
        <line
          x1="128"
          y1="128"
          x2="167.59798"
          y2="88.40202"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="104"
          y1="8"
          x2="152"
          y2="8"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
      </svg>
      {minutes} min
      <style jsx>
        {`
          .icon {
            vertical-align: bottom;
            margin: 0;
            margin-right: 5px;
          }
          .icon line,
          .icon circle {
            stroke: var(--color-text-link);
          }
        `}
      </style>
    </p>
  );
}
