import React from 'react';
import { ThemeContext } from './Theme';

export default class ThemeToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  sunIcon() {
    return (
      <>
        <span className="visually-hidden">Toggle to dark theme</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          viewBox="0 0 256 256"
          width={this.props.size || '35'}
          height={this.props.size || '35'}
          className="svgIcon"
          aria-hidden="true"
          focusable="false"
        >
          <rect width="256" height="256" fill="none"></rect>
          <circle
            cx="128"
            cy="128"
            r="60"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></circle>
          <line
            x1="128"
            y1="36"
            x2="128"
            y2="28"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></line>
          <line
            x1="62.94618"
            y1="62.94618"
            x2="57.28932"
            y2="57.28932"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></line>
          <line
            x1="36"
            y1="128"
            x2="28"
            y2="128"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></line>
          <line
            x1="62.94618"
            y1="193.05382"
            x2="57.28932"
            y2="198.71068"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></line>
          <line
            x1="128"
            y1="220"
            x2="128"
            y2="228"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></line>
          <line
            x1="193.05382"
            y1="193.05382"
            x2="198.71068"
            y2="198.71068"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></line>
          <line
            x1="220"
            y1="128"
            x2="228"
            y2="128"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></line>
          <line
            x1="193.05382"
            y1="62.94618"
            x2="198.71068"
            y2="57.28932"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></line>
        </svg>
        <style jsx>
          {`
            .stroke {
              stroke: var(--color-icon);
            }
            .fill {
              fill: var(--color-icon);
            }
          `}
        </style>
      </>
    );
  }

  moonIcon() {
    return (
      <>
        <span className="visually-hidden">Toggle to light theme</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={this.props.size || '35'}
          height={this.props.size || '35'}
          fill="#284B63"
          viewBox="0 0 256 256"
          className="svgIcon"
          aria-hidden="true"
          focusable="false"
        >
          <rect width="256" height="256" fill="none"></rect>
          <path
            d="M88,148a68,68,0,1,1,68,68H76a44,44,0,1,1,14.30583-85.62208"
            fill="none"
            stroke="#284B63"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></path>
          <path
            d="M46.99,138.92889A64.12919,64.12919,0,0,1,9.6218,94.37955l.00023-.001A64.0566,64.0566,0,0,0,86.37854,17.622l.00084-.00019A64.02478,64.02478,0,0,1,136,80q0,1.51431-.06961,3.01174"
            fill="none"
            stroke="#284B63"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            className="stroke"
          ></path>
        </svg>
        <style jsx>
          {`
            .stroke {
              stroke: var(--color-icon);
            }
            .fill {
              fill: var(--color-icon);
            }
          `}
        </style>
      </>
    );
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <a href="#" onClick={toggleTheme}>
            {theme === 'light' ? this.moonIcon() : this.sunIcon()}
          </a>
        )}
      </ThemeContext.Consumer>
    );
  }
}
