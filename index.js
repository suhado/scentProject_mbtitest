var num = 1;
let mbti = "";

var nextPack = {
    explain_yTag : document.getElementById("explain_y"),
    result : JSON.parse(JSON.stringify(data)),
    q : JSON.parse(JSON.stringify(question)),
    // 다음문제 - 마지막문제 or 마지막문제가 아닐때    
    next: function() {
        if (num == 13) {
            $(".question").hide();
            $(".more_result").hide();
            $(".result").show();
    
            var mbti = this.mbtiCalc();
    
            $("#result_img").attr("src", this.result[mbti]["img"]);
            $("#party").html(this.result[mbti]["party"]);
            $("#explain").html(this.result[mbti]["explain"]);
            $("#explain2").html(this.result[mbti]["explain2"]);
            var explain_yText = this.result[mbti]["explain_y"];
            var replace_explain_y = "";
            $("#explain_y").html(explain_yText);
    
            this.explain_yTag.innerHTML.split("\n").forEach((item) => {
            replace_explain_y += `<li>` + item + `</li>`;
            });
            this.explain_yTag.innerHTML = replace_explain_y;
    
            infoPack.recommend();
    
            num = 1;
            
        } else {
            // $(".progress-bar").attr("style", "width: calc(100/12*" + num + "%)");
            $("#title").html(this.q[num]["title"]);
            $("#type").val(this.q[num]["type"]);
            $("#A").html(this.q[num]["A"]);
            $("#B").html(this.q[num]["B"]);
            num++;
    }
    
    //TODO 버튼 색 바꿨다 돌아오는 코드 다시 작성
        setInterval(this.init, 500);
    },

    mbtiCalc: function() {
        $("#EI").val() < 2 ? (mbti += "I") : (mbti += "E");
        $("#SN").val() < 2 ? (mbti += "N") : (mbti += "S");
        $("#TF").val() < 2 ? (mbti += "F") : (mbti += "T");
        $("#JP").val() < 2 ? (mbti += "P") : (mbti += "J");
    
        return mbti;
    },

    init: function() {
        $("#A").css("background-color", "#ffffff");
        $("#B").css("background-color", "#ffffff");
        $("#A").css("color", "#2D2D2D");
        $("#B").css("color", "#2D2D2D");
    }
};

//JQuery conflict with google tag manager
var func = function() {
    if (jQuery) {  
        clearInterval(forJtimer);
        // do your stuff
    }
}
var forJtimer = setInterval(func, 1000);