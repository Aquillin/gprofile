export default class TextUtils {
    /**
     * Creates a chain of asteriks.
     * 
     * @param count - Number of asteriks to produce 
     * @returns a string of asteriks of size count.
     */
    public static asteriks(count: number) {
        let str = "";
        for(var i = 0; i < count; i++) {str += "*"}
        return str;
    }

    /**
     * TODO - This command breaks when the inputs are negative for either `start` or `len`
     * 
     * @param str - The string to censor
     * @param start - The start index to censor from, can be a positive or negative index.
     * @param length - The length to censor, can be negative or positive.
     */
    public static censor(str: string, start: number, len?: number) {
        const index = start % str.length;
        const length = len !== undefined ? len : str.length - index - 1;
        let min: number;
        let max: number;

        if(length < 0) {
            min = start + length;
            max = start;
        } else {
            min = start;
            max = start + length;
        }

        const prefix = str.substring(0, min);
        const suffix = str.substring(max + 1);

        return prefix + this.asteriks(Math.floor(Math.random() * 5) + 6) + suffix;
    }
}