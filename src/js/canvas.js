import {randomIntFromRange,randomColor} from './utils';
console.log(document.documentElement.clientWidth);
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
console.log(canvas.width);


canvas.height=window.innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

var gravity =1;

var friction=0.59;

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});


addEventListener('click', () => {
    

    init();
});

// Objects 單顆球球 地心引力
// class Ball {
//     constructor(x,y,dy, radius, color) {
//         this.x = x
//         this.y = y
//         this.dy=dy
//         this.radius = radius
//         this.color = color
//     }

//     draw() {
//         c.beginPath()
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//         c.fillStyle = this.color
//         c.fill()
//         c.closePath()
//     }

//     update() { 
//         if(this.y+this.radius>canvas.height){
//             this.dy=-this.dy*friction
//         }else{
//             this.dy +=gravity
//             console.log(this.dy)
//         }
//         this.y +=this.dy
//         this.draw()
//     }
// }

// // Implementation
// let ball
// function init() {
//     ball =new Ball(canvas.width/2,canvas.height/2,2,30,'red')
// }

// // Animation Loop
// function animate() {
//     requestAnimationFrame(animate)
//     c.clearRect(0, 0, canvas.width, canvas.height)
//     ball.update()
//     // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
//     // objects.forEach(object => {
//     //  object.update()
//     // })
// }

// init()
// animate()



class Ball {
    constructor(x,y,dx,dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dy=dy;
        this.dx=dx;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        // c.closePath()
    }

    update() { 
        if(this.y+this.radius+this.dy>canvas.height){
            this.dy=-this.dy*friction;
        }else{
            this.dy +=gravity;
        }

        if(this.x+this.radius+this.dx>canvas.width||this.x-this.radius<=0){
            this.dx=-this.dx;
        }
        this.x +=this.dx;
        this.y +=this.dy;
        this.draw();
    }
}

// Implementation
let ball;
let ballArray=[];
function init() {
    ballArray=[];
    for(var i=0;i<100;i++){
        var radius=randomIntFromRange(8,20);
        
        // canvas.height-radius為了不讓球球被銀幕的寬截斷
        var x=randomIntFromRange(radius,canvas.width-radius);
        // canvas.height-radius為了不讓球球被銀幕的高截斷
        var y=randomIntFromRange(0,canvas.height-radius);

        var dx =randomIntFromRange(-2,2);
        var dy=randomIntFromRange(-2,2);
        var color =randomColor(colors);
        ballArray.push(new Ball(x,y,dx,dy,radius,color));
    }  
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0;i<ballArray.length;i++){
        ballArray[i].update();
    }
    // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    // objects.forEach(object => {
    //  object.update()
    // })
}
console.log(document.documentElement.clientWidth);
init();
animate();
