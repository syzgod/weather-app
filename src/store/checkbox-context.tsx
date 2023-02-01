import React, { useReducer } from 'react';

const CheckboxContext = React.createContext({
  checkboxes: [],
  handleChange: (value: any) => {},
});

const checkboxReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      return {
        checkboxes: state.checkboxes.map((option: any) =>
          option.value === action.value
            ? { ...option, checked: !option.checked }
            : option
        ),
      };
    default:
      return state;
  }
};

interface CheckboxProviderProps {
  options: any[];
  children: React.ReactNode;
}

const CheckboxProvider = ({ options, children }: CheckboxProviderProps) => {
  const [state, dispatch] = useReducer(checkboxReducer, {
    checkboxes: options,
  });

  return (
    <CheckboxContext.Provider value={state}>
      {children}
    </CheckboxContext.Provider>
  );
};

export { CheckboxContext, CheckboxProvider };
