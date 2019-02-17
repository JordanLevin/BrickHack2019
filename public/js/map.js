// 20 px tall 4 px wide
// X is a shelf, O is aisle, I is item
let map = [
    'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
    'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
    'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
    'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
    'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
    'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
    'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
    'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
    'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
    'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
    'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'
];


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function render() {
    console.log('HEWWO MR CANVAS');
    var c = document.getElementById('canvasmap');
    var ctx = c.getContext('2d');
    ctx.font = '7px Arial';
    ctx.fillStyle = '#000000';


    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] == 'X') {
                ctx.fillRect(col * 6, row * 20, 4, 20);
            }
            if (map[row][col] == 'I') {
                ctx.fillStyle = '#FF0000';
                ctx.fillRect(col * 6, row * 20, 4, 10);
                ctx.fillStyle = '#000000';
            }
        }
    }

    let x = 0;
    for (let aisle = 21; aisle > 0; aisle--) {
        ctx.fillText(aisle + 'B', x, 60);
        ctx.fillText(aisle + 'A', x, 160);
        x += 18;
    }
}

function draw(aisle, side) {
    let num = parseInt(aisle.substring(0, aisle.length - 1));
    let ab = aisle.substring(aisle.length - 1, aisle.length);
    let xcoord = map[0].length;
    let ycoord = 0;
    if (ab == 'A')
        ycoord = 2;
    else
        ycoord = 8;
    xcoord -= 3 * num;
    if (side == 'Left') xcoord--;
    map[ycoord] = map[ycoord].substring(0, xcoord) + 'I' +
        map[ycoord].substring(xcoord + 1, map[ycoord].length);
    render();

    // console.log(aisle);
    // console.log(side);
}
