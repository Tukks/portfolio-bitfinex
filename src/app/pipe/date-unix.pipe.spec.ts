import { DateUnixPipe } from './date-unix.pipe';

describe('DateUnixPipe', () => {
  it('create an instance', () => {
    const pipe = new DateUnixPipe();
    expect(pipe).toBeTruthy();
  });
});
