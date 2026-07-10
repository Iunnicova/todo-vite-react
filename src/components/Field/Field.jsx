// Поля сейчас это новая задача и поиск задач
import styles from './Field.module.scss';

export const Field = (props) => {
  const {
    className = '',
    id,
    label,
    type = 'text',
    onInput,
    error,
    value, //useState добавление задачи
    ref,
  } = props;

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={id}>
        {/* Новая задача*/}
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.isInvalid : ''}`} //выводится ошибка если пользователь вводит пробелы в задачи
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value} //useState добавление задачи
        onInput={onInput}
        ref={ref}
      />
      {/* выводится ошибка если пользователь вводит пробелы в задачи */}
      {error && (
        <span className={styles.error} title={'error'}>
          {error}
        </span>
      )}
    </div>
  );
};
