import { useState, useRef, useId } from 'react';
import './CurvedInput.css';

export default function CurvedInput({
  type = 'text',
  placeholder = 'Type here...',
  buttonText = 'Submit',
  onSubmit,
  onChange,
  value: externalValue,
  showButton = true,
  theme = 'dark',
  bend = 20,
  height = 60
}) {
  const [internalVal, setInternalVal] = useState('');
  const inputId = useId();
  const pathId = `curved-path-${inputId.replace(/:/g, '')}`;

  const val = externalValue !== undefined ? externalValue : internalVal;

  const handleChange = (e) => {
    const v = e.target.value;
    if (onChange) onChange(v);
    else setInternalVal(v);
  };

  const handleAction = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSubmit) onSubmit(val);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAction(e);
    }
  };

  return (
    <div className={`curved-input-container theme-${theme}`}>
      <svg className="curved-svg" viewBox="0 0 500 80" preserveAspectRatio="none">
        <path
          id={pathId}
          d={`M 10,40 Q 250,${40 + bend} 490,40`}
          fill="none"
          stroke="rgba(255, 107, 0, 0.4)"
          strokeWidth="2"
        />
      </svg>

      <div className="curved-input-box">
        <input
          type={type}
          value={val}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="curved-real-input"
        />
        {showButton && (
          <button type="button" className="curved-submit-btn" onClick={handleAction}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
