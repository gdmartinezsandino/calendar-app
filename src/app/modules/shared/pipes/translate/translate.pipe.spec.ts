import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;

  beforeEach(() => {
    pipe = new TranslatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
