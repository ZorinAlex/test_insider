const types = ['triangle', 'rectangle', 'circle'];

export function generateElement(rightSide = false) {
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    const invlerp = (x, y, a) => clamp((a - x) / (y - x));
    const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
    const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
    let fullWidth = document.getElementById('fallarea').clientWidth;
    let minSize = 20;
    let maxSize = 50;
    let weight = Math.floor(Math.random() * 9 + 1);
    let size = range(1, 10, minSize, maxSize, weight);
    let typeIndex = Math.floor(Math.random() * 3);
    let type = types[typeIndex];
    let x, y = 0;
    if (rightSide) {
        x = Math.floor(Math.random() * fullWidth / 2) + fullWidth / 2;
        y = y - size;
    } else {
        x = Math.floor(Math.random() * fullWidth / 2);
    }
    return {weight, size, type, x, y}
}