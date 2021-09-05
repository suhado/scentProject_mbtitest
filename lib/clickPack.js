var clickPack = {
    start: function() {
        $(".start").hide();
        $(".question").show();
        nextPack.next();
    },
    sendData: function() {
        $(".start").hide();
        $(".question").hide();
        $(".result").hide();
        $(".more_result").show();
        infoPack.moreInfo();
        window.scrollTo(0,0);
    },
    survey: function() {
        const url = 'https://docs.google.com/forms/d/e/1FAIpQLSe_SEmpnifk2MQnvHx8BALipOr8YW8S2EpaaFJNmVktDxAqKA/viewform?usp=sf_link';
        window.open(url);
    },
    clip: function() {
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
    },
    restart: function() {
        $(".start").show();
        $(".question").hide();
        $(".result").hide();
        $(".more_result").hide();

        this.resetValue();
    },
    back: function() {
        $(".start").hide();
        $(".question").hide();
        $(".more_result").hide();
        $(".result").show();
    },
    resetValue: function() {
        var set = document.getElementsByClassName("setValue");
        mbti = "";
        set[0].value="EI";
        set[1].value = "0";
        set[2].value = "0";
        set[3].value = "0";
        set[4].value = "0";
    }
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
        setTimeout(function () {
            dimLayer != null ? dimLayer.remove() : "";
            $(".modal-section").hide();
        }, this.timer);
    }
    
};

