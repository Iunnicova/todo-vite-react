// Поля сейчас это новая задача и поиск задач
import './field.scss';

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
    <div className={`field ${className}`}>
      <label
        className="field__label"
        htmlFor={id}
      >
        {/* Новая задача*/}
        {label}
      </label>
      <input
        className={`field__input ${error ? 'is-invalid' : ''}`} //выводится ошибка если пользователь вводит пробелы в задачи
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
        <span
          className="field__error"
          title={'error'}
        >
          {error}
        </span>
      )}
    </div>
  );
};
