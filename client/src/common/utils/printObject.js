export default function printObj(obj) {
    let output = '';
    for (const key in obj) {
        const value = obj[key];
        output += value + '\n';
    }
    return output;
}
