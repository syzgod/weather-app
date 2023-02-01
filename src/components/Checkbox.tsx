import React from 'react';

interface CheckboxProps {
  options: any[];
}

const Checkbox = ({ options }: CheckboxProps) => {
  return (
    <div>
      {options.map((option: any) => (
        <label key={option.value} className='mx-3'>
          <input
            type='checkbox'
            value={option.value}
            checked={option.checked}
            className='mr-1'
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
