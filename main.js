const output = document.querySelector(".output"),
  text = document.querySelector(".font"),
  numbers = document.querySelectorAll(".number"),
  dot = document.querySelector(".dot"),
  options = document.querySelectorAll(".option"),
  operators = document.querySelectorAll(".operator"),
  equal = document.querySelector(".equal");

let value = ""; // String
let num1, num2; // Number
let op, result; // String
let haveDot = false;

// 천단위마다 쉼표
function setComma(number) {
  return Number(number).toLocaleString();
}

// 클릭 이벤트 (숫자)
numbers.forEach((num) => {
  num.addEventListener("click", (e) => {
    if (value === "0") {
      value = "";
    } else if (value === "-0") {
      value = "-";
    }
    options[0].innerText = "C";
    // 9자리까지 입력 가능
    if (value.length < 9) {
      value += e.target.innerText;
    }
    text.innerText = setComma(value);
  });
});

// 클릭 이벤트 (연산 기호 - +, -, x, ÷)
operators.forEach((oper) => {
  oper.addEventListener("click", (e) => {
    num1 = Number(value);
    op = e.target.innerText;
    value = "";
    haveDot = false;
  });
});

// 클릭 이벤트 (=)
equal.addEventListener("click", (e) => {
  num2 = Number(value);
  value = String(getResult(num1, num2, op));
  if (value.length > 9) {
    text.innerText = Number(value).toExponential(0).replace("+", "");
  } else {
    text.innerText = setComma(value);
  }
});

// 사칙 연산 계산
function getResult(num1, num2, op) {
  switch (op) {
    case "+":
      return num1 + num2;
      break;
    case "-":
      return num1 - num2;
      break;
    case "×":
      return num1 * num2;
      break;
    case "÷":
      return num1 / num2;
      break;
  }
}

// 클릭 이벤트 (AC, %, +/-)
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    const target = e.target.innerText;
    if (target === "AC" || target === "C") {
      clearText();
    }
    if (target === "%") {
      if (value === "" || value === "0") return;
      value = getPercent(value);
      text.innerText = Number(value);
    }
    if (target === "+/-") {
      result = getNumber(value);
      value = result === "" || result === "-" ? result + "0" : result;
      text.innerText = setComma(value);
    }
  });
});

// 초기화
function clearText() {
  options[0].innerText = "AC";
  value = "";
  num1 = 0;
  num2 = 0;
  op = "";
  result = "";
  haveDot = false;
  text.innerText = "0";
}

// 퍼센트
function getPercent(number) {
  let leng = 2;
  if (number.includes(".")) {
    leng += number.split(".")[1].length;
  }
  return (Number(number) / 100).toFixed(leng);
}

// + / -
function getNumber(number) {
  if (number[0] === "-") {
    return number.slice(1);
  } else {
    return "-" + number;
  }
}

// 클릭 이벤트 (소수점)
dot.addEventListener("click", () => {
  if (value.indexOf(".") > -1) haveDot = true;
  if (!haveDot) {
    options[0].innerText = "C";
    if (value) {
      value += ".";
    } else {
      value = "0.";
    }
    text.innerText = value;
    haveDot = true;
  }
});
