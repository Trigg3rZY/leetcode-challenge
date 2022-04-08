interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = 'hello!';

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: 'delay',
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: 'set-message',
    };
  }
}

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (
  module: EffectModule
) => UnwrapMethods<Pick<EffectModule, ExtractMethodKeys<EffectModule>>>;

// 从接口获取方法名的 union type
type ExtractMethodKeys<T> = {
  [key in keyof T]: T[key] extends (...args: any) => any ? key : never;
}[keyof T];

// 解除方法参数中的 Action，参数和返回中的 Promise
type UnwrapMethods<T> = {
  [key in keyof T]: T[key] extends (input: Promise<infer U>) => Promise<infer R>
    ? (input: U) => R
    : T[key] extends (action: Action<infer O>) => infer P
    ? (action: O) => P
    : never;
};

const connect: Connect = (m) => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: 'set-message',
    payload: input.getMilliseconds(),
  }),
});

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

export const connected: Connected = connect(new EffectModule());
