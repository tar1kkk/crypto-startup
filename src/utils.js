export const percentDifference = (a,b) => {
    // return 100 * Math.abs((a - b) / ((a + b)/ 2));
    return ((b - a) / Math.abs(a)) * 100;
}