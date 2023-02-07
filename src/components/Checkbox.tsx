import React, { useContext } from 'react';
import { CheckboxContext } from '../store/checkbox-context';

const Checkbox = ({ options }: any) => {
  const [state, dispatch] = useContext(CheckboxContext);

  return (
    <div>
      {state.checkboxes.map((checkbox) => (
        <label
          key={checkbox.value}
          className='relative inline-flex cursor-pointer items-center'
        >
          <input
            type='checkbox'
            value={checkbox.value}
            checked={checkbox.checked}
            onChange={() =>
              dispatch({ type: 'TOGGLE_CHECKBOX', payload: checkbox.value })
            }
            className='peer sr-only'
          />
          <div className="peer h-5 w-9 rounded-full border border-gray-300 bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-800 dark:border-gray-300 dark:bg-gray-400 dark:peer-focus:ring-slate-300"></div>
          <span className='mx-2 text-sm font-medium text-gray-700 dark:text-slate-300'>
            {checkbox.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
