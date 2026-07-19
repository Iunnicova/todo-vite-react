//? БЕЗОПАСНОСТЬ

//! escapeHTML-будет экранировать потенциально опасные символы, что бы текст не превращался в HTML в качестве параметра приходит не безопасная строка unsafeString
const escapeHTML = (unsafeString) => {
  return unsafeString
    .replaceAll(/&/g, '&amp;')
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;')
    .replaceAll(/"/g, '&quot;')
    .replaceAll(/'/g, '&#39;');
};

//! escapeRegExp -будет экранировать спецсимволы что бы при их вводе в поисковую функция подсветки не путала символы с паттернами регулярки(без этой функции если мы введем в поле поиска символ точки , то подсвечиваться в результатах будет любой символ)
const escapeRegExp = (unsafeString) => {
  return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

//! Принимает в параметрах строку текст и строку query. Оригинальный текст и то, что ввели в поле поиска
export const highlightCaseInsensitive = (text, query) => {
  const safeText = escapeHTML(text);
  const queryFormatted = query.trim(); //если состоит из пробелов подсвечивать не нужно

  if (queryFormatted.length === 0) {
    return safeText;
  }

  const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig');

  return safeText.replace(pattern, `<mark>$&</mark>`);
};
