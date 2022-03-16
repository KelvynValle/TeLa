function compiller(code) {
    var lines = code.split("\n");
    var bytecode = "";
    for (var i = 0; i < lines.length; i++) {
        var code = [];
        if (lines[i].includes('"')) {
            code = slice(lines[i]);
        } else {
            code = lines[i].split(" ");
        }
        switch (code[0]) {
            case "add":
                bytecode += "a ";
                switch (code[1]) {
                    case "template":
                        bytecode += "p ";
                        break;
                    case "container":
                        bytecode += "c ";
                        break;
                    case "image":
                        bytecode += "i ";
                        break;
                    case "button":
                        bytecode += "b ";
                        break;
                    case "form":
                        bytecode += "f ";
                        break;
                    case "text":
                        bytecode += "t ";
                        break;
                    case "select":
                        bytecode += "s ";
                        break;
                    case "option":
                        bytecode += "o ";
                        break;
                    case "label":
                        bytecode += "l ";
                        break;
                }
                bytecode += `${code[2]} ${code[4] == 'global' ? 'g' : code[4]} ${code[1] == "template" ? code[6].replace("$", "") : ""};`;
                break;
            case "set":
                bytecode += "s ";
                switch (code[1]) {
                    case "value":
                        bytecode += "v ";
                        break;
                    case "border":
                        bytecode += "e ";
                        break;
                    case "width":
                        bytecode += "w ";
                        break;
                    case "height":
                        bytecode += "h ";
                        break;
                    case "round":
                        bytecode += "r ";
                        break;
                    case "font":
                        bytecode += "f ";
                        break;
                    case "color":
                        bytecode += "c ";
                        break;
                    case "background":
                        bytecode += "b ";
                        break;
                    case "gradient":
                        bytecode += "g ";
                        break;
                    case "shadow":
                        bytecode += "s ";
                        break;
                    case "left":
                        bytecode += "l ";
                        break;
                    case "top":
                        bytecode += "t ";
                        break;
                    case "align":
                        bytecode += "a ";
                        break;
                    case "size":
                        bytecode += "z ";
                        break;
                    case "margin":
                        bytecode += "m ";
                        break;
                }
                bytecode += `${btoa(code[2])} ${code[4] == 'global' ? 'g' : code[4]};`;
                break;
            case "delete":
                bytecode += `d ${code[1]};`;
                break;
            case "template":


        }
    }
    return bytecode;
}

function slice(str) {
    var arr = [];
    var quote = false;
    arr.push("");
    for (var i = 0; i < str.length; i++) {
        if (str[i] == " " && !quote) {
            arr.push("");
        } else {
            if (str[i] == '"') {
                quote = !quote;
            } else {
                arr[arr.length - 1] += str[i];
            }
        }
    }
    return arr;
}