export const handleChange = (dispatch: any, value: string) => {
  dispatch({ type: 'TOGGLE_CHECKBOX', payload: value });
};
