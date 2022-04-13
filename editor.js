window.addEventListener('DOMContentLoaded', startEditor, false);
var color_start = "";
var color_end = "";
var color_middle_start = "";
var color_middle_end = "";
var global_angle = 0;
var selected_index = "global";

function generateColorPallete() {
    objects = [];
    id_index_counter = 0;
    addObject("global", "global", "");

    var start = { r: Math.random() * 100 + 100, g: Math.random() * 100 + 100, b: Math.random() * 100 + 100 };
    var end = { r: Math.random() * 100 + 100, g: Math.random() * 100 + 100, b: Math.random() * 100 + 100 };
    var middle_start = { r: (start.r * 0.75 + end.r * 0.25) + Math.random() * 25, g: (start.g * 0.75 + end.g * 0.25) + Math.random() * 25, b: (start.b * 0.75 + end.b * 0.25) + Math.random() * 25 };
    var middle_end = { r: (start.r * 0.25 + end.r * 0.75) + Math.random() * 25, g: (start.g * 0.25 + end.g * 0.75) + Math.random() * 25, b: (start.b * 0.25 + end.b * 0.75) + Math.random() * 25 };
    var c1 = document.getElementById("c1");
    var c2 = document.getElementById("c2");
    var c3 = document.getElementById("c3");
    var c4 = document.getElementById("c4");
    c1.value = rgbToHex(parseInt(start.r), parseInt(start.g), parseInt(start.b));
    c2.value = rgbToHex(parseInt(middle_start.r), parseInt(middle_start.g), parseInt(middle_start.b));
    c3.value = rgbToHex(parseInt(middle_end.r), parseInt(middle_end.g), parseInt(middle_end.b));
    c4.value = rgbToHex(parseInt(end.r), parseInt(end.g), parseInt(end.b));
    var angle = parseInt(Math.random() * 181);
    global_angle = angle;
    changeProperty("global", "gradient", `${angle}deg, ${c1.value}, ${c4.value}`)

    var code = objectsToString();
    code = compiller(code);
    interpret(document.getElementById('global'), {}, code, true, true);

    color_start = c1.value;
    color_middle_start = c2.value;
    color_middle_end = c3.value;
    color_end = c4.value;
}

function redraw() {
    var code = objectsToString();
    code = compiller(code);
    interpret(document.getElementById('global'), {}, code, true, true);
    color_start = c1.value;
    color_middle_start = c2.value;
    color_middle_end = c3.value;
    color_end = c4.value;
    selected_index = "global";
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function startEditor() {
    generateColorPallete();
    document.getElementById("global").addEventListener("mouseup", function() { dragUp(event) }, false);
    document.getElementById("global").addEventListener("mousemove", function() { dragMove(event) }, false);
    document.getElementById("phone-dimension").value = '{"width":64, "height":129}';
    changeDimension('{"width":64, "height":129, "zoom":100}');
}

function changeZoom(value) {
    var phone = document.getElementById("global");
    phone.style.transform = `scale(${value / 100})`;
}

function zoomIncrement(value) {
    var z = document.getElementById("zoom-input");
    z.value = parseInt(z.value) + value;
    changeZoom(z.value);
}

function changeDimension(value) {
    var dimensions = JSON.parse(value);
    var width = dimensions.width / 10;
    var height = dimensions.height / 10;
    var scale = dimensions.zoom / 100;
    var phone = document.getElementById("global");
    phone.style.width = `${width}cm`;
    phone.style.height = `${height}cm`;
    phone.style.top = `calc(45vh - ${height / 2}cm)`;
    phone.style.left = `calc(40vw - ${width / 2}cm)`;
    phone.style.transform = `scale(${scale})`;
    document.getElementById("zoom-input").value = dimensions.zoom;
}

function addObj(type) {
    addObject(type, `obj_${id_index_counter}`, selected_index); //"global");

    switch (type) {
        case "container":
            changeProperty(`obj_${id_index_counter}`, 'background', 'rgb(0,100,200)');
            changeProperty(`obj_${id_index_counter}`, "gradient", `${global_angle}deg, ${c2.value}, ${c3.value}`)
            changeProperty(`obj_${id_index_counter}`, 'round', '9px');
            changeProperty(`obj_${id_index_counter}`, 'width', '80%');
            changeProperty(`obj_${id_index_counter}`, 'height', '20%');
            changeProperty(`obj_${id_index_counter}`, 'left', '10%');
            changeProperty(`obj_${id_index_counter}`, 'top', '10px');
            changeProperty(`obj_${id_index_counter}`, 'rotate', '0deg');
            break;

        case "image":
            changeProperty(`obj_${id_index_counter}`, 'background', `${c2.value}`);
            changeProperty(`obj_${id_index_counter}`, 'round', '3px');
            changeProperty(`obj_${id_index_counter}`, 'width', '50px');
            changeProperty(`obj_${id_index_counter}`, 'height', '50px');
            changeProperty(`obj_${id_index_counter}`, 'left', '0');
            changeProperty(`obj_${id_index_counter}`, 'top', '0');
            changeProperty(`obj_${id_index_counter}`, 'rotate', '0deg');
            break;

        case "button":
            changeProperty(`obj_${id_index_counter}`, 'background', 'rgb(200,50,100)');
            changeProperty(`obj_${id_index_counter}`, "gradient", `${global_angle}deg, ${c1.value}, ${c2.value}`)
            changeProperty(`obj_${id_index_counter}`, 'border', 'none');
            changeProperty(`obj_${id_index_counter}`, 'color', `${c4.value}`);
            changeProperty(`obj_${id_index_counter}`, 'round', '25px');
            changeProperty(`obj_${id_index_counter}`, 'width', '150px');
            changeProperty(`obj_${id_index_counter}`, 'height', '50px');
            changeProperty(`obj_${id_index_counter}`, 'value', 'Button');
            changeProperty(`obj_${id_index_counter}`, 'left', '0');
            changeProperty(`obj_${id_index_counter}`, 'top', '0');
            changeProperty(`obj_${id_index_counter}`, 'rotate', '0deg');
            break;

        case "form":
            changeProperty(`obj_${id_index_counter}`, 'background', 'rgb(0,100,200)');
            changeProperty(`obj_${id_index_counter}`, "gradient", `${global_angle}deg, ${c2.value}, ${c3.value}`)
            changeProperty(`obj_${id_index_counter}`, 'round', '9px');
            changeProperty(`obj_${id_index_counter}`, 'width', '80%');
            changeProperty(`obj_${id_index_counter}`, 'height', '20%');
            changeProperty(`obj_${id_index_counter}`, 'left', '10%');
            changeProperty(`obj_${id_index_counter}`, 'top', '10px');
            changeProperty(`obj_${id_index_counter}`, 'rotate', '0deg');
            break;

        case "text":
            changeProperty(`obj_${id_index_counter}`, 'background', 'rgb(0,100,200)');
            changeProperty(`obj_${id_index_counter}`, "gradient", `${global_angle}deg, ${c2.value}50, ${c3.value}60`)
            changeProperty(`obj_${id_index_counter}`, 'round', '15px');
            changeProperty(`obj_${id_index_counter}`, 'shadow', 'rgba(0,0,0,0.042) 0 0 18px');
            changeProperty(`obj_${id_index_counter}`, 'border', 'none');
            changeProperty(`obj_${id_index_counter}`, 'align', 'center');
            changeProperty(`obj_${id_index_counter}`, 'width', '80%');
            changeProperty(`obj_${id_index_counter}`, 'height', '30px');
            changeProperty(`obj_${id_index_counter}`, 'left', '10%');
            changeProperty(`obj_${id_index_counter}`, 'top', '10px');
            changeProperty(`obj_${id_index_counter}`, 'color', `${c4.value}`);
            changeProperty(`obj_${id_index_counter}`, 'rotate', '0deg');
            break;
        case "label":
            changeProperty(`obj_${id_index_counter}`, 'font', 'arial');
            changeProperty(`obj_${id_index_counter}`, 'width', '100%');
            changeProperty(`obj_${id_index_counter}`, 'align', 'center');
            changeProperty(`obj_${id_index_counter}`, 'color', `${c3.value}`);
            changeProperty(`obj_${id_index_counter}`, 'value', 'Label');
            changeProperty(`obj_${id_index_counter}`, 'rotate', '0deg');
        case "template":
            break;
    }

    id_index_counter++;
    var code = objectsToString();
    code = compiller(code);
    interpret(document.getElementById('global'), {}, code, true, true);
    document.getElementById('global').innerHTML += '<div id="bounding-box"><div class="control-box left-side" id="left-cursor"></div><div class="control-box right-side" id="right-cursor"></div><div class="control-box bottom-side" id="bottom-cursor"></div><div class="control-box top-side" id="top-cursor"></div><div class="control-box bottom-left-side" id="bottom-left-cursor"></div><div class="control-box top-left-side" id="top-left-cursor"></div><div class="control-box top-right-side" id="top-right-cursor"></div><div class="spin-box" id="spin-cursor">&olarr;</div></div>';
    addDragAndDrop();

}

function addDragAndDrop() {
    var edit = document.getElementsByClassName("edition");
    for (var i = 0; i < edit.length; i++) {
        edit[i].style.position = "absolute";
        edit[i].addEventListener("mousedown", function() {
            dragDown(event);
            selectObject(event.target.id);
        }, false);
    }
}

var init = { x: 0, y: 0 };
var init_location = { top: 0, left: 0 };
var obj_size = { width: 0, height: 0 };
var obj = undefined;
var mouseDown = false;

function selectObject(id) {
    var selected = document.getElementsByClassName("selected");
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove("selected");
    }
    selected = document.getElementById(id);

    for (var i = 0; i < objects.length; i++) {
        if (objects[i].name == id) {
            document.getElementById("name-txt").value = objects[i].name;
            for (var k in objects[i].properties) {
                document.getElementById(`${k}-txt`).value = objects[i].properties[k].replaceAll('"', '');
            }
            break;
        }
    }
    selected.classList.add("selected");
    showBox();
    selected_index = id;
}

function selectGlobal(e) {
    if (e.target.id == "global") {
        selected = document.getElementById("global");

        for (var i = 0; i < objects.length; i++) {
            if (objects[i].name == "global") {
                document.getElementById("name-txt").value = objects[i].name;
                for (var k in objects[i].properties) {
                    document.getElementById(`${k}-txt`).value = objects[i].properties[k].replaceAll('"', '');
                }
                break;
            }
        }
        selected.classList.add("selected");
        hideBox();
        selected_index = "global";
    }
}

function setRedimension(e) {
    start_point_redimension = { x: e.clientX, y: e.clientY };
    switch (e.target.id) {
        case "left-cursor":
            left_redimension = !left_redimension;
            redimensioning = !redimensioning;
            break;
        case "right-cursor":
            right_redimension = !right_redimension;
            redimensioning = !redimensioning;
            break;
        case "top-cursor":
            top_redimension = !top_redimension;
            redimensioning = !redimensioning;
            break;
        case "bottom-cursor":
            bottom_redimension = !bottom_redimension;
            redimensioning = !redimensioning;
            break;
        case "bottom-left-cursor":
            bottom_redimension = !bottom_redimension;
            left_redimension = !left_redimension;
            redimensioning = !redimensioning;
            break;
        case "top-left-cursor":
            top_redimension = !top_redimension;
            left_redimension = !left_redimension;
            redimensioning = !redimensioning;
            break;
        case "top-right-cursor":
            top_redimension = !top_redimension;
            right_redimension = !right_redimension;
            redimensioning = !redimensioning;
            break;
        case "spin-cursor":
            rotating = !rotating;
            break;
        default:
            if (redimensioning || rotating) {
                redimensioning = false;
                left_redimension = false;
                right_redimension = false;
                top_redimension = false;
                bottom_redimension = false;
                obj_redimension = undefined;
                rotating = false;
            }
            break;
    }
    if (redimensioning || rotating) {
        obj_redimension = document.getElementsByClassName("selected")[0];
    }
    console.log("redimensioning");
    console.log(redimensioning);
    console.log(left_redimension);
    console.log(right_redimension);
    console.log(top_redimension);
    console.log(bottom_redimension);
}

var start_point_redimension = { x: 0, y: 0 };

function getDimensions(obj) {
    var top = obj.clientT
}

function showBox() {
    var obj = document.getElementsByClassName("selected");
    var my = obj[0].getBoundingClientRect();
    var global = document.getElementById("global").getBoundingClientRect();

    var top = `${getProperty(obj[0].id, "top")}` // - ${global.top}px`.replaceAll('"', ''); //my.top - global.top;
    var left = `${getProperty(obj[0].id, "left")}` // - ${global.left}px`.replaceAll('"', ''); //my.left - global.left;
    var width = obj[0].style.width;
    var height = obj[0].style.height;

    var bb = document.getElementById("bounding-box");
    bb.style.display = "block";
    var rotation = `rotate(${getProperty(obj[0].id, "rotate")})`.replaceAll('"', '');
    bb.style.top = `calc(${top.replaceAll('"', '')} - 10px)`; //`calc(${top} - 10px)`;
    bb.style.left = `calc(${left.replaceAll('"', '')} - 10px)`; //`calc(${left} - 10px)`;
    bb.style.width = `calc(${width} + 15px)`;
    bb.style.height = `calc(${height} + 15px)`;
    bb.style.transform = rotation;
}

function hideBox() {
    var bb = document.getElementById("bounding-box");
    bb.style.display = "none";
}

function changeSelected(obj_property, property_value) {
    var obj = document.getElementsByClassName("selected");
    if (obj.length > 0) {
        var obj_name = obj[0].id;
        changeProperty(obj_name, obj_property, property_value);
        var code = objectsToString();
        code = compiller(code);
        interpret(document.getElementById('global'), {}, code, true, true);
        selectObject(obj_name);
        document.getElementById('global').innerHTML += '<div id="bounding-box"></div>';
        addDragAndDrop();

    }
}

function dragDown(e) {
    obj = e.target;
    var box = obj.getBoundingClientRect();
    var box_fone = obj.parentElement.getBoundingClientRect();
    init_location = { top: box.top - box_fone.top, left: box.left - box_fone.left };
    obj_size = { height: obj.clientHeight, width: obj.clientWidth }
    init = { x: e.clientX, y: e.clientY };
    mouseDown = true;
}

function dragMove(e) {
    if (mouseDown) {
        var xD = e.clientX - init.x;
        var yD = e.clientY - init.y;
        var delta = { x: xD, y: yD };

        obj.style.left = `${delta.x + init_location.left}px`;
        obj.style.top = `${delta.y + init_location.top}px`;
        hideBox();
        setRedLitter();
    }

}

function dragUp(e) {
    if (mouseDown) {
        var xD = e.clientX - init.x;
        var yD = e.clientY - init.y;
        var delta = { x: xD, y: yD };
        obj.style.left = `${delta.x + init_location.left}px`;
        obj.style.top = `${delta.y + init_location.top}px`;
        changeProperty(obj.id, "left", `${delta.x + init_location.left}px`);
        changeProperty(obj.id, "top", `${delta.y + init_location.top}px`);

        mouseDown = false;
        init = { x: 0, y: 0 };
        unsetRedLitter(e);
        obj = undefined;
        showBox();

    }
}

var left_redimension = false;
var right_redimension = false;
var top_redimension = false;
var bottom_redimension = false;
var redimensioning = false;
var rotating = false;

function redimension(e) {
    //start_point_redimension
    if (redimensioning) {
        var box = obj_redimension.getBoundingClientRect();
        var box_fone = document.getElementById("global").getBoundingClientRect();
        hideBox();
        init_location = { top: box.top - box_fone.top, left: box.left - box_fone.left };
        if (left_redimension) {
            obj_redimension.style.left = `${e.clientX - box_fone.left + 15}px`;
            obj_redimension.style.width = `${-e.clientX + start_point_redimension.x + obj_redimension.clientWidth}px`;
            start_point_redimension.x = e.clientX;
            changeProperty(obj_redimension.id, "width", `${-e.clientX + start_point_redimension.x + obj_redimension.clientWidth}px`);
            changeProperty(obj_redimension.id, "left", `${e.clientX - box_fone.left + 15}px`);
        }
        if (right_redimension) {
            obj_redimension.style.width = `${e.clientX - start_point_redimension.x + obj_redimension.clientWidth}px`;
            changeProperty(obj_redimension.id, "width", `${e.clientX - start_point_redimension.x + obj_redimension.clientWidth}px`);
            start_point_redimension.x = e.clientX;

        }
        if (top_redimension) {
            obj_redimension.style.top = `${e.clientY - box_fone.top + 15}px`;
            obj_redimension.style.height = `${-e.clientY + start_point_redimension.y + obj_redimension.clientHeight}px`;
            start_point_redimension.y = e.clientY;
            changeProperty(obj_redimension.id, "top", `${e.clientY - box_fone.top + 15}px`);
            changeProperty(obj_redimension.id, "height", `${-e.clientY + start_point_redimension.y + obj_redimension.clientHeight}px`);
        }
        if (bottom_redimension) {
            obj_redimension.style.height = `${e.clientY - start_point_redimension.y + obj_redimension.clientHeight}px`;
            changeProperty(obj_redimension.id, "height", `${e.clientY - start_point_redimension.y + obj_redimension.clientHeight}px`);
            start_point_redimension.y = e.clientY;
        }
    } else if (rotating) {
        obj_redimension.style.transform = `rotate(${e.clientY - start_point_redimension.y + obj_redimension.clientHeight}deg)`;
        changeProperty(obj_redimension.id, "rotate", `${e.clientY - start_point_redimension.y + obj_redimension.clientHeight}deg`);
        showBox();
    }
}

function unsetRedLitter(e) {
    var litter = document.getElementById("litter-box");
    if (litter.classList.contains("d-unselected")) {
        litter.classList.add("d-selected");
        litter.classList.remove("d-unselected");
    }

    var rect = litter.getBoundingClientRect();
    var icon_ray = 45;
    var dist = Math.sqrt(Math.pow(e.clientX - rect.left - icon_ray / 2, 2) + Math.pow(e.clientY - rect.top - icon_ray / 2, 2));
    if (dist <= icon_ray / 2) {
        var id = obj.id;
        deleteObject(id);
        redraw();
    }
}

function setRedLitter() {
    var litter = document.getElementById("litter-box");
    if (litter.classList.contains("d-selected")) {
        litter.classList.add("d-unselected");
        litter.classList.remove("d-selected");
    }
}