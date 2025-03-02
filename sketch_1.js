let num1, num2, sum;
let circlesLeft = [];
let circlesRight = [];
let answerInput;
let answer = 0;
let boxWidth, boxHeight; // 方框的寬度和高度
let leftBoxX, leftBoxY, rightBoxX, rightBoxY; // 方框的 x 和 y 座標

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateBoxPositions(); // 計算方框的位置和尺寸
  generateQuestion();
  textSize(30); // 調整文字大小
  answerInput = createInput('0'); // 初始化為 '0'
  answerInput.position(200, 40); // 調整位置
  answerInput.style('font-size', '30px'); // 設定文字框文字大小
}

function draw() {
  background(220);
  drawBoxes(); // 繪製左右兩個方框
  drawCircles();
  displayQuestion();
}

function calculateBoxPositions() {
  boxWidth = width / 4; // 方框的寬度為視窗寬度的 1/4
  boxHeight = height / 2; // 方框的高度為視窗高度的 1/4

  leftBoxX = width / 4 - boxWidth / 2; // 左邊方框的 x 座標
  leftBoxY = height / 2 - boxHeight / 2; // 左邊方框的 y 座標
  rightBoxX = width * 3 / 4 - boxWidth / 2; // 右邊方框的 x 座標
  rightBoxY = height / 2 - boxHeight / 2; // 右邊方框的 y 座標
}

function drawBoxes() {
  // 繪製左邊方框
  fill(200);
  rect(leftBoxX, leftBoxY, boxWidth, boxHeight);

  // 繪製右邊方框
  fill(230);
  rect(rightBoxX, rightBoxY, boxWidth, boxHeight);
}

function generateQuestion() {
  num1 = floor(random(10));
  num2 = floor(random(10));
  sum = num1 + num2;

  circlesLeft = [];
  for (let i = 0; i < num1; i++) { // num1 的圓在左邊
    circlesLeft.push({
      x: random(leftBoxX + 25, leftBoxX + boxWidth - 25), // 限制在左邊方框內
      y: random(leftBoxY + 25, leftBoxY + boxHeight - 25),
      diameter: 50, // 調整圓形大小
      visible: true,
      color: color(random(255), random(255), random(255)) // 隨機顏色
    });
  }

  circlesRight = [];
  for (let i = 0; i < num2; i++) { // num2 的圓在右邊
    circlesRight.push({
      x: random(rightBoxX + 25, rightBoxX + boxWidth - 25), // 限制在右邊方框內
      y: random(rightBoxY + 25, rightBoxY + boxHeight - 25),
      diameter: 50, // 調整圓形大小
      visible: true,
      color: color(random(255), random(255), random(255)) // 隨機顏色
    });
  }
}

function drawCircles() {
  for (let i = 0; i < circlesLeft.length; i++) {
    if (circlesLeft[i].visible) {
      fill(circlesLeft[i].color);
      ellipse(circlesLeft[i].x, circlesLeft[i].y, circlesLeft[i].diameter, circlesLeft[i].diameter);
    }
  }

  for (let i = 0; i < circlesRight.length; i++) {
    if (circlesRight[i].visible) {
      fill(circlesRight[i].color);
      ellipse(circlesRight[i].x, circlesRight[i].y, circlesRight[i].diameter, circlesRight[i].diameter);
    }
  }
}

function displayQuestion() {
  textSize(30); // 調整文字大小
  fill(0);
  text(num1 + " + " + num2 + " = ?", 40, 40); // 調整位置
}

function mousePressed() {
  // 先檢查左邊的圓
  for (let i = 0; i < circlesLeft.length; i++) {
    let d = dist(mouseX, mouseY, circlesLeft[i].x, circlesLeft[i].y);
    if (d < circlesLeft[i].diameter / 2 && circlesLeft[i].visible) {
      circlesLeft[i].visible = false;
      checkAnswer();
      return; // 找到一個就返回，避免重複點擊
    }
  }

  // 再檢查右邊的圓
  for (let i = 0; i < circlesRight.length; i++) {
    let d = dist(mouseX, mouseY, circlesRight[i].x, circlesRight[i].y);
    if (d < circlesRight[i].diameter / 2 && circlesRight[i].visible) {
      circlesRight[i].visible = false;
      checkAnswer();
      return; // 找到一個就返回，避免重複點擊
    }
  }
}

function checkAnswer() {
  let inputValue = answerInput.value();
  if (isNaN(inputValue)) {
    inputValue = 0; // 如果不是數字，則設為 0
  } else {
    inputValue = parseInt(inputValue); // 確保是整數
  }
  answerInput.value(inputValue + 1);
}

function windowResized() {
  calculateBoxPositions(); // 重新計算方框的位置和尺寸
  resizeCanvas(windowWidth, windowHeight);
}
