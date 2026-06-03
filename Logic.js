const main_cont = document.getElementById("main-container");
const button_next = document.getElementById("button_next");
const button_prev = document.getElementById("button_prev");
const navbar = document.getElementById("navbarNav");

let page_num = 0;

const content = [
    "page_1.html",
    "page_2.html",
    "page_3.html"
];


function draw_content() {
    const fileName = content[page_num];

    $.get(fileName)
        .done(function(htmlData) {
            $('html, body').animate({scrollTop: 0}, 100, 'swing');
            main_cont.innerHTML = htmlData;
            update_buttons();

            if (page_num == 2) {
                import("./page_3.js")
                    .then(module => {
                        module.Page3Logic.init();
                    });
            }
        })
        .fail(function() {
            console.error("Ошибка загрузки файла");
        });
}

navbar.addEventListener("click", function(event){
    const clickedLink = event.target.closest("a.nav-link");
    if(!clickedLink) return;
    page_num = clickedLink.getAttribute("data-page");
    draw_content();

})

button_next.addEventListener("click", function(){
    if(page_num < content.length - 1){
        page_num++;
        draw_content();
    }
})

button_prev.addEventListener("click", function(){
    if(page_num > 0){
        page_num--;
        draw_content();
    }
})

function update_buttons(){
    button_prev.style.visibility = (page_num == 0) ? "hidden" : "visible";
    button_next.style.visibility = (page_num == content.length - 1) ? "hidden" : "visible";
}

draw_content();