import cash from 'cash-dom';

window.addEventListener("load",()=>{

    cash(".top-bar, .top-bar-boxed")
        .find(".search")
        .find("input")
        .each(function () {
            cash(this).on("focus", function () {
                cash(".top-bar, .top-bar-boxed")
                    .find(".search-result")
                    .addClass("show");
            });

            cash(this).on("focusout", function () {
                cash(".top-bar, .top-bar-boxed")
                    .find(".search-result")
                    .removeClass("show");
            });
        });

})

