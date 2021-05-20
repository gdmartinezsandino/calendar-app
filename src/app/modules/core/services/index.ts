import { LoggingHttpInterceptor } from './interceptors/logging-http-interceptor';

export const services: any[] = [
  LoggingHttpInterceptor,
];

export * from './interceptors/logging-http-interceptor';
