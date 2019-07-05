$(function () {
    const timer = $('.js-timer');
    const timerSeconds = $('.js-timer span');
    const timeStart = $('.js-time-start');
    const answer = $('.wrap-radio .radio');
    if (!timerSeconds.length && !timeStart.length) {
        return
    }

    const CONST_SECONDS = 30;
    const CONST_TIME_ERROR = 2;
    const CONST_TIMER_WARNING_SEC = 5;
    const CONST_TIMER_WARNING_CLASS = 'question_wrap__timer_warning';
    const linkToNext = $('#render_link a');

    const [hour, min, sec] = timeStart.data('time-start').split(':');
    const date = new Date();
    const timezoneOffsetServer = 180 * 60 * 1000;
    const dateUserUTC = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    const dateServer = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay(), +hour, +min, +sec);
    const dateServerUTC_MS = +dateServer - timezoneOffsetServer;
    let dateResult = Math.floor(CONST_SECONDS - (+dateUserUTC - dateServerUTC_MS) / 1000 + CONST_TIME_ERROR);

    if (dateResult > CONST_SECONDS) {
        dateResult = CONST_SECONDS
    }

    function changeTimer() {
        const zero = (dateResult < 10) ? '0' : '';
        dateResult = (dateResult < 0) ? 0 : dateResult;
        timerSeconds.text(`${zero}${dateResult}`);
        if (dateResult <= CONST_TIMER_WARNING_SEC) {
            timer.addClass(CONST_TIMER_WARNING_CLASS);
        }
    }
    changeTimer();

    const timerId = setInterval(() => {
        dateResult += -1;
        changeTimer();
        if (dateResult < 1) {
            clearInterval(timerId);
            linkToNext.css('display', 'inline-flex');
        }
    }, 1000)

    answer.one('click', () => {
        clearInterval(timerId);
    })
});