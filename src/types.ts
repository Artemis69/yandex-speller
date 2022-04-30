interface SpellerOptions {
  /**
   * Пропускать слова с цифрами, например, "авп17х4534".
   */
  IGNORE_DIGITS?: boolean;
  /**
   * Пропускать интернет-адреса, почтовые адреса и имена файлов.
   */
  IGNORE_URLS?: boolean;
  /**
   * Подсвечивать повторы слов, идущие подряд. Например, "я полетел на на Кипр".
   */
  FIND_REPEAT_WORDS?: boolean;
  /**
   * Игнорировать неверное употребление ПРОПИСНЫХ/строчных букв, например, в слове "москва".
   */
  IGNORE_CAPITALIZATION?: boolean;
}

type SpellerOptionsKey = keyof SpellerOptions;

type Languages = "ru" | "en" | "uk";
type Lang =
  | `${Languages}`
  | `${Languages},${Languages}`
  | `${Languages},${Languages},${Languages}`;
type Format = "plain" | "html";

interface Options {
  text: string | string[];
  /**
   * Языки проверки.
   * @see https://yandex.ru/dev/speller/doc/dg/reference/checkTexts.html
   */
  lang: Lang;
  /**
   * Опции Яндекс Спеллера.
   * @see https://yandex.ru/dev/speller/doc/dg/reference/checkTexts.html
   */
  options: number;
  /**
   * Формат проверяемого текста.
   * @see https://yandex.ru/dev/speller/doc/dg/reference/checkTexts.html
   */
  format: Format;
}

interface SpellResult {
  /**
   * Код ошибки.
   * @see https://yandex.ru/dev/speller/doc/dg/reference/error-codes.html
   */
  code: number;
  /**
   * Позиция слова с ошибкой.
   */
  pos: number;
  /**
   * Номер строки
   */
  row: number;
  /**
   * Номер столбца
   */
  col: number;
  /**
   * Длина слова с ошибкой
   */
  len: number;
  /**
   * Исходное слово
   */
  word: string;
  /**
   * Подсказка (может быть несколько или могут отсутствовать)
   */
  s: string[];
}

export { SpellerOptions, SpellerOptionsKey, Options, SpellResult };
