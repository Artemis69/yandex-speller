export * from "./types";
export * from "./utils";

import { Options, SpellResult } from "./types";
import { makeRequest, getRequestURL, defaultOptions } from "./utils";

const checkText = (text: string, options: Partial<Options>) => {
  const url = getRequestURL("checkText");

  options = defaultOptions(options);

  if (!options.text) options.text = text;

  return makeRequest(url, options as Options) as Promise<SpellResult[]>;
};

const checkTexts = (texts: string[], options: Partial<Options>) => {
  const url = getRequestURL("checkTexts");

  options = defaultOptions(options);

  if (!options.text) options.text = texts;

  return makeRequest(url, options as Options) as Promise<SpellResult[][]>;
};

export { checkText, checkTexts };
