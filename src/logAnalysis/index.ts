import { EventEmitter } from "events";
import gestaltSimilarity from "gestalt-pattern-matcher";

import { dataPoints } from "./dataPoints";
import { getRegexMatch } from "./getRegexMatch";
import { ILogAnalysisOutput, ILogError, ILogMod } from "./logAnalysisOutput";

export class LogAnalysis {
  private emitter = new EventEmitter();
  private errors: string[] = [];

  constructor(private logs: string[]) {}

  public async analyse(): Promise<ILogAnalysisOutput> {
    const result: Partial<ILogAnalysisOutput> = {};

    for (const dataPointDetector of dataPoints) {
      this.emitter.addListener("log", (log) => {
        const res = dataPointDetector.detector(log);
        if (res) {
          result[dataPointDetector.name] = res;
        }
      });
    }

    this.emitter.addListener("log", (log) => {
      const error = getRegexMatch(/ERR (.+)/, log);
      if (error) {
        this.errors.push(error);
      }
    });

    for (const log of this.logs) {
      this.emitter.emit("log", log);
    }

    return {
      ...result,
      errors: this.getErrors(),
      mods: this.getMods(),
    } as ILogAnalysisOutput;
  }

  private getErrors(): ILogError[] {
    const reducedErrors = this.errors.map((e): ILogError => {
      return {
        message: e,
        count: 1,
      };
    });

    // Reduce total errors based on how similar the strings are
    // And keep track of total amount the error happened
    const reducedErrorsWithCount = reducedErrors.reduce((acc, curr) => {
      const match = acc.find(
        (e) => gestaltSimilarity(e.message, curr.message) > 0.8
      );
      if (match) {
        match.count++;
      } else {
        acc.push({
          message: curr.message,
          count: 1,
        });
      }
      return acc;
    }, [] as ILogError[]);

    return reducedErrorsWithCount;
  }

  private getMods(): ILogMod[] {
    const start = this.logs.findIndex((l) =>
      l.includes("[MODS] Start loading")
    );
    const end = this.logs.findIndex((l) => l.includes("[MODS] Loading done"));
    const modLogs = this.logs.slice(start + 1, end);
    return modLogs
      .filter((l) => l.includes("[MODS] Loaded"))
      .map((l) => {
        return {
          name: getRegexMatch(/\[MODS\] Loaded Mod: (.+) \(/, l),
          version: getRegexMatch(/\[MODS\] Loaded Mod: .+ \((.+)\)/, l),
        };
      });
  }
}
