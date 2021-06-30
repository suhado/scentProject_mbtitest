var infoPack = {
    recommend_result: JSON.parse(JSON.stringify(product_data)),
    more_tag: document.getElementById("more_items"),
    recommend_tag: document.getElementById("recommend_item"),

    // recommend_item 3개 출력 (img,name,house)
    recommend: function() {
        var recommend_info = this.recommend_result[mbti];
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
        this.recommend_tag.innerHTML = replace_recommend_info;
    },

    moreInfo: function() {
        var more_info = this.recommend_result[mbti];
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
        return (this.more_tag.innerHTML = replace_more_info);
    }
};