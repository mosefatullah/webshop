let selected = false;
let access = false;
let selected_item = "";

/********* # AUTO CHANGE - ************/

/* Render the selected element */
setInterval(() => {
    if (document.querySelector("#ctrl-s option:checked")) {
        selected = document.querySelectorAll(".body #" + document.querySelector("#ctrl-s option:checked").innerHTML)[0];
        renderDataToAll();
    }
}, 1);

/* Accessing edit tab */
setInterval(() => {
    if (selected != false) {
        access = true;
    } else {
        access = false;
        /* all edit tabs */
        document.querySelectorAll(".edit_property")[0].style.display = "none";
        document.querySelectorAll(".edit_style")[0].style.display = "none";
        document.querySelectorAll(".edit_text")[0].style.display = "none";
        document.querySelectorAll(".edit_size")[0].style.display = "none";
        document.querySelectorAll(".edit_color")[0].style.display = "none";
        document.querySelectorAll(".edit_event")[0].style.display = "none";

        /* ahow alert */
        const i = document.querySelectorAll(".editbox .grid button");
        for (let l = 0; l < i.length; l++) {
            i[l].classList.remove("active");
            i[l].onclick = function () {
                showAlert("First create an item for edit!");
            };
        }
    }
}, 1);

/* Show the marked element in the edit box */
setInterval(() => {
    for (let po = 0; po < document.querySelectorAll(".bx mark").length; po++) {
        document.querySelectorAll(".bx mark")[po].innerHTML = "Layer: " + (selected !== false ? selected.id : "");
    }
}, 1);

/* Show the preview of code */
setInterval(() => {
    let xc = formatCode(document.querySelectorAll(".body")[0].innerHTML.replace(/\s+/g, ' ').trim());
    document.querySelectorAll("#preview")[0].value = (xc !== "" ? xc: ">> First create an item for preview!");
}, 1);

/* Formatter */
function formatCode(html) {
    var indent = '\n';
    var tab = '\t';
    var i = 0;
    var pre = [];
    html = html
        .replace(new RegExp('<pre>((.|\\t|\\n|\\r)+)?</pre>'), function (x) {
            pre.push({
                indent: '',
                tag: x
            });
            return '<--TEMPPRE' + i++ + '/-->'
        })
        .replace(new RegExp('<[^<>]+>[^<]?', 'g'), function (x) {
            var ret;
            var tag = /<\/?([^\s/>]+)/.exec(x)[1];
            var p = new RegExp('<--TEMPPRE(\\d+)/-->').exec(x);

            if (p)
                pre[p[1]].indent = indent;

            if (['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'].indexOf(tag) >= 0) // self closing tag
                ret = indent + x;
            else {
                if (x.indexOf('</') < 0) { //open tag
                    if (x.charAt(x.length - 1) !== '>')
                        ret = indent + x.substr(0, x.length - 1) + indent + tab + x.substr(x.length - 1, x.length);
                    else
                        ret = indent + x;
                    !p && (indent += tab);
                } else { //close tag
                    indent = indent.substr(0, indent.length - 1);
                    if (x.charAt(x.length - 1) !== '>')
                        ret = indent + x.substr(0, x.length - 1) + indent + x.substr(x.length - 1, x.length);
                    else
                        ret = indent + x;
                }
            }
            return ret;
        });
    for (i = pre.length; i--;) {
        html = html.replace('<--TEMPPRE' + i + '/-->', pre[i].tag.replace('<pre>', '<pre>\n').replace('</pre>', pre[i].indent + '</pre>'));
    }
    return html.charAt(0) === '\n' ? html.substr(1, html.length - 1) : html;
}

/********* # ADD NEW ELEMENT - PROMPT BOX **********/

/**|| Add new items from box ||**/
function addItem() {
    let id = "";
    let fi = document.querySelectorAll(".addnewbox .item .select p")[0];
    let items = {};
    let item2 = {
        "Text": "text",
        "Button": "button",
        "Image": "image",
        "Audio": "audio",
        "Video": "video",
        "Link": "link",

        "Input": "input",
        "Textarea": "textarea",
        "Checkbox": "checkbox",
        "Dropdown": "dropdown",
        "Radio Button": "radio",
        "Slider Input": "slider",
        "Date/Time Picker": "datetime-picker",
        "File Uploader": "file-uploader"
    };
    if (fi) {
        for (const item_name in item2) {
            if (item_name == fi.innerHTML) {
                showIdBox(item_name, item2);
                checkTheID(function (item) {
                    id = item;
                    renderAllItem(id);
                    processForItem(item_name)
                    addLayerID(id);
                    successItemed(id);
                });
            }
        }
        /* end adding item */
    }
}

/* Show the ID set box */
function showIdBox(item_name, item2) {
    document.querySelectorAll(".idset")[0].style.display = "";
    document.querySelectorAll(".addnewbox")[0].style.display = "none";
    document.querySelectorAll("#idset")[0].value = item2[item_name] + "-";
}

/* Check the ID if available or not */
function checkTheID(y) {
    document.querySelectorAll(".idset button")[0].onclick = function () {
        let flag = false;
        let oi = document.querySelectorAll("#ctrl-s option");
        for (let m = 0; m < oi.length; m++) {
            if (oi[m].innerHTML == document.querySelectorAll("#idset")[0].value) {
                flag = true;
            }
        }
        if (flag == false) {
            document.querySelectorAll(".idset")[0].style.display = "none";
            return y(document.querySelectorAll("#idset")[0].value.replace(/\s+/g, '-').replace(" ", "-").trim());
        } else {
            setTimeout(() => {
                showAlert("Current ID is already available!");
            }, 1000);
        }
    }
}

/* Rendering all items code */
function renderAllItem(id) {
    let url_auto = window.location.protocol + "//" + window.location.host + "/";
    items = {
        "Text": ' <p id="' + id + '" style="font-family: sans-serif;">Honesty is defined as the most significant human value. It is the most exalting trait found in a human being for which he will always be praised. He is worthy of being trusted by his worst enemies. Honesty means someone who has no desire to lie, steal, or cheat anyone. An honest person will always favor the truth. This characteristic is synonymous with loyalty. It is rare to be deceived by a truthful person.</p>',
        "Button": ' <button id="' + id + '" style="background: rgb(3, 180, 198) none repeat scroll 0% 0%; color: rgb(255, 255, 255); flex-grow: 1; cursor: pointer; outline: none; min-width: 64px; border-radius: 4px; box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%); border: none; font-weight: 500; line-height: 1.15; font-size: 14px; height: 36px; word-spacing: 0px; letter-spacing: .0892857143em; text-decoration: none; text-transform: uppercase; text-align: center; padding: 0 16px; transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); font-family: sans-serif;">Button</button>',
        "Image": ' <img src="'+url_auto+'assets/demo/photo-1.avif" />',
        "Audio": ' <audio controls src="'+url_auto+'assets/demo/horse.ogg">Your browser does not support the audio element.</audio>',
        "Video": ' <video width="320" height="240" controls src="'+url_auto+'assets/demo/movie.mp4">Your browser does not support the video tag.</video> ',
        "Link": ' <a id="' + id + '" href="##" target="_self">Click here for go</a>',

        "Input": ' <input id="' + id + '" type="text" value="" placeholder="Enter somethings.." style="outline: none; margin: 10px 20px; background-color: #ffffff; background-repeat: no-repeat; background-position: right 8px center; border: 1px solid #e1e4e8; border-radius: 6px; box-shadow: rgba(225, 228, 232, 0.2) 0px 1px 0px 0px inset; font-size: 14px; line-height: 20px; color: #24292e; vertical-align: middle; padding: 5px 12px;" />',
        "Textarea": ' <textarea id="' + id + '" style="resize: none; outline: none; margin: 10px 20px; background-color: #ffffff; background-repeat: no-repeat; background-position: right 8px center; border: 1px solid #e1e4e8; border-radius: 6px; box-shadow: rgba(225, 228, 232, 0.2) 0px 1px 0px 0px inset; font-size: 14px; line-height: 20px; color: #24292e; vertical-align: middle; padding: 5px 12px;">Some text</textarea>',
        "Checkbox": ' <input type="checkbox" id="' + id + '" /><label id="label-' + id + '" for="'+ id +'" style="user-select: none;"> I accept to the term</label>',
        "Dropdown": ' <select id="' + id + '" style="appearance: auto;width: 100px;"><option value="0">0</option><option value="1">1</option><option value="2">2</option></select>',
        "Radio Button": ' <input type="radio" id="' + id + '" /><label id="label-' + id + '" for="'+ id +'" style="user-select: none;"> I am a developer</label>',
        "Slider Input": ' <input type="range" min="1" max="100" value="50" id="' + id + '" />',
        "Date/Time Picker": ' <input id="' + id + '" type="datetime-local" style="outline: none; margin: 10px 20px; background-color: #ffffff; background-repeat: no-repeat; background-position: right 8px center; border: 1px solid #e1e4e8; border-radius: 6px; box-shadow: rgba(225, 228, 232, 0.2) 0px 1px 0px 0px inset; font-size: 14px; line-height: 20px; color: #24292e; vertical-align: middle; padding: 5px 12px;" />',
        "File Uploader": ' <input id="' + id + '" type="file" style="outline: none; margin: 10px 20px; background-color: #ffffff; background-repeat: no-repeat; background-position: right 8px center; border: 1px solid #e1e4e8; border-radius: 6px; box-shadow: rgba(225, 228, 232, 0.2) 0px 1px 0px 0px inset; font-size: 14px; line-height: 20px; color: #24292e; vertical-align: middle; padding: 5px 12px;" />'
    };
}

/* Paste the code into view box (body) */
function processForItem(item_name) {
    document.querySelectorAll(".body")[0].innerHTML += (items[item_name]);
    selected_item = item_name;
}

/* Success alert and selected item preventing */
function successItemed(id) {
    showAlert(id + " Created!");

    if (document.querySelectorAll(".addnewbox .item .select")[0]) {
        document.querySelectorAll(".addnewbox .item .select")[0].classList.remove("select");
    }
}

/*********** # SELECT LAYER - CHANGING *************/

/** Highlight the selected element **/
document.querySelectorAll("#ctrl-s")[0].onchange = function () {
    highlight(document.querySelectorAll(".body #" + document.querySelector("#ctrl-s option:checked").innerHTML)[0]);
};

function highlight(element) {
    let defaultBG = element.style.backgroundColor;
    let defaultBorder = element.style.border;
    let defaultTransition = element.style.transition;

    element.style.transition = "background 1s";
    element.style.backgroundColor = "#FDFF47";
    element.style.border = "2px dotted #FDFF47";

    setTimeout(function () {
        setTimeout(function () {
            element.style.transition = defaultTransition;
            element.style.backgroundColor = defaultBG;
            element.style.border = defaultBorder;
        }, 1000);
    }, 100);
}

/** Add the layer id to bottom select control box */
function addLayerID(id) {
    document.querySelectorAll("#ctrl-s")[0].innerHTML += '<option value="' + id.toLowerCase() + '">' + id + '</option>';
}


/************ ALERTS - SHOW **************/

function showAlert(a) {
    var x = document.getElementById("snackbar");
    x.style.display = "";
    x.className = "show";
    x.innerHTML = a;
    setTimeout(function () {
        x.style.display = "none";
    }, 1000);
}

/*************** EXPORT AS *****************/

function DownloadFile(name, value, blobs) {
    let DownloadName = name;
    let text = value;
    text = text.replace(/\n/g, "\r\n");
    let blob = new Blob([text], {
        type: blobs // text/plain
    });
    let anchor = document.createElement("a");
    anchor.download = DownloadName;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}