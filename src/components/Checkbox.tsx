import { useState } from 'react';

const Checkbox = ({ options }: any) => {
  const [checkboxes, setCheckboxes] = useState(options);

  function handleChange(event: any) {
    const { value } = event.target;
    const newOptions = checkboxes.map((option: any) => {
      if (option.value === value) {
        return { ...option, checked: !option.checked };
      }
      return option;
    });
    setCheckboxes(newOptions);
  }

  return (
    <div>
      {checkboxes.map((option: any) => (
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
