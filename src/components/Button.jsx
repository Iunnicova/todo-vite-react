export const Button = (props) => {
  const {
    className = '',
    type = 'button',
    children,
    onClick,
  } = props;

  return (
    <button
      className={`button ${className}`}
      type={type}
      onClick={onClick}
    >
      {/* Добавить */}
      {children}
    </button>
  );
};

// export default Button
