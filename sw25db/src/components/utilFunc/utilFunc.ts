import { SetStateAction } from "react";

export const handleChange =
  <
    T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    U extends string | number | SetStateAction<string>
  >(
    setter: (i: U) => void,
    transform: (value: string) => U
  ) =>
  (event: React.ChangeEvent<T>) => {
    setter(transform(event.target.value));
  };

export const changeData = <T>(
  setter: React.Dispatch<React.SetStateAction<T>>,
  data: T,
  compData: T
) => {
  if (data != compData) {
    if (Array.isArray(compData)) {
      if (JSON.stringify(data) !== JSON.stringify(compData)) {
        setter(compData);
      }
    } else {
      setter(compData);
    }
  }
};
