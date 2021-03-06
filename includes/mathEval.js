/*
Evaluates a math expression
*/
function mathEval(expression) {
    expression = expression.replaceAll(" ", "");
    expression = replaceMinus(expression);
    let node = convertToNodes(expression);
    return node.getValue();
}

/*
Separate all individual parts of expression between operators
*/
function separateOperator(expression, operator) {
    let arr = [];
    let lastOperator = 0;
    let index = expression.indexOf(operator, lastOperator);
    while (index != -1) {
        if (!insideParenthesis(expression, index)) {
            arr.push(expression.substring(lastOperator, index));
            lastOperator = index + 1;
            index = expression.indexOf(operator, lastOperator);
        } else {
            index = expression.indexOf(operator, index + 1);
        }
    }
    arr.push(expression.substring(lastOperator, expression.length));
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i][0] == "(" ? arr[i].substring(1, arr[i].length - 1) : arr[i];
    }
    return arr;
}

/*
Checks if index is inside of parenthesis
*/
function insideParenthesis(expression, index) {
    let parenthesis = 0;
    if (index > expression.length * 0.5) {
        for (var i = index; i < expression.length; i++) {
            if (expression[i] == "(") {
                parenthesis++;
            } else if (expression[i] == ")") {
                parenthesis--;
            }
        }
    } else {
        for (var i = index; i > 0; i--) {
            if (expression[i] == "(") {
                parenthesis++;
            } else if (expression[i] == ")") {
                parenthesis--;
            }
        }
    }
    return parenthesis == 0 ? false : true;
}

/*
checks if contains operator inside
*/
function containOperators(expression) {
    return !(/^[0-9.,\-]+$/.test(expression));
}

/*
converts string expression into nodes
*/
function convertToNodes(expression) {
    var operators = ["+", "*", "/", "^"];
    if (containOperators(expression)) {
        for (var k = 0; k < operators.length; k++) {
            if (includesInLevel(expression, operators[k])) {
                let arr = separateOperator(expression, operators[k]);
                let node = { node1: convertToNodes(arr[0]), getValue: function() { return this.node1.getValue(); } };
                for (var i = 1; i < arr.length; i++) {
                    if (!containOperators(arr[i])) {
                        let node2 = { value: parseFloat(arr[i]), getValue: function() { return this.value } };
                        node = {
                            node1: node,
                            node2: node2,
                            operation: operators[k],
                            getValue: function() {
                                switch (this.operation) {
                                    case "+":
                                        return this.node1.getValue() + this.node2.getValue();
                                    case "*":
                                        return this.node1.getValue() * this.node2.getValue();
                                    case "/":
                                        return this.node1.getValue() / this.node2.getValue();
                                    case "^":
                                        return Math.pow(this.node1.getValue(), this.node2.getValue());
                                }
                            }
                        };
                    } else {
                        node = {
                            node1: node,
                            node2: convertToNodes(arr[i]),
                            operation: operators[k],
                            getValue: function() {
                                switch (this.operation) {
                                    case "+":
                                        return this.node1.getValue() + this.node2.getValue();
                                    case "*":
                                        return this.node1.getValue() * this.node2.getValue();
                                    case "/":
                                        return this.node1.getValue() / this.node2.getValue();
                                    case "^":
                                        return Math.pow(this.node1.getValue(), this.node2.getValue());
                                }
                            }
                        };
                    }
                }
                return node;
            }
        }
    } else {
        return { value: parseFloat(expression), getValue: function() { return this.value } };
    }
}

/*
Checks if has operator in the current level
 */
function includesInLevel(expression, operator) {
    let index = expression.indexOf(operator);
    while (index != -1) {
        if (!insideParenthesis(expression, index)) {
            return true;
        }
        index = expression.indexOf(expression, index + 1);
    }
    return false;
}

/*
Replacing minus in correct way
*/
function replaceMinus(expression) {
    let newExpression = expression[0];
    for (var i = 1; i < expression.length - 1; i++) {
        if (expression[i] == "-") {
            newExpression += expression[i + 1] == "(" ? "+-1*" : (containOperators(expression[i - 1]) ? "-" : "+-");
        } else {
            newExpression += expression[i];
        }
    }
    newExpression += expression[expression.length - 1];
    return newExpression;
}