export const EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const TEXT_MIN =
  (min: number): ((value: string) => boolean) =>
  (value: string): boolean =>
    !!value && value.length >= min;
export const TEXT_MAX =
  (max: number): ((value: string) => boolean) =>
  (value: string): boolean =>
    !!value && value.length <= max;
