import { createContext, Dispatch } from 'react';

export type CheckboxState = {
  checkboxes: Array<{
    label: string;
    value: string;
    checked: boolean;
  }>;
};

export type Action = {
  type: string;
  payload: string;
};

export const CheckboxContext = createContext<[CheckboxState, Dispatch<Action>]>(
  [
    {
      checkboxes: [],
    },
    () => {},
  ]
);
