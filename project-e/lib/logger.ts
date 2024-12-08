type LogLevel = 'info' | 'warn' | 'error';

interface LogMessage {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

export const logger = {
  info: (message: string, data?: any) => log('info', message, data),
  warn: (message: string, data?: any) => log('warn', message, data),
  error: (message: string, data?: any) => log('error', message, data)
};

function log(level: LogLevel, message: string, data?: any) {
  const logMessage: LogMessage = {
    level,
    message,
    data,
    timestamp: new Date().toISOString()
  };

  if (level === 'error') {
    console.error(JSON.stringify(logMessage, null, 2));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(logMessage, null, 2));
  } else {
    console.log(JSON.stringify(logMessage, null, 2));
  }
}