//add virtual objects in json array
//convert virtual objects in line-code strings
var objects = [];
var id_index_counter = 0;
addObject("global", "global", "");

function addObject(type, name, container) {
    var properties = {
        border: "",
        width: "",
        height: "",
        round: "",
        font: "",
        color: "",
        background: "",
        gradient: "",
        shadow: "",
        left: "",
        top: "",
        align: "",
        margin: ""
    };
    objects.push({ name: name, type: type, properties: properties, value: "", container: container });
}

function deleteObject(name) {
    var index = -1;
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].name == name) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        objects.splice(index, 1);
    }
}

function changeProperty(obj_name, obj_property, property_value) {
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].name == obj_name) {
            objects[i].properties[obj_property] = `"${property_value}"`;
            break;
        }
    }
}

function getProperty(obj_name, obj_property) {
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].name == obj_name) {
            return objects[i].properties[obj_property];
        }
    }
}

function objectsToString() {
    var code = "";
    for (var i = 0; i < objects.length; i++) {
        code += `add ${objects[i].type} ${objects[i].name} to ${objects[i].container}\n`;
        for (var k in objects[i].properties) {
            if (objects[i].properties[k] != "") {
                code += `set ${k} ${objects[i].properties[k]} to ${objects[i].name}\n`;
            }
        }
    }
    return code;
}

function changeDefaultUnit(unit, global) {
    for (var i = 1; i < objects.length; i++) {
        objects[i].properties["width"] = unit == "1" ? (objects[i].properties["width"].includes("px") ? objects[i].properties["width"] : (toFloat(objects[i].properties["width"]) * (global.width / 0.026458) * 0.001) + "px") : (objects[i].properties["width"].includes("%") ? objects[i].properties["width"] : ((toFloat(objects[i].properties["width"]) / ((global.width / 0.026458) * 0.1)) * 100) + "%");
        objects[i].properties["height"] = unit == "1" ? (objects[i].properties["height"].includes("px") ? objects[i].properties["height"] : (toFloat(objects[i].properties["height"]) * (global.height / 0.026458) * 0.001) + "px") : (objects[i].properties["height"].includes("%") ? objects[i].properties["height"] : ((toFloat(objects[i].properties["height"]) / ((global.height / 0.026458) * 0.1)) * 100) + "%");
        objects[i].properties["left"] = unit == "1" ? (objects[i].properties["left"].includes("px") ? objects[i].properties["left"] : (toFloat(objects[i].properties["left"]) * (global.width / 0.026458) * 0.001) + "px") : (objects[i].properties["left"].includes("%") ? objects[i].properties["left"] : ((toFloat(objects[i].properties["left"]) / ((global.width / 0.026458) * 0.1)) * 100) + "%");
        objects[i].properties["top"] = unit == "1" ? (objects[i].properties["top"].includes("px") ? objects[i].properties["top"] : (toFloat(objects[i].properties["top"]) * (global.height / 0.026458) * 0.001) + "px") : (objects[i].properties["top"].includes("%") ? objects[i].properties["top"] : ((toFloat(objects[i].properties["top"]) / ((global.height / 0.026458) * 0.1)) * 100) + "%");
    }
}

function toFloat(value) {
    return parseFloat(value.replace("px", "").replace("%", "").replaceAll('"', ''));
}