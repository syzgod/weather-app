import React, { useContext } from 'react';
import { CheckboxContext } from '../store/checkbox-context';

const Checkbox = ({ options }: any) => {
  const [state, dispatch] = useContext(CheckboxContext);

  return (
    <div>
      {state.checkboxes.map((checkbox) => (
        <label key={checkbox.value} className='mx-3'>
          <input
            type='checkbox'
            value={checkbox.value}
            checked={checkbox.checked}
            onChange={() =>
              dispatch({ type: 'TOGGLE_CHECKBOX', payload: checkbox.value })
            }
            className='mr-1'
          />
          {checkbox.label}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
