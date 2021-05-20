import { EllipsisPipe } from './ellipsis/ellipsis.pipe';
import { TranslatePipe } from './translate/translate.pipe';

export const pipes: any[] = [
  EllipsisPipe,
  TranslatePipe
];

export * from './ellipsis/ellipsis.pipe';
export * from './translate/translate.pipe';
