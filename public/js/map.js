function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function render() {
    console.log('HEWWO MR CANVAS');
    var c = document.getElementById('canvasmap');
    var ctx = c.getContext('2d');
    ctx.font = "7px Arial";
    ctx.fillStyle = "#000000";

    //20 px tall 4 px wide
    let map = ['OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
               'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
               'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
               'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
               'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
               'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
               'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
               'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
               'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
               'OOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXOOXO',
               'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'];

    for(let row = 0; row < map.length; row++){
        for(let col = 0; col < map[0].length; col++){
            if(map[row][col] == 'X'){
                ctx.fillRect(col*6, row*20, 4, 20);
            }
        }
    }

    let x = 0;
    for(let aisle = 21; aisle >0; aisle--){
        ctx.fillText(aisle+"B", x, 60);
        ctx.fillText(aisle+"A", x, 160);
        x+=18;

    }
    

}
