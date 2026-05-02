// Поля сейчас это новая задача и поиск задач
export const Field = (props) => {
  const {
    className = '',
    id,
    label,
    type = 'text',
    onInput,
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
        className="field__input"
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value} //useState добавление задачи
        onInput={onInput}
        ref={ref}
      />
    </div>
  );
};
