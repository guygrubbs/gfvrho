import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ children, variant, onClick, disabled, ...rest }) => {
  // Define variant-specific Tailwind classes
  const baseClasses = 'px-4 py-2 rounded font-semibold focus:outline-none transition-colors';
  const variants = {
    primary: 'bg-[#00A676] text-white hover:bg-[#008B62]',
    secondary: 'bg-[#003366] text-white hover:bg-[#002955]',
    light: 'bg-[#EFEFEF] text-[#003366] hover:bg-gray-300',
  };

  // Use classNames library or a string template to combine classes
  const buttonClasses = classNames(
    baseClasses,
    variants[variant] || variants.primary,
    {
      'opacity-50 cursor-not-allowed': disabled,
    }
  );

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={{ fontFamily: 'Open Sans' }}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'light']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'primary',
  onClick: () => {},
  disabled: false,
};

export default Button;
