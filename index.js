var num = 1;

// javascript 객체

const q = JSON.parse(JSON.stringify(question));
const explain_yTag = document.getElementById("explain_y");
const result = JSON.parse(JSON.stringify(data));
const recommend_tag = document.getElementById("recommend_item");
const more_tag = document.getElementById("more_items");
const recommend_result = JSON.parse(JSON.stringify(product_data));

let mbti = "";


// 시작버튼
function start() {
    $(".start").hide();
    $(".question").show();
    next();
}

function restart() {
    $(".start").show();
    $(".question").hide();
    $(".result").hide();
    $(".more_result").hide();

    resetValue();
}


function sendData() {
    $(".start").hide();
    $(".question").hide();
    $(".result").hide();
    $(".more_result").show();
    moreInfo();
    window.scrollTo(0,0);
}

function init() {
    $("#A").css("background-color", "#ffffff");
    $("#B").css("background-color", "#ffffff");
    $("#A").css("color", "#2D2D2D");
    $("#B").css("color", "#2D2D2D");
}

$("#A").click(function () {
    init();
    $("#A").css("background-color", "#9706ED");
    $("#A").css("color", "#ffffff");
    var type = $("#type").val();
    var preValue = $("#" + type).val();
    $("#" + type).val(parseInt(preValue) + 1);
    next();
});

$("#B").click(function () {
    init();
    $("#B").css("background-color", "#9706ED");
    $("#B").css("color", "#ffffff");
    next();
});


function mbtiCalc() {
    $("#EI").val() < 2 ? (mbti += "I") : (mbti += "E");
    $("#SN").val() < 2 ? (mbti += "N") : (mbti += "S");
    $("#TF").val() < 2 ? (mbti += "F") : (mbti += "T");
    $("#JP").val() < 2 ? (mbti += "P") : (mbti += "J");

    return mbti;
}


function resetValue(){
    var set = document.getElementsByClassName("setValue");
    mbti = "";
    set[0].value="EI";
    set[1].value = "0";
    set[2].value = "0";
    set[3].value = "0";
    set[4].value = "0";
}

// 더보기 페이지 innerHTML
function moreInfo() {
var more_info = recommend_result[mbti];
var replace_more = [];
more_info.forEach(function (item) {
    var push_more = replace_more.push(
    item["img"],
    item["name"],
    item["house"],
    item["type"],
    item["top"],
    item["middle"],
    item["base"]
    );
    return push_more;
});

var replace_more_info = "";

const pd_length = parseInt(replace_more.length / 7);
var lastpd = [];

function printNote(element, note) {
    var capNote = note.charAt(0).toUpperCase() + note.slice(1);
    return element.length ? `<div class="${note}">${capNote} Notes:<br> ${element}</div>` : ``;
}

for (var i = 0; i < pd_length; i++) {
    lastpd = replace_more.slice(7 * i, 7 * i + 7);

    
    replace_more_info += `
        <li class="pd_list"> 
            <img class="contain" src=${lastpd[0]} alt="대체이미지">
            <div class="product">
                <div class="name">${lastpd[1]}</div>
                <div class="house">${lastpd[2]}</div>
                <div class="type">Type: ${lastpd[3]}</div>
                ${printNote(lastpd[4], "top")}
                ${printNote(lastpd[5], "middle")}
                <div class="base">Base Notes:<br> ${lastpd[6]}</div>
            </div>
        </li>`;
}
return (more_tag.innerHTML = replace_more_info);
}

// recommend_item 3개 출력 (img,name,house)
function recommendInfo() {
var recommend_info = recommend_result[mbti];
var replace_recommend_img = [];
var replace_recommend_test = [];

recommend_info.forEach(function (item) {
    var push_img = replace_recommend_img.push(item["img"]);
    var push_test = replace_recommend_test.push(
    item["img"],
    item["name"],
    item["house"]
    );
    return [push_img, push_test];
});

var replace_recommend_info = "";

var test = [];
for (var i = 0; i < 3; i++) {
    test = replace_recommend_test.slice(3 * i, 3 * i + 3);
    replace_recommend_info += `<li class="pd_list"> <img class="contain" src=${test[0]} alt="대체이미지"> <div class="pre_product"> <span class="name">${test[1]}</span> <span class="house">${test[2]}</span> </div> </li>`;
}
recommend_tag.innerHTML = replace_recommend_info;
}

function clip(){
	var dummy = document.createElement('input'),
        text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    $(document).on("click", "#copyLink", function () {
        action_popup.alert("링크가 복사되었습니다.");
    });

    $(".modal_close").on("click", function () {
        action_popup.close(this);
        $(".modal_close").css("color", "#ffffff");
    });
};

var action_popup = {
    timer: 500,

    alert: function (txt) {
        this.open("type-alert", txt);

    },

    open: function (type, txt) {
        var popup = $("." + type);
        popup.find(".menu_msg").text(txt);
        $("body").append("<div class='dimLayer'></div>");
        $(".dimLayer").css('height', $(document).height()).attr("target", type);
        // popup.fadeIn(this.timer);
        $(".modal-section").show();

    },

    close: function (target) {
        var modal = $(target).closest(".modal-section");
        var dimLayer;
        if (modal.hasClass("type-alert")) {
            dimLayer = $(".dimLayer[target=type-alert]")
        } else {
            console.warn("close unknown target.")
            return;
        }
        // modal.fadeOut(this.timer);
        
        setTimeout(function () {
            dimLayer != null ? dimLayer.remove() : "";
            $(".modal-section").hide();
        }, this.timer);
    }
}

// function clipMessage() {
//     var tooltip = document.getElementById("myTooltip");
//     tooltip.innerHTML = "Copy to clipboard";
// }

function back() {
    $(".start").hide();
    $(".question").hide();
    $(".more_result").hide();
    $(".result").show();
}


// 다음문제 - 마지막문제 or 마지막문제가 아닐때
function next() {
    if (num == 13) {
        $(".question").hide();
        $(".more_result").hide();
        $(".result").show();

        var mbti = mbtiCalc();


        $("#result_img").attr("src", result[mbti]["img"]);
        $("#party").html(result[mbti]["party"]);
        $("#explain").html(result[mbti]["explain"]);
        $("#explain2").html(result[mbti]["explain2"]);
        var explain_yText = result[mbti]["explain_y"];
        var replace_explain_y = "";
        $("#explain_y").html(explain_yText);

        explain_yTag.innerHTML.split("\n").forEach((item) => {
        replace_explain_y += `<li>` + item + `</li>`;
        });
        explain_yTag.innerHTML = replace_explain_y;

        recommendInfo();

        num = 1;
        
    
        
    } else {
        // $(".progress-bar").attr("style", "width: calc(100/12*" + num + "%)");
        $("#title").html(q[num]["title"]);
        $("#type").val(q[num]["type"]);
        $("#A").html(q[num]["A"]);
        $("#B").html(q[num]["B"]);
        num++;
}

//TODO 버튼 색 바꿨다 돌아오는 코드 다시 작성
    setInterval(init, 500);
}

//JQuery conflict with google tag manager
var func = function() {
    if (jQuery) {  
        clearInterval(forJtimer);
        // do your stuff
    }
}
var forJtimer = setInterval(func, 1000);