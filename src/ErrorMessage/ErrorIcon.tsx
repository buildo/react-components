import * as React from "react";

export default class ErrorIcon extends React.Component<{}> {
  render() {
    return (
      <svg viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          transform="matrix(1 0 0 -1 -4 20)"
          d="M11.2 16h1.6v-4.8h-1.6V16zM12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.4c-3.52 0-6.4-2.88-6.4-6.4 0-3.52 2.88-6.4 6.4-6.4 3.52 0 6.4 2.88 6.4 6.4 0 3.52-2.88 6.4-6.4 6.4zm-.8-8.8h1.6V8h-1.6v1.6z"
        />
      </svg>
    );
  }
}
