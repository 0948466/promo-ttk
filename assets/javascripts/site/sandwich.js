$(function () {
    const sandwich = $('.js-sandwich');
    const sidebar = $('.js-sidebar');
    const CLASS_SIDEBAR = 'main-header__sidebar';
    const CLASS_SIDEBAR_SHOW = 'main-header__sidebar_show';

    if (!sandwich.length) {
        return;
    }
    
    function onSandwichClick(e) {
        const target = $(e.target);
        if (target.closest(`.${CLASS_SIDEBAR}`).length ) {
            return;
        }
        sidebar.toggleClass(CLASS_SIDEBAR_SHOW);
    }

    sandwich.on('click', onSandwichClick)
})