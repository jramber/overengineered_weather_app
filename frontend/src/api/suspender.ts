/* eslint-disable */
export const getSuspender = <T>(promise: Promise<T>): { read: () => T } => {
  let status: string = 'pending';
  let response: T;

  const suspender = promise.then(
    (res: T) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      response = err;
    },
  );

  const read = (): T => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
};
/* eslint-enable */
