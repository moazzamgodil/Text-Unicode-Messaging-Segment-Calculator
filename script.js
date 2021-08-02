/**
 * Proudly created by Moazzam Ahmed
 */
const source = document.getElementById('checkGSM');
const text = document.getElementById('text');
const result = document.getElementById('result');
const unicode = document.getElementById('unicode');
const textLength = document.getElementById('length');
const message = document.getElementById('message');
const unicodeScalars = document.getElementById('unicodeScalars');
const messageSize = document.getElementById('messageSize');
const totalSizeSent = document.getElementById('totalSizeSent');
const uclist = document.getElementById('uclist');
const selectAllUc = document.getElementById('selectAllUc');

const inputHandler = function (e) {
    var len = e.target.value.length;
    var response = isGSMAlphabet(e.target.value);
    var lengthResponse = lengthCheck(len, response);
    var messageSizeResponse = messageSizeCheck(len, response, lengthResponse);
    var unicodeResponse = toUnicode(e.target.value, response);

    text.innerHTML = unicodeResponse[1];
    unicode.innerHTML = unicodeResponse[0];
    result.innerHTML = response ? "GSM-7" : "UCS-2";
    textLength.innerHTML = len;
    unicodeScalars.innerHTML = len;
    message.innerHTML = lengthResponse;
    messageSize.innerHTML = messageSizeResponse[0];
    totalSizeSent.innerHTML = messageSizeResponse[1];
    var cuResponse = checkUnicode(e.target.value);

    arrToNode(cuResponse);
    uclist.querySelectorAll('span').forEach(el => el.addEventListener('click', (e) => check(el.innerHTML)))
    cuResponse.length > 1 ? selectAllUc.classList.add("act") : selectAllUc.classList.remove("act");
    selectAllUc.addEventListener('click', (e) => check(selectAllUc.innerHTML));

}

function arrToNode(arr) {
    uclist.innerHTML = "";
    arr.length == 0 ? uclist.innerHTML = "None" : "";
    for (let i = 0; i < arr.length; i++) {
        uclist.innerHTML += `<span id=${i}>${arr[i]}</span>`;
    }
}

function lengthCheck(len, res) {
    var char = res ? 160 : 70;
    if (len !== 0 && char === 160) {
        var message = len > char ? Math.ceil(len / (char - 7)) : 1;
    } else if (len !== 0 && char === 70) {
        var message = len > char ? Math.ceil(len / (char - 3)) : 1;
    } else {
        var message = 0;
    }
    return message;
}

function messageSizeCheck(len, res, segment) {
    var char = res ? 160 : 70;
    if (len !== 0 && char === 160) {
        var size = (len * 7);
        var total = segment > 1 ? ((segment * 6) * 8) + size : size;

    } else if (len !== 0 && char === 70) {
        var size = (len * 16);
        var total = segment > 1 ? ((segment * 6) * 8) + size : size;

    } else {
        var size = total = 0;
    }
    return [size, total];
}

function toUnicode(str, res) {
    var bg = ["#CCE4FF", "#D1FAE0", "#FDDCC4", "#FFF1B3", "#E7DCFA", "#FFB9B9", "#A5F7FF", "#FDF5E6"];
    var char = res ? 160 : 70;
    var head = (char == 160) ? 7 : 3;
    var i = 0;
    var ucStr = "unicode";
    var txtStr = "text";

    var uc = str.split('').map(function (value, index, array) {
        var temp = value.charCodeAt(0).toString(16).padStart(4, '0');
        if (temp.length > 2) {
            var j = Math.floor(i / (char - ((index + 1) > char ? head : 0)));
            j > 7 ? i = j = 0 : ++i;
            return '<span class="uc" style="background: ' + bg[j] + ';" onmouseover=ucHover(' + index + ',' + '"unicode"' + ') onmouseout="ucHoverOut(' + index + ')">0x<span>' + temp + '</span></span>';
        }
        return value;
    }).join(' ');

    i = 0;
    var txt = str.split('').map(function (value, index, array) {
        var j = Math.floor(i / (char - ((index + 1) > char ? head : 0)));
        j >= 8 ? i = j = 0 : ++i;
        if (value == "\n") {
            value = '<span class="linebreak">&#x2022;</span>';
        } else if (/\s/g.test(value)) {
            value = "&nbsp;";
        }
        return '<span class="txt" style="background: ' + bg[j] + ';" onmouseover=ucHover(' + index + ',' + '"text"' + ') onmouseout="ucHoverOut(' + index + ')">' + value + '</span>';
    }).join('');

    return [uc, txt]
}

function isGSMAlphabet(text) {
    var regexp = new RegExp("^[A-Za-z0-9 \\r\\n@£$¥èéùìòÇØøÅå\u00a4\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!\"#$%&'()*+,\\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\\\\\[~\\]|\u20AC]*$");

    return regexp.test(text);
}

function checkUnicode(str) {

    var arr = [];
    str = str.split("");
    var x = document.getElementById("unicode").querySelectorAll(".uc");
    for (let i = 0; i < str.length; i++) {
        isGSMAlphabet(str[i]) !== false ? "" : (x[i].style.background = "#ff5858", arr.push(str[i]));
    }
    var unique = arr.filter(onlyUnique);

    return unique;
}

function ucHover(i, type) {
    unicode.children[i].classList.add("hoverColor");
    text.children[i].classList.add("hoverColor");

    type == "unicode" ? text.children[i].scrollIntoView() : unicode.children[i].scrollIntoView();
}

function ucHoverOut(i) {

    unicode.children[i].classList.remove("hoverColor");
    text.children[i].classList.remove("hoverColor");
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function check(txt) {
    str = text.textContent;
    if (txt === "Select All") {
        var uclist = document.getElementById("uclist").textContent.split("");
        for (var i = 0; i < str.length; i++) {
            for (var j = 0; j < uclist.length; j++) {
                if (str[i] === uclist[j]) text.children[i].classList.add("warn");
            }
        }
    } else {
        for (var i = 0; i < str.length; i++) {
            if (text.children[i].classList.contains("warn")) text.children[i].classList.remove("warn");
        }
        for (var i = 0; i < str.length; i++) {
            if (str[i] === txt) {
                text.children[i].classList.add("warn");
                text.children[i].scrollIntoView()
                unicode.children[i].scrollIntoView();
            }
        }
    }

}

source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);
