import TextUtils from './Text.util';

describe('TextUtils', () => {
    it('Returns a string of asteriks of size 7', () => {
        expect(TextUtils.asteriks(7)).toBe('*******');
    });

    it('Censors a string properly', () => {
        const censored_python = TextUtils.censor('Python', 2);
        expect(censored_python.substring(0, 2)).toBe('Py');
        expect(
            censored_python.substring(2).length > 5 &&
                censored_python.substring(2).length <= 10
        ).toBe(true);

        const censored_password = TextUtils.censor("PA____RD", 2, 4);
        expect(censored_password.indexOf("*")).not.toBe(-1);
    });
});
