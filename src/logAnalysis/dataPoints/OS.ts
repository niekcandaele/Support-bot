import { getRegexMatch } from "../getRegexMatch";

export const OS = {
  name: "OS",
  detector: (log: string): string => {
    return getRegexMatch(/OS: (.+)/, log);
  },
};
