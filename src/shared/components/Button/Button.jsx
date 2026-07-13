import styles from './Button.module.scss';

const Button = (props) => {
  const {
    className = '',
    type = 'button',
    children,
    isDisabled,
    onClick,
  } = props;

  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      disabled={isDisabled} //не нажимается кнопка новая задача пока пустое поле
      onClick={onClick}
    >
      {/* Добавить */}
      {children}
    </button>
  );
};

export default Button;
