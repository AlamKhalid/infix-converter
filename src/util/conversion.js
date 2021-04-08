function reverseString(str) {
  return str.split("").reverse().join("");
}

function isAlpha(c) {
  return (c >= "A" && c <= "Z") || (c >= "a" && c <= "z");
}

function isDigit(c) {
  return c >= "0" && c <= "9";
}

function isOperator(c) {
  return !isAlpha(c) && !isDigit(c);
}

function getPriority(c) {
  if (c === "-" || c === "+") return 1;
  else if (c === "*" || c === "/") return 2;
  else if (c === "^") return 3;
  return 0;
}

export function infixToPostfix(exp) {
  exp = "(" + exp + ")";
  const stack = [];
  var output = "";
  for (var i in exp) {
    if (isAlpha(exp[i]) || isDigit(exp[i])) output += exp[i];
    else if (exp[i] === "(") stack.unshift("(");
    else if (exp[i] === ")") {
      while (stack[0] !== "(") {
        output += stack.shift();
      }
      stack.shift();
    } else {
      if (isOperator(stack[0])) {
        while (
          getPriority(exp[i]) < getPriority(stack[0]) ||
          (getPriority(exp[i]) <= getPriority(stack[0]) && exp[i] === "^")
        ) {
          output += stack.shift();
        }
        stack.unshift(exp[i]);
      }
    }
  }
  return output;
}

export function infixToPrefix(exp) {
  exp = reverseString(exp);

  for (var i in exp) {
    if (exp[i] === "(") {
      exp[i] = ")";
      i++;
    } else if (exp[i] === ")") {
      exp[i] = "(";
      i++;
    }
  }
  const output = infixToPostfix(exp);
  return reverseString(output);
}

export function postfixToInfix(exp) {
  const s = [];
  for (var i in exp) {
    if (isAlpha(exp[i]) || isDigit(exp[i])) {
      s.unshift(exp[i]);
    } else {
      const op1 = s.shift();
      const op2 = s.shift();
      s.unshift("(" + op2 + exp[i] + op1 + ")");
    }
  }
  return s[0];
}

export function postfixToPrefix(exp) {
  const s = [];
  for (var i in exp) {
    if (isOperator(exp[i])) {
      const op1 = s.shift();
      const op2 = s.shift();
      const temp = exp[i] + op2 + op1;
      s.unshift(temp);
    } else {
      s.unshift(exp[i]);
    }
  }
  var ans = "";
  while (s.length) {
    ans += s.shift();
  }
  return ans;
}

export function prefixToPostfix(exp) {
  const s = [];
  for (var i in exp) {
    if (isOperator(exp[i])) {
      const op1 = s.shift();
      const op2 = s.shift();
      const temp = op1 + op2 + exp[i];
      s.unshift(temp);
    } else {
      s.unshift(exp[i]);
    }
  }
  return s[0];
}

export function prefixToInfix(exp) {
  const s = [];
  for (var i in exp) {
    if (isOperator(exp[i])) {
      const op1 = s.shift();
      const op2 = s.shift();
      const temp = "(" + op1 + exp[i] + op2 + ")";
      s.unshift(temp);
    } else {
      s.unshift(exp[i]);
    }
  }
  return s[0];
}
