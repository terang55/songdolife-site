type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
  prefix?: string;
  includeTimestamp?: boolean;
  forceLog?: boolean; // 프로덕션에서도 강제로 로그
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, prefix?: string): string {
    const timestamp = new Date().toISOString();
    const levelIcon = {
      debug: '🔍',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌'
    };
    
    const parts = [
      `[${timestamp}]`,
      levelIcon[level],
      prefix ? `[${prefix}]` : '',
      message
    ].filter(Boolean);
    
    return parts.join(' ');
  }

  debug(message: string, data?: unknown, options?: LoggerOptions): void {
    if (this.isDevelopment || options?.forceLog) {
      const formattedMessage = this.formatMessage('debug', message, options?.prefix);
      console.log(formattedMessage, data ? data : '');
    }
  }

  info(message: string, data?: unknown, options?: LoggerOptions): void {
    if (this.isDevelopment || options?.forceLog) {
      const formattedMessage = this.formatMessage('info', message, options?.prefix);
      console.info(formattedMessage, data ? data : '');
    }
  }

  warn(message: string, data?: unknown, options?: LoggerOptions): void {
    // Warning은 프로덕션에서도 출력
    const formattedMessage = this.formatMessage('warn', message, options?.prefix);
    console.warn(formattedMessage, data ? data : '');
  }

  error(message: string, error?: unknown, options?: LoggerOptions): void {
    // Error는 프로덕션에서도 출력
    const formattedMessage = this.formatMessage('error', message, options?.prefix);
    console.error(formattedMessage, error ? error : '');
  }

  // 조건부 로깅 - 개발 환경에서만
  devOnly = {
    log: (message: string, data?: unknown) => this.debug(message, data),
    info: (message: string, data?: unknown) => this.info(message, data),
    warn: (message: string, data?: unknown) => this.isDevelopment && console.warn(message, data),
    error: (message: string, error?: unknown) => this.error(message, error)
  };

  // API별 로거 생성
  createApiLogger(apiName: string) {
    return {
      debug: (message: string, data?: unknown) => this.debug(message, data, { prefix: apiName }),
      info: (message: string, data?: unknown) => this.info(message, data, { prefix: apiName }),
      warn: (message: string, data?: unknown) => this.warn(message, data, { prefix: apiName }),
      error: (message: string, error?: unknown) => this.error(message, error, { prefix: apiName })
    };
  }
}

// 싱글톤 인스턴스 생성
export const logger = new Logger();

// API별 로거 팩토리 함수들
export const createWeatherLogger = () => logger.createApiLogger('WEATHER');
export const createRealEstateLogger = () => logger.createApiLogger('REALESTATE');
export const createNewsLogger = () => logger.createApiLogger('NEWS');
export const createBusLogger = () => logger.createApiLogger('BUS');
export const createSubwayLogger = () => logger.createApiLogger('SUBWAY');
export const createMedicalLogger = () => logger.createApiLogger('MEDICAL');

// 기본 export
export default logger; 