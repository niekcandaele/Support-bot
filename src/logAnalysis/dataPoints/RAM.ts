import { getRegexMatch } from "../getRegexMatch";

export const RAM = {
  name: "RAM",
  detector: (log: string): string => {
    return getRegexMatch(/RAM: (.+)/, log);
  },
};
