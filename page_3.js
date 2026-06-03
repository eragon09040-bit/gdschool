export const Page3Logic = {
    current_step: 0,
    steps_files: [
        "step_1.html",
        "step_2.html",
        "step_3.html",
        "step_4.html",
        "step_5.html",
        "step_6.html",
        "step_7.html"
    ],

    init: function() {
        this.current_step = 0;
        this.loadStep();
        const container = document.getElementById("section_3");
        if (container) {
            container.addEventListener("click", this.handleClicks.bind(this));
        }
    },

    handleClicks: function(event) {
        if (event.target.id === "lesson_next") {
            if (this.current_step < this.steps_files.length - 1) {
                this.current_step++;
                this.loadStep();
            }
        } 
        else if (event.target.id === "lesson_prev") {
            if (this.current_step > 0) {
                this.current_step--;
                this.loadStep();
            }
        }
    },

    loadStep: function() {
        const fileName = this.steps_files[this.current_step];
        const stepContainer = document.getElementById("step-content");

        if (!stepContainer) return;

        $.get(fileName)
            .done((htmlData) => {
                stepContainer.innerHTML = htmlData;
                this.updateUI();
            })
            .fail(() => {
                console.error("Ошибка загрузки файла шага");
            });
    },

    updateUI: function() {
        const btnPrev = document.getElementById("lesson_prev");
        const btnNext = document.getElementById("lesson_next");
        const counter = document.getElementById("lesson_counter");
        const total = this.steps_files.length;

        if (btnPrev) btnPrev.style.visibility = (this.current_step === 0) ? "hidden" : "visible";
        if (btnNext) btnNext.style.visibility = (this.current_step === total - 1) ? "hidden" : "visible";
        if (counter) counter.innerText = `Шаг ${this.current_step + 1} из ${total}`;
    }
};