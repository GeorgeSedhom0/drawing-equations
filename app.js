const vLine = document.querySelector(".numbers-line-v");
const hLine = document.querySelector(".numbers-line-h");
const line = document.querySelector(".numbers-line");
const x = document.querySelector("#x");
const y = document.querySelector("#y");
const r = document.querySelector("#r");

// y = x equation consts
const eqXY = document.querySelector("#yEq .eqX");
const eqNY = document.querySelector("#yEq .eqN");
const eqPY = document.querySelector("#yEq .eqP");
const addLineY = document.querySelector("#yEq .submitLine");

// x = y equation consts
const eqYX = document.querySelector("#xEq .eqY");
const eqNYX = document.querySelector("#xEq .eqN");
const eqPYX = document.querySelector("#xEq .eqP");
const addLineX = document.querySelector("#xEq .submitLine");

const addCircle = document.querySelector("#submit");
const wholeNumbersLine = document.querySelector(".numbers-line");

// calculate the width of the line
const lineWidth = () => {
  const width = wholeNumbersLine.getBoundingClientRect().width;
  return width / 2 / 30;
};

const lineWidthValue = lineWidth();

console.log(lineWidthValue);

for (let i = 1; i <= lineWidthValue; i++) {
  const vPoint = document.createElement("div");
  vPoint.classList.add("v-point");
  vPoint.innerText = i;
  vPoint.style.top = `calc(50% - (var(--unit) * ${i}))`;
  vLine.appendChild(vPoint);
  const guideLine = document.createElement("div");
  guideLine.classList.add("guide-lines-h");
  guideLine.style.top = `calc(50% - (var(--unit) * ${i}))`;
  line.appendChild(guideLine);
}
for (let i = -1; i >= -lineWidthValue; i--) {
  const vPoint = document.createElement("div");
  vPoint.classList.add("v-point");
  vPoint.innerText = i;
  vPoint.style.top = `calc(50% - (var(--unit) * ${i}))`;
  vLine.appendChild(vPoint);
  const guideLine = document.createElement("div");
  guideLine.classList.add("guide-lines-h");
  guideLine.style.top = `calc(50% - (var(--unit) * ${i}))`;
  line.appendChild(guideLine);
}

for (let i = 1; i <= lineWidthValue; i++) {
  const hPoint = document.createElement("div");
  hPoint.classList.add("h-point");
  hPoint.innerText = i;
  hPoint.style.left = `calc(50% - (var(--unit) * ${-i}))`;
  hLine.appendChild(hPoint);
  const guideLine = document.createElement("div");
  guideLine.classList.add("guide-lines-v");
  guideLine.style.left = `calc(50% - (var(--unit) * ${-i}))`;
  line.appendChild(guideLine);
}
for (let i = -1; i >= -lineWidthValue; i--) {
  const hPoint = document.createElement("div");
  hPoint.classList.add("h-point");
  hPoint.innerText = i;
  hPoint.style.left = `calc(50% - (var(--unit) * ${-i}))`;
  hLine.appendChild(hPoint);
  const guideLine = document.createElement("div");
  guideLine.classList.add("guide-lines-v");
  guideLine.style.left = `calc(50% - (var(--unit) * ${-i}))`;
  line.appendChild(guideLine);
}
const createCircle = (x, y, r) => {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.top = `calc(50% + (var(--unit)*${-y}))`;
  circle.style.left = `calc(50% + (var(--unit)*${x}))`;
  circle.style.width = `calc(var(--unit) * ${r} * 2)`;
  circle.addEventListener("dblclick", () => {
    circle.remove();
  });
  line.appendChild(circle);
};

addCircle.addEventListener("click", () => {
  createCircle(x.value, y.value, r.value);
});

const createCurveLine = (m, c, p, state) => {
  const coverDiv = document.createElement("div");
  coverDiv.classList.add("cover-div");
  coverDiv.addEventListener("dblclick", () => {
    coverDiv.remove();
  });
  // get max x value when y = lineWidthValue
  let max = (lineWidthValue - c) / m;
  if (p == 2) {
    max = Math.sqrt(max);
  }

  for (let x = 0; x <= max; x = x + 0.005) {
    // y = x+2
    const y = m * x ** p + c;
    const point = document.createElement("div");
    point.classList.add("point");
    if (state == "y") {
      point.style.top = `calc(50% + (var(--unit)*${-y}))`;
      point.style.left = `calc(50% + (var(--unit)*${x}))`;
    } else {
      point.style.top = `calc(50% + (var(--unit)*${-x}))`;
      point.style.left = `calc(50% + (var(--unit)*${y}))`;
    }
    coverDiv.appendChild(point);
  }
  if (p == 2) {
    for (let x = 0; x >= -max; x = x - 0.005) {
      // y = x+2
      const y = m * x ** p + c;
      const point = document.createElement("div");
      point.classList.add("point");
      if (state == "y") {
        point.style.top = `calc(50% + (var(--unit)*${-y}))`;
        point.style.left = `calc(50% + (var(--unit)*${x}))`;
      } else {
        point.style.top = `calc(50% + (var(--unit)*${-x}))`;
        point.style.left = `calc(50% + (var(--unit)*${y}))`;
      }
      coverDiv.appendChild(point);
    }
  }
  line.appendChild(coverDiv);
};

const createCircleV2 = (r, a, b) => {
  const circle = document.createElement("div");
  const y = b + r;
  for (let i = y; i >= -y; i = i - 0.005) {
    const x1 = Math.sqrt(r ** 2 - (i - b) ** 2) + a;
    const x2 = -Math.sqrt(r ** 2 - (i - b) ** 2) + a;
    const point1 = document.createElement("div");
    const point2 = document.createElement("div");
    point1.classList.add("point");
    point2.classList.add("point");
    point1.style.top = `calc(50% + (var(--unit)*${-i}))`;
    point1.style.left = `calc(50% + (var(--unit)*${x1}))`;
    point2.style.top = `calc(50% + (var(--unit)*${-i}))`;
    point2.style.left = `calc(50% + (var(--unit)*${x2}))`;
    circle.appendChild(point1);
    circle.appendChild(point2);
  }
  circle.classList.add("cover-div");
  circle.addEventListener("dblclick", () => {
    circle.remove();
  });
  line.appendChild(circle);
};
createCircleV2(5, 2, 4);

addLineY.addEventListener("click", () => {
  if (isNaN(eqXY.value) || isNaN(eqNY.value) || isNaN(eqPY.value)) {
    alert("Please enter numbers");
  } else {
    createCurveLine(
      parseInt(eqXY.value),
      parseInt(eqNY.value),
      parseInt(eqPY.value),
      "y"
    );
  }
});

addLineX.addEventListener("click", () => {
  const eqYXValue = parseInt(eqYX.value);
  const eqNYXValue = parseInt(eqNYX.value);
  const eqPYXValue = parseInt(eqPYX.value);
  if (eqYXValue && eqNYXValue && eqPYXValue) {
    createCurveLine(eqYXValue, eqNYXValue, eqPYXValue, "x");
  }
});
