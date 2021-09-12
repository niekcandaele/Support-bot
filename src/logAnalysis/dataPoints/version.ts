import { getRegexMatch } from "../getRegexMatch";

export const version = {
  name: "version",
  detector: (log: string): string => {
    return getRegexMatch(/INF Version: (.+)/, log);
  },
};
