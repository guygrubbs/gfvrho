import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, name, type, value, onChange, placeholder, required }) => {
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={name} 
          className="block mb-1 text-sm font-medium text-gray-700"
          style={{ fontFamily: 'Poppins' }}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00A676] text-sm"
        style={{ fontFamily: 'Open Sans' }}
      />
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

TextField.defaultProps = {
  label: '',
  type: 'text',
  value: '',
  onChange: () => {},
  placeholder: '',
  required: false,
};

export default TextField;
