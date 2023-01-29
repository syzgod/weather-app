import { useState } from 'react';

const Checkbox = ({ options }: any) => {
  const [state, setState] = useState(options);

  function handleChange(event: any) {
    const { value } = event.target;
    const newOptions = state.map((option: any) => {
      if (option.value === value) {
        return { ...option, checked: !option.checked };
      }
      return option;
    });
    setState(newOptions);
  }

  return (
    <div>
      {state.map((option: any) => (
        <label key={option.value} className='mx-3'>
          <input
            type='checkbox'
            value={option.value}
            checked={option.checked}
            onChange={handleChange}
            className='mr-1'
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
