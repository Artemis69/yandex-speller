# Yandex.Speller

## [Условия использования сервиса «API Яндекс.Спеллер»](https://yandex.ru/legal/speller_api/)

## Отличия от [yandex-speller](https://github.com/hcodes/yandex-speller/)

- Отсутствуют [коды ошибок](https://yandex.ru/dev/speller/doc/dg/reference/error-codes.html)
- Отсутствуют опции `requestLimit` и `timeout`
- Присутствуют только задокументированные [настройки](https://yandex.ru/dev/speller/doc/dg/reference/speller-options.html) Спеллера
- Присутствуют объявления типов
- Работает в браузере и Node >= 18.0.0

## Использование

```js
import {
  checkText,
  checkTexts,
  getSpellerOptions,
} from "@artemis69/yandex-speller";

// Использование стандартных значений
let checkResult = await checkText("Я хачу пиццы");

// Использование пользовательских опций
checkResult = await checkText("<p>I want some pizda</p>", {
  lang: "en",
  format: "html",
  options: getSpellerOptions({
    IGNORE_DIGITS: true,
  }),
});

// Использование функции checkTexts
checkResult = await checkTexts([
  "Я хочу пиццы.",
  "Поэтому я пошол в могозин и купил её.",
]);

// Использование функции checkTexts с пользовательскими опциями
checkResult = await checkTexts(
  ["<h1>I want pizza</h1>", "<p>So I went to the stare and bought it.</p>"],
  {
    lang: "en",
    format: "html",
  }
);
```
