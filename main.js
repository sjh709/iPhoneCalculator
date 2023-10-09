const output = document.querySelector(".output"),
  numbers = document.querySelectorAll(".number"),
  dot = document.querySelector(".dot"),
  options = document.querySelectorAll(".option"),
  operators = document.querySelectorAll(".operator"),
  equal = document.querySelector(".equal");

let text = "";
let num1, num2, op, result;
let haveDot = false;

numbers.forEach((num) => {
  num.addEventListener("click", (e) => {
    options[0].innerText = "C";
    text += e.target.innerText;
    output.value = text;
  });
});

operators.forEach((oper) => {
  oper.addEventListener("click", (e) => {
    num1 = Number(text);
    op = e.target.innerText;
    text = "";
    haveDot = false;
  });
});

equal.addEventListener("click", (e) => {
  num2 = Number(text);
  result = getResult(num1, num2, op);
  text = Number(Math.round(result + "e+8") + "e-8");
  output.value = text;
});

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

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    const target = e.target.innerText;
    if (target === "AC" || target === "C") {
      clearText();
    }
    if (target === "%") {
      if (text === "" || text === "0" || text === 0) return;
      result = getPercent(text);
      text = result;
      output.value = text;
    }
  });
});

function clearText() {
  options[0].innerText = "AC";
  text = "";
  num1 = "";
  num2 = "";
  op = "";
  result = "";
  haveDot = false;

  output.value = 0;
}

function getPercent(number) {
  number = number === "" ? 0 : text;
  return number / 100;
}

dot.addEventListener("click", () => {
  if (!haveDot) {
    options[0].innerText = "C";
    text ? (text += ".") : (text = "0.");
    output.value = text;
    haveDot = true;
  }
});
