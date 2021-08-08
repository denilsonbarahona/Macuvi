import cash from 'cash-dom';

window.addEventListener("load",()=>{

    cash(".body").on("click", 'div[data-toggle="tab"]', function (key, el) {
        // Set active tab nav
        cash(this)
            .closest(".nav-tabs")
            .find('div[data-toggle="tab"]')
            .removeClass("active");
        cash(this).addClass("active");

        // Set active tab content
        let elementId = cash(this).attr("data-target");
        cash(elementId)
            .closest(".tab-content")
            .find(".tab-content__pane")
            .removeClass("active");
        cash(elementId).addClass("active");
    });

})

