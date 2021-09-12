import { getRegexMatch } from "../getRegexMatch";

export const CPU = {
  name: "CPU",
  detector: (log: string): string => {
    return getRegexMatch(/CPU: (.+)/, log);
  },
};
