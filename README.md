# TeLa
TeLa - Templating Language

## Description
TeLa is a interpretad language focused in templating contruction feeded by JSON data. With TeLa you can create beautiful templates that will be converted in HTML and CSS, with its content being customized by JSON. Tela sintax is converted in intermediate code, this code is interpretated by JS TeLa interpreter and converted in the screen template.

## Features


## Syntax
With TeLa you can use the basic follow commands:
### Add
This is a command used to add elements to some container. Syntax: 
´´´
add type name to container
//or
add 'html_element' id to container
//or
add template template_name to container for $variableName
´´´
#### Types
In add command you can use the following types:
##### Button
Button type is used to add a <submit> element to the container.
##### Container
Container type is used to add a <div> element to the container.
##### Form
Form type is used to add a <form> element to the container.
##### Global
Global is the global container, used to hold all the TeLa elements and editions. It is setted in the interpret function.
##### Image
Image type is used to add a <img> element to the container.
##### Label
Label type is used to add a <label> element to the container.
##### Option
Option type is used to add a <option> element to the container.
##### Select
Select type is used to add a <select> element to the container.
##### Template
In TeLa, Template is a kind of element that is fitted to an array. It catches the content of the array and fills the content of its child elements.
##### Text
Text type is used to add a <input type="text"> element to the container.
##### HTML literals
If you use single quotes, you can add custom HTML elements. For instance, to add a textarea element, you just have to put its name between single quotes in the add command:
add 'textarea' example_name to container
### Set
The command set is used to set a property of some element. Syntax:
´´´ 
set property value to element
//or
set value to $variable
´´´
You can use a variable inside the value, for instance:
´´´
add container obj to global
set "10 * 30" to $obj_width
set width "$obj_width" to obj
´´´
#### Properties
The properties you can easily define values using the "set" command, are:
##### align
Set the text align of the object. Example:
´´´
set align "center" to object
´´´
##### background
Set the background color of the object. Example:
´´´
set background "rgb(0,0,0)" to object
´´´
##### border
Set the border of the object. Example:
´´´
set border "solid 1px" to object
´´´
##### color
Set the text color of the object. Example:
´´´
set color "blue" to object
´´´
##### font
Set the font family of the object. Example:
´´´
set font "arial" to object
´´´
##### gradient
Set a background gradient to the object. Example:
´´´
set gradient "45deg, rgb(0,0,0), rgb(255,255,255)" to object
´´´
##### height
Set the height of an object. Example:
´´´
set height "10px" to object
´´´
##### left
Set the left property of the object. Example:
´´´
set left "10px" to object
´´´
##### margin
Set the margin of the object. Example:
´´´
set margin "10px" to object
´´´
##### rotate
Set the angular rotation of the object. Example:
´´´
set rotate "10deg" to object
´´´
##### round
Set the border radius the object. Example:
´´´
set round "10px" to object
´´´
##### shadow
Set the box shadow of the object. Example:
´´´
set shadow "rgba(0,0,0,0.1) 1px 1px 1px" to object
´´´
##### size
Set the font size of the object. Example:
´´´
set size "10px" to object
´´´
##### top
Set the top distance of the object. Example:
´´´
set top "10px" to object
´´´
##### value
Set the value in inputs, src in images or the innerHTML in other objects. Example:
´´´
set value "ok" to object
´´´
##### width
Set the width of the object. Example:
´´´
set width "10%" to object
´´´
##### style
Set the whole style property of the object. Example:
´´´
set style "float:left;position:relative;width$obj_width;height:10px;background-color:red;" to object
´´´
### Style
The style command is used to directly change a style element from object. Syntax:
´´´
style "property" "value" to object
´´´
Example:
´´´
style "background-color" "rgba(100,200,150,0.7)" to object
´´´
### Marker:
Marker command is used to mark a position in the code for the use of goto. Example:
´´´
marker "name"
´´´
### Goto:
Goto is used to, after a bool evaluation, point the code to some marker. Example:
´´´
goto "marker" if (bool)
´´´
### is/so is/not
is statement is used as a decision structure. With is you can select what to do evaluating some bool expressions. Example:
´´´
is (bool) ?
 //stuff
so is (bool) ?
 //stuff
not ?
 //stuff
´´´
## Global variables
TeLa has some global variables, useful in the template creation. They are taken from the user navigator. The current global variables are: "width", "height", "mobile".
### $width
The global variable width gets the width from user navigator. The value is in pixels, only numbers. Example:
´´´
add container cnt to global
is ($width > 800) ?
   set style "width:calc(10% + $width); height:100px; background-color:red;" to cnt
not ?
   set style "width:calc(20% + $width); height:10px; background-color:blue;" to cnt
ok
´´´
### $height
The global variable height gets the height from user navigator. The value is in pixels, only numbers. Example:
´´´
add container cnt to global
is ($height > 600) ?
   set style "width:10px; height:calc(50% + $height); background-color:red;" to cnt
not ?
   set style "width:10px; height:calc(20% + $height); background-color:blue;" to cnt
ok
´´´
### mobile
Checks if the user are using a phone or not. The variable is boolean and can be true or false. Example:
´´´
add container cnt to global
is ($mobile) ?
   set color "red" to cnt
   set value "mobile" to cnt
not ?
   set value "desktop" to cnt
ok
´´´
## Examples
Simple phone template for a small blog:
´´´
add global global to 
set gradient "96deg, #6ba2bc, #ac8e6e" to global
set "float:left;position:relative;width:80%; height:calc(($height / 5) * 1px);margin-top:5px; left:10%;background-color:rgba(0,0,0,0.1);border-radius:9px;font-family:arial;text-align:center;" to $box_template
add container banner to global
set style "$box_template" to banner
set value "$blog_name" to banner
add template posts_container to global for $posts
add container post_$id to posts_container
set top "calc(($height / 10) + ($height / 10) * $id)" to post_$id
set style "$box_template" to post_$id
add container title_$id to post_$id
set style "width:100%;font-weight:bold" to title_$id
set align "center" to title_$id
set value "$title" to title_$id
add container post_content_$id to post_$id
set style "width:80%;left:10%;float:left;position:relative;" to post_content_$id
set value "$content" to post_content_$id
´´´
Considering that the code above is written on a textarea called "code", the following snippet shows you the way to compile and interpret this code. You can compile it before and just save the bytecode on a file and databate, but here I will show the complete process.
´´´Javascript
//first we get the code from the textarea
let code = document.getElementById("code");
//here we compile it in the TeLa bytecode, you can do it before and just save the compiled code
let bytecode = compiller(code);
//here is the dataset, you can get it from a database or something like this
let data = JSON.parse('{"blog_name":"example", "posts":[{"id":0, "title":"post 1", "content":"Lorem  ipsum sit amet"}, {"id":1, "title":"post 2", "content":"Lorem  ipsum sit amet 2"}, {"id":2, "title":"post 3", "content":"Lorem  ipsum sit amet 3"}, {"id":3, "title":"post 4", "content":"Lorem  ipsum sit amet 4"}]}');
//get the container
let container = document.getElementById("container");
//here, the interpreter gets the bytecode and data and converts in HTML and CSS
interpret(container, data, bytecode);
´´´