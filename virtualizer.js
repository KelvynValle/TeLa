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

function changeProperty(obj_name, obj_property, property_value) {
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].name == obj_name) {
            objects[i].properties[obj_property] = `"${property_value}"`;
            break;
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