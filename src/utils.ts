import {
  SpellerOptions,
  SpellerOptionsKey,
  Options,
  SpellResult,
} from "./types";

/**
 * @param method Один из доступных методов API
 * @see https://yandex.ru/dev/speller/doc/dg/concepts/api-overview.html
 */
const getRequestURL = <T extends "checkText" | "checkTexts">(method: T) => {
  const base = "https://speller.yandex.net/services/spellservice.json/";
  return (base + method) as `${typeof base}${T}`;
};

const spellerOptionsMap: Record<SpellerOptionsKey, number> = {
  IGNORE_DIGITS: 2,
  IGNORE_URLS: 4,
  FIND_REPEAT_WORDS: 8,
  IGNORE_CAPITALIZATION: 512,
};

/**
 * @param options Настройки Яндекс Спеллера
 * @see https://yandex.ru/dev/speller/doc/dg/reference/speller-options.html
 */
const getSpellerOptions = (options: SpellerOptions = {}) => {
  let sum = 0;

  for (const key of Object.keys(options)) {
    if (!options[key as SpellerOptionsKey]) continue;

    const value = spellerOptionsMap[key as SpellerOptionsKey];

    if (value) sum += value;
  }

  return sum;
};

const makeRequest = (url: string, options: Options) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(options)) {
    if (Array.isArray(value)) {
      for (const val of value) {
        params.append(key, val);
      }
    } else {
      params.append(key, value);
    }
  }

  const promise: Promise<SpellResult[] | SpellResult[][]> = new Promise(
    (resolve) => {
      fetch(url, {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (!response.ok) return resolve([]);

          try {
            response.json().then((json) => resolve(json));
          } catch {
            resolve([]);
          }
        })
        .catch(() => resolve([]));
    }
  );

  return promise;
};

const defaultOptions = (options?: Partial<Options>) => {
  options ||= {};

  options.format ||= "plain";
  options.lang ||= "ru,en,uk";
  options.options ||= 0;

  return options as Omit<Options, "text">;
};

export { getRequestURL, getSpellerOptions, makeRequest, defaultOptions };
