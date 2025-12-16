import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { httpErrorInterceptor } from './http-error.interceptor';
import { environment } from '../../../environments/environment';

describe('httpErrorInterceptor', () => {
  let consoleErrorSpy: jasmine.Spy;
  let nextHandler: jasmine.Spy;
  let request: HttpRequest<any>;

  beforeEach(() => {
    consoleErrorSpy = spyOn(console, 'error');
    request = new HttpRequest('GET', '/api/test');
  });

  afterEach(() => {
    consoleErrorSpy.calls.reset();
  });

  describe('Successful requests', () => {
    it('should pass through successful responses', (done) => {
      const mockResponse = new HttpResponse({ status: 200, body: { data: 'test' } });
      nextHandler = jasmine.createSpy('next').and.returnValue(of(mockResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        next: (response) => {
          expect(response).toBe(mockResponse);
          expect(consoleErrorSpy).not.toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('Client-side errors', () => {
    it('should handle ErrorEvent errors', (done) => {
      const clientError = new ErrorEvent('Network error', {
        message: 'Connection failed',
      });
      const errorResponse = new HttpErrorResponse({
        error: clientError,
        status: 0,
        statusText: 'Unknown Error',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error).toBe(errorResponse);
          expect(error.error).toBe(clientError);
          done();
        },
      });
    });

    it('should log client-side errors in non-production', (done) => {
      const originalProduction = environment.production;
      (environment as any).production = false;

      const clientError = new ErrorEvent('Network error', {
        message: 'Connection failed',
      });
      const errorResponse = new HttpErrorResponse({
        error: clientError,
        status: 0,
        statusText: 'Unknown Error',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: () => {
          expect(consoleErrorSpy).toHaveBeenCalled();
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'HTTP Error:',
            jasmine.stringContaining('Error: Connection failed'),
            errorResponse
          );
          (environment as any).production = originalProduction;
          done();
        },
      });
    });

    it('should not log client-side errors in production', (done) => {
      const originalProduction = environment.production;
      (environment as any).production = true;

      const clientError = new ErrorEvent('Network error', {
        message: 'Connection failed',
      });
      const errorResponse = new HttpErrorResponse({
        error: clientError,
        status: 0,
        statusText: 'Unknown Error',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: () => {
          expect(consoleErrorSpy).not.toHaveBeenCalled();
          (environment as any).production = originalProduction;
          done();
        },
      });
    });
  });

  describe('Server-side errors', () => {
    it('should handle 404 errors', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: 'Not Found',
        status: 404,
        statusText: 'Not Found',
        url: '/api/test',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          expect(error).toBe(errorResponse);
          done();
        },
      });
    });

    it('should handle 500 errors', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: 'Internal Server Error',
        status: 500,
        statusText: 'Internal Server Error',
        url: '/api/test',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error).toBe(errorResponse);
          done();
        },
      });
    });

    it('should log server-side errors in non-production', (done) => {
      const originalProduction = environment.production;
      (environment as any).production = false;

      const errorResponse = new HttpErrorResponse({
        error: 'Server error',
        status: 500,
        statusText: 'Internal Server Error',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: () => {
          expect(consoleErrorSpy).toHaveBeenCalled();
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'HTTP Error:',
            jasmine.stringContaining('Error Code: 500'),
            errorResponse
          );
          (environment as any).production = originalProduction;
          done();
        },
      });
    });

    it('should not log server-side errors in production', (done) => {
      const originalProduction = environment.production;
      (environment as any).production = true;

      const errorResponse = new HttpErrorResponse({
        error: 'Server error',
        status: 500,
        statusText: 'Internal Server Error',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: () => {
          expect(consoleErrorSpy).not.toHaveBeenCalled();
          (environment as any).production = originalProduction;
          done();
        },
      });
    });

    it('should handle 401 unauthorized errors', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: 'Unauthorized',
        status: 401,
        statusText: 'Unauthorized',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(401);
          done();
        },
      });
    });

    it('should handle 403 forbidden errors', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: 'Forbidden',
        status: 403,
        statusText: 'Forbidden',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(403);
          done();
        },
      });
    });
  });

  describe('Error propagation', () => {
    it('should re-throw errors after handling', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: 'Test error',
        status: 400,
        statusText: 'Bad Request',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        next: () => fail('Should not emit next'),
        error: (error: HttpErrorResponse) => {
          expect(error).toBe(errorResponse);
          expect(error instanceof HttpErrorResponse).toBe(true);
          done();
        },
      });
    });

    it('should preserve error details', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: { message: 'Validation failed', fields: ['email', 'password'] },
        status: 422,
        statusText: 'Unprocessable Entity',
        url: '/api/validate',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.error).toEqual({
            message: 'Validation failed',
            fields: ['email', 'password'],
          });
          expect(error.status).toBe(422);
          expect(error.url).toBe('/api/validate');
          done();
        },
      });
    });
  });

  describe('Unknown errors', () => {
    it('should handle errors without specific type', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: null,
        status: 0,
        statusText: 'Unknown Error',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(request, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error).toBe(errorResponse);
          done();
        },
      });
    });
  });

  describe('Request types', () => {
    it('should handle POST requests', (done) => {
      const postRequest = new HttpRequest('POST', '/api/data', { name: 'test' });
      const errorResponse = new HttpErrorResponse({
        error: 'Bad Request',
        status: 400,
        statusText: 'Bad Request',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(postRequest, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          done();
        },
      });
    });

    it('should handle PUT requests', (done) => {
      const putRequest = new HttpRequest('PUT', '/api/data/1', { name: 'updated' });
      const errorResponse = new HttpErrorResponse({
        error: 'Not Found',
        status: 404,
        statusText: 'Not Found',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(putRequest, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          done();
        },
      });
    });

    it('should handle DELETE requests', (done) => {
      const deleteRequest = new HttpRequest('DELETE', '/api/data/1');
      const errorResponse = new HttpErrorResponse({
        error: 'Forbidden',
        status: 403,
        statusText: 'Forbidden',
      });

      nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

      httpErrorInterceptor(deleteRequest, nextHandler).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(403);
          done();
        },
      });
    });
  });
});
