setInterval(() => {

    var win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        x = win.innerWidth || docElem.clientWidth || body.clientWidth,
        y = win.innerHeight || docElem.clientHeight || body.clientHeight;

    if (x <= 300) {
        document.querySelectorAll(".err0x0")[0].style.display = "block";
        document.querySelectorAll(".editor")[0].style.display = "none";
    } else {
        document.querySelectorAll(".err0x0")[0].style.display = "none";
        document.querySelectorAll(".editor")[0].style.display = "block";
        setTimeout(() => {
            document.querySelectorAll(".editor .welcome")[0].style.display = "none";
            document.querySelectorAll(".editor .main")[0].style.display = "block";
        }, 2000);
    }

}, 10);

document.querySelectorAll(".btg button")[0].onclick = function () {
    if (selected) {
        document.querySelectorAll(".body")[0].removeChild(selected);
        document.querySelectorAll("#ctrl-s")[0].removeChild(document.querySelectorAll("#ctrl-s option:checked")[0]);
        selected = false;
    }
};

for (let hk = 0; hk < document.querySelectorAll(".abc input").length; hk++) {
    document.querySelectorAll(".abc input")[hk].disabled = "true";
}

for (let o = 0; o < document.querySelectorAll(".main .headbar .right button").length; o++) {
    let state = false;
    document.querySelectorAll(".main .headbar .right button span")[o].onclick = function () {
        if (document.querySelectorAll(".main .headbar .right button")[o].querySelectorAll("div")[0]) {
            if (state == false) {
                document.querySelectorAll(".main .headbar .right button")[o].querySelectorAll("div")[0].style.display = "block";
                state = true;
            } else if (state == true) {
                document.querySelectorAll(".main .headbar .right button")[o].querySelectorAll("div")[0].style.display = "none";
                state = false;
            }
        }
    };
}

/*************/


Coloris({
    el: '.color-plbox3',
    swatches: [
        '#264653',
        '#2a9d8f',
        '#e9c46a',
        '#f4a261',
        '#e76f51',
        '#d62828',
        '#023e8a',
        '#0077b6',
        '#0096c7',
        '#00b4d8',
        '#48cae4'
    ]
});

document.querySelectorAll("#chng1")[0].onclick = function () {
    selected.style.backgroundColor = document.querySelectorAll(".color-plbox3")[0].value;
};

document.querySelectorAll("#chng2")[0].onclick = function () {
    selected.style.color = document.querySelectorAll(".color-plbox3")[0].value;
};

/********* ADD NEW ELEMENT - PROMPT BOX **********/

/** COLLAPSE **/
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

/** OPEN BUTTON **/
document.querySelectorAll(".main .addnew")[0].onclick = function () {
    document.querySelectorAll(".addnewbox")[0].style.display = "";
}

/** SELECT ITEM **/
const asd = document.querySelectorAll(".addnewbox .item div");

for (let p = 0; p < asd.length; p++) {
    asd[p].onclick = function () {
        asd[p].classList.add("select");
        for (let d = 0; d < asd.length; d++) {
            if (d != p) {
                asd[d].classList.remove("select");
            }
        }
    }
}

/** CANCEL BUTTON **/
document.querySelectorAll(".main .addnewbox button")[document.querySelectorAll(".main .addnewbox button").length - 1].onclick = function () {
    document.querySelectorAll(".main .addnewbox")[0].style.display = "none";
    let fi = document.querySelectorAll(".main .addnewbox .item .select")[0];
    if (fi) {
        fi.classList.remove("select");
    }
}

/** SELECT ACTION **/
document.querySelectorAll(".addnewbox button")[[document.querySelectorAll(".main .addnewbox button").length - 2]].onclick = function () {
    addItem();
}


/************* EDIT TAB BOX *************/

/**|| Handle the tab button ||**/
const ih = document.querySelectorAll(".editbox .grid button");

for (let l = 0; l < ih.length; l++) {
    setInterval(() => {
        ih[l].onclick = function () {
            if (access == true) {
                activeSwitch(l);
                eval("buttonAction" + l + "();");
            }
        };
    }, 100);
}

function activeSwitch(index) {
    ih[index].classList.add("active");
    for (let k = 0; k < ih.length; k++) {
        if (k != index) {
            ih[k].classList.remove("active");
        }
    }
}

/** Button handling more **/

function buttonAction0() {
    document.querySelectorAll(".edit_property")[0].style.display = "";
    setInterval(() => {
        if (selected_item == "Text") {
            buttonAction0_part(0);
        } else {
            document.querySelectorAll(".edit_property")[0].style.display = "none";
        }
    }, 100);

    document.querySelectorAll(".edit_style")[0].style.display = "none";
    document.querySelectorAll(".edit_text")[0].style.display = "none";
    document.querySelectorAll(".edit_size")[0].style.display = "none";
    document.querySelectorAll(".edit_color")[0].style.display = "none";
    document.querySelectorAll(".edit_event")[0].style.display = "none";
}

function buttonAction1() {
    document.querySelectorAll(".edit_property")[0].style.display = "none";
    document.querySelectorAll(".edit_style")[0].style.display = "";
    document.querySelectorAll(".edit_text")[0].style.display = "none";
    document.querySelectorAll(".edit_size")[0].style.display = "none";
    document.querySelectorAll(".edit_color")[0].style.display = "none";
    document.querySelectorAll(".edit_event")[0].style.display = "none";
}

function buttonAction2() {
    document.querySelectorAll(".edit_property")[0].style.display = "none";
    document.querySelectorAll(".edit_style")[0].style.display = "none";
    document.querySelectorAll(".edit_text")[0].style.display = "";
    document.querySelectorAll(".edit_size")[0].style.display = "none";
    document.querySelectorAll(".edit_color")[0].style.display = "none";
    document.querySelectorAll(".edit_event")[0].style.display = "none";
}

function buttonAction3() {
    document.querySelectorAll(".edit_property")[0].style.display = "none";
    document.querySelectorAll(".edit_style")[0].style.display = "none";
    document.querySelectorAll(".edit_text")[0].style.display = "none";
    document.querySelectorAll(".edit_size")[0].style.display = "";
    document.querySelectorAll(".edit_color")[0].style.display = "none";
    document.querySelectorAll(".edit_event")[0].style.display = "none";
}

function buttonAction4() {
    document.querySelectorAll(".edit_property")[0].style.display = "none";
    document.querySelectorAll(".edit_style")[0].style.display = "none";
    document.querySelectorAll(".edit_text")[0].style.display = "none";
    document.querySelectorAll(".edit_size")[0].style.display = "none";
    document.querySelectorAll(".edit_color")[0].style.display = "";
    document.querySelectorAll(".edit_event")[0].style.display = "none";
}

function buttonAction5() {
    document.querySelectorAll(".edit_property")[0].style.display = "none";
    document.querySelectorAll(".edit_style")[0].style.display = "none";
    document.querySelectorAll(".edit_text")[0].style.display = "none";
    document.querySelectorAll(".edit_size")[0].style.display = "none";
    document.querySelectorAll(".edit_color")[0].style.display = "none";
    document.querySelectorAll(".edit_event")[0].style.display = "";
}

/** Button more handling parts */

function buttonAction0_part(i) {
    /* let ii = document.querySelectorAll(".edit_property .abc")[i];
     if (ii) ii.style.display = "";
     for (let hj = 0; hj < document.querySelectorAll(".edit_property .abc").length; hj++) {
         if (hj != i) document.querySelectorAll(".edit_property .abc")[hj].style.display = "none";
     } */
}

/**|| Button tab box changing the edit property ||**/

function renderDataToAll() {
    /* header */
    if (selected_item == "Text") {

    }

}