import { CheckboxState, Action } from '../store/checkbox-context';

export const checkboxReducer = (state: CheckboxState, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      return {
        ...state,
        checkboxes: state.checkboxes.map((checkbox) =>
          checkbox.value === action.payload
            ? { ...checkbox, checked: !checkbox.checked }
            : checkbox
        ),
      };
    default:
      return state;
  }
};
