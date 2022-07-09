export enum SeverityLevel {
    Verbose = 0,
    Information = 1,
    Warning = 2,
    Error = 3,
    Critical = 4,
}

export interface ILogger {
    Log(level: SeverityLevel, message: string, error?: Error, properties?: { [name: string]: string }): void;
}