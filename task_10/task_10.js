(function ($) {

    $.fn.simpleTabs = function (options) {

        let settings = $.extend({
            activeClass: "active-tab",
            animationSpeed: 300,
            defaultTab: "home"
        }, options);

        return this.each(function () {

            let container = $(this);
            let tabs = container.find(".tab-links li");
            let panels = container.find(".tab-panel");

            function activateTab(tabName) {

                tabs.removeClass(settings.activeClass);
                panels.hide();

                tabs.filter('[data-tab="' + tabName + '"]')
                    .addClass(settings.activeClass);

                $("#" + tabName)
                    .fadeIn(settings.animationSpeed);

                history.pushState(null, null, "#" + tabName);
            }

            tabs.on("click", function () {
                let tabName = $(this).data("tab");
                activateTab(tabName);
            });

            tabs.attr("tabindex", "0");

            tabs.on("keydown", function (e) {

                let index = tabs.index(this);

                if (e.key === "ArrowRight") {
                    let next = (index + 1) % tabs.length;
                    tabs.eq(next).focus().click();
                }

                if (e.key === "ArrowLeft") {
                    let prev = (index - 1 + tabs.length) % tabs.length;
                    tabs.eq(prev).focus().click();
                }
            });

            let hash = window.location.hash.replace("#", "");

            if (hash && $("#" + hash).length) {
                activateTab(hash);
            } else {
                activateTab(settings.defaultTab);
            }

        });
    };

})(jQuery);



$(document).ready(function () {

    $(".tabs").simpleTabs({
        activeClass: "active-tab",
        animationSpeed: 400,
        defaultTab: "home"
    });

});