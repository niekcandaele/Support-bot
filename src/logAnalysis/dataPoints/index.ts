import { CPU } from "./CPU";
import { OS } from "./OS";
import { RAM } from "./RAM";
import { version } from "./version";

interface ILogDataPoint {
  name: string;
  detector: (log: string) => string;
}

export const dataPoints: ILogDataPoint[] = [OS, RAM, CPU, version];
