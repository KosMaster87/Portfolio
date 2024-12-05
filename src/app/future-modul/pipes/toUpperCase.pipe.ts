import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to transform the given string to uppercase.
 *
 * @remarks
 * If the provided value is falsy (null, undefined, or an empty string),
 * an empty string is returned.
 */
@Pipe({
  name: 'upperCase',
  standalone: true,
})
export class ToUpperCase implements PipeTransform {
  /**
   * Transforms the input string to uppercase.
   *
   * @param {string} value The input string to be transformed.
   * @returns {string} The transformed uppercase string.
   */
  transform(value: string): string {
    if (!value) {
      return '';
    }
    return value.toUpperCase();
  }
}
