/**
 * @fileoverview DI contract for translating SwUpdateService's user-facing strings
 * @description Decouples the service from any concrete TranslationService implementation.
 * Consumers bind their own translator via:
 * `{ provide: SwUpdateTranslator, useExisting: TranslationService }`
 */

export abstract class SwUpdateTranslator {
  abstract instant(key: string): string;
}
