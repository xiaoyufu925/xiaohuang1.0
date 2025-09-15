
let video;
let targetColor;
let flowers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  targetColor = color(255, 255, 0);
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);
  video.loadPixels();

  flowers = []; // 每一帧重置花朵列表

  for (let y = 0; y < video.height; y += 15) {
    for (let x = 0; x < video.width; x += 15) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let d = dist(r, g, b, red(targetColor), green(targetColor), blue(targetColor));

      if (d < 80) {
        let screenX = map(x, 0, video.width, 0, width);
        let screenY = map(y, 0, video.height, 0, height);
        flowers.push({ x: screenX, y: screenY, size: 50 });
      }
    }
  }

  // 绘制花朵
  for (let f of flowers) {
    drawFlower(f.x, f.y, f.size);
  }
}

function drawFlower(x, y, size) {
  push();
  translate(x, y);
  noStroke();
  fill(255, 204, 0);
  for (let i = 0; i < 8; i++) {
    ellipse(0, size / 2, size, size / 2);
    rotate(PI / 4);
  }
  fill(255, 150, 0);
  ellipse(0, 0, size);
  pop();
}

// 点击时随机生成几朵绽放的超大花朵
function mousePressed() {
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(80, 120);
    drawFlower(x, y, size);
  }
}
