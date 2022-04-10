export interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    filename: string;
  }>;
}

export function parseError(err: Error): ErrorMessage {
  // implement
  if (typeof err.stack === 'undefined') {
    return {
      message: '',
      stack: [],
    };
  }
  const [, ...stackStrings] = err.stack.split(`\n`);
  // parse error stack
  const stack = stackStrings
    .map(parseErrorStack)
    .filter((stackItem): stackItem is StackItem => stackItem != null);

  return {
    message: err.message,
    stack,
  };
}

type StackItem = ErrorMessage['stack'] extends Array<infer T> ? T : never;

function parseErrorStack(stackString: string): StackItem | null {
  const reg = /^.*(https?:\/\/.+):(\d+):(\d+)$/;
  const match = stackString.match(reg);
  if (match == null) {
    return null;
  }
  return {
    line: +match[2],
    column: +match[3],
    filename: match[1],
  };
}
