export interface ILogAnalysisOutput {
  version: string;
  OS: string;
  RAM: string;
  CPU: string;

  errors: ILogError[];
  mods: ILogMod[];
}

export interface ILogError {
  message: string;
  count: number;
}

export interface ILogMod {
  name: string;
  version: string;
}
