import i18n from '../../content/i18n';

describe('i18n', () => {
  beforeEach(() => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      locale: 'en',
      defaultLocale: 'en',
    }));
  });

  it('returns a string key', () => {
    const result = i18n('langName');
    expect(result.en).toEqual('English');
  });

  it('returns a string key in a different locale', () => {
    const result = i18n('langName', 'pt-BR');
    expect(result.en).toEqual('Inglês');
  });

  it('returns default locale key in case key is missing', () => {
    const result = i18n('testEnKey', 'pt-BR');
    expect(result).toEqual('test');
  });

  it('returns empty string in case key is missing', () => {
    const result = i18n('missingKey');
    expect(result).toEqual('');
  });

  it('allows interpolating a value', () => {
    const result = i18n('testFunctionKey')(42);
    expect(result).toEqual("I'm 42 years old");
  });
});
