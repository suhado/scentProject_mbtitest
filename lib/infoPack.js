var infoPack = {
    recommend_result: JSON.parse(JSON.stringify(product_data)),
    more_tag: document.getElementById("more_items"),
    recommend_tag: document.getElementById("recommend_item"),

    // recommend_item 3개 출력 (img,name,house)
    recommend: function() {
        var recommend_info = this.recommend_result[mbti];
        var replace_recommend_info = "";
        for (var i = 0; i < 3; i++) {
            replace_recommend_info += `<li class="pd_list"> <img class="contain" src=${recommend_info[i].img} alt="대체이미지"> <div class="pre_product"> <span class="name">${recommend_info[i].name}</span> <span class="house">${recommend_info[i].house}</span> </div> </li>`;
        }
        this.recommend_tag.innerHTML = replace_recommend_info;
    },

    moreInfo: function() {
        var more_info = this.recommend_result[mbti];      
        var replace_more_info = "";
        
        function printNote(element, note) {
            var capNote = note.charAt(0).toUpperCase() + note.slice(1);
            return element.length ? `<div class="${note}">${capNote} Notes:<br> ${element}</div>` : ``;
        }
       
        for (var i = 0; i < more_info.length; i++) {
            replace_more_info += `
                <li class="pd_list"> 
                    <img class="contain" src=${more_info[i].img} alt="대체이미지">
                    <div class="product">
                        <div class="name">${more_info[i].name}</div>
                        <div class="house">${more_info[i].house}</div>
                        <div class="type">Type: ${more_info[i].type}</div>
                        ${printNote(more_info[i].top, "top")}
                        ${printNote(more_info[i].middle, "middle")}
                        <div class="base">Base Notes:<br> ${more_info[i].base}</div>
                    </div>
                </li>`;
        }
        return (this.more_tag.innerHTML = replace_more_info);
    }
};
