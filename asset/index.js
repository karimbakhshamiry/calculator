const problem = document.getElementById("problem");
const buttons = document.querySelectorAll("span");
const historyContainer = document.querySelector(".history");

screenedValue = "";
// this is for controlling no to type two '.' in the same digit.
// lastDigitAfterOperation;
problem.value = screenedValue;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // add the operands to the equation in case equation length is more than 0, and there is no other operand beforehand
    if (
      screenedValue.length > 0 &&
      button.classList.contains("operand") &&
      !"(/-+%.*".includes(screenedValue.slice(-1))
    ) {
      if (button.innerText === "^") {
        screenedValue += "**";
      } else {
        screenedValue += button.innerText;
      }
    }
    // handle backspace button to remove ** if there is one, else remove only one character
    else if (button.classList.contains("backspace")) {
      if (screenedValue.slice(-2) === "**") {
        screenedValue = screenedValue.slice(0, -2);
      } else {
        screenedValue = screenedValue.slice(0, -1);
      }
    }
    // control the equal press button, do the operation if there is no operand at the end, else slice last character and do the operation
    else if (button.classList.contains("equal")) {
      // create content for history operation to be appended in history div
      let histOperation = document.createElement("p");
      histOperation.classList.add("hist_operation");
      histOperation.innerText = screenedValue;

      let histEqual = document.createElement("p");
      histEqual.innerText = "=";

      if ("/*-+%".includes(screenedValue.slice(-1))) {
        screenedValue = `${eval(screenedValue.slice(0, -1))}`;
      } else {
        screenedValue = `${eval(screenedValue)}`;
      }

      // create content for history result to be appended in history div
      let histResult = document.createElement("p");
      histResult.classList.add("hist_result");
      histResult.innerText = screenedValue;

      // create history item div and append its children to it to be appended in history div
      let div = document.createElement("div");
      div.classList.add("item");
      div.append(histOperation);
      div.append(histEqual);
      div.append(histResult);

      // add event to history items div
      histOperation.addEventListener("click", transferHistoryToScreen);
      histResult.addEventListener("click", transferHistoryToScreen);
      // console.log(histEqual, histOperation, histResult, div);

      // adding history content to history div to be shown in front end
      historyContainer.append(div);
    } else if (button.classList.contains("clean")) {
      screenedValue = "";
    } else if (button.classList.contains("operator")) {
      screenedValue += button.innerText;
    } else if (button.innerText === "(") {
      // if digit before open bracket add a * with (
      if (
        "0123456789)".includes(screenedValue.slice(-1)) &&
        screenedValue.length > 0
      ) {
        screenedValue = screenedValue + "*(";
      } else {
        screenedValue = screenedValue + "(";
      }
    } else if (button.innerText === ")") {
      if ("/*-+%".includes(screenedValue.slice(-1))) {
        if (screenedValue.slice(-2) === "**") {
          screenedValue = screenedValue.slice(0, -2) + ")";
        } else {
          screenedValue = screenedValue.slice(0, -1) + ")";
        }
      } else if (screenedValue.slice(-1) === "(") {
        screenedValue = screenedValue;
      } else {
        screenedValue = screenedValue + ")";
      }
    }

    // update the screenedValue and update the problem on screen
    problem.value = screenedValue;
  });
});

const transferHistoryToScreen = (e) => {
  screenedValue = e.target.innerText;
  problem.value = screenedValue;
};

document.addEventListener("keyup", (e) => {
  console.log(e.key);

  if (
    screenedValue.length > 0 &&
    "/*-+^%".includes(e.key) &&
    !"(/-+%.*".includes(screenedValue.slice(-1))
  ) {
    if (e.key === "^") {
      screenedValue += "**";
    } else {
      screenedValue += e.key;
    }
  }
  // handle backspace button to remove ** if there is one, else remove only one character
  else if (e.key === "Backspace") {
    if (screenedValue.slice(-2) === "**") {
      screenedValue = screenedValue.slice(0, -2);
    } else {
      screenedValue = screenedValue.slice(0, -1);
    }
  }
  // control the equal press button, do the operation if there is no operand at the end, else slice last character and do the operation
  else if (e.key === "Enter") {
    // create content for history operation to be appended in history div
    let histOperation = document.createElement("p");
    histOperation.classList.add("hist_operation");
    histOperation.innerText = screenedValue;

    let histEqual = document.createElement("p");
    histEqual.innerText = "=";

    if ("/*-+%".includes(screenedValue.slice(-1))) {
      screenedValue = `${eval(screenedValue.slice(0, -1))}`;
    } else {
      screenedValue = `${eval(screenedValue)}`;
    }

    //   // create content for history result to be appended in history div
    let histResult = document.createElement("p");
    histResult.classList.add("hist_result");
    histResult.innerText = screenedValue;

    // create history item div and append its children to it to be appended in history div
    let div = document.createElement("div");
    div.classList.add("item");
    div.append(histOperation);
    div.append(histEqual);
    div.append(histResult);

    // add event to history items div
    histOperation.addEventListener("click", transferHistoryToScreen);
    histResult.addEventListener("click", transferHistoryToScreen);
    // console.log(histEqual, histOperation, histResult, div);

    // adding history content to history div to be shown in front end
    historyContainer.append(div);
  } else if (e.key === "Delete") {
    screenedValue = "";
  } else if ("0123456789.".includes(e.key)) {
    screenedValue += e.key;
  } else if (e.key === "(") {
    // if digit before open bracket add a * with (
    if (
      "0123456789)".includes(screenedValue.slice(-1)) &&
      screenedValue.length > 0
    ) {
      screenedValue = screenedValue + "*(";
    } else {
      screenedValue = screenedValue + "(";
    }
  } else if (e.key === ")") {
    if ("/*-+%".includes(screenedValue.slice(-1))) {
      if (screenedValue.slice(-2) === "**") {
        screenedValue = screenedValue.slice(0, -2) + ")";
      } else {
        screenedValue = screenedValue.slice(0, -1) + ")";
      }
    } else if (screenedValue.slice(-1) === "(") {
      screenedValue = screenedValue;
    } else {
      screenedValue = screenedValue + ")";
    }
  }

  problem.value = screenedValue;
});
