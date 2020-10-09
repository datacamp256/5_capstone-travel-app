let targetDate;
let countdown;

//public functions here

function initCountDown() {
    const isoDate = document.getElementById('start-input').value;
    const reformattedDate = isoDate.replace(/-/g, '/');
    targetDate = new Date(reformattedDate);
    //IE and Safari handles don't know input of type 'date', so we have got to vali-date
    if (isNaN(targetDate.getDay())) {
        stopCountdown()
        throw `${isoDate} is not an ISO-8601 date (yyyy-mm-dd)`
    }
    countdown = setInterval(updateCountdown, 60000);
    updateCountdown();
}

// private functions here

function stopCountdown() {
    if (countdown) {
        clearInterval(countdown);
    }
}

function updateCountdown() {
    let diff = new Date(targetDate) - new Date();
    let newText;
    if (diff <= 0) {
        newText = '';
        stopCountdown();
    } else {
        const days = Math.ceil(diff / 86400000);
        newText = `${days} days to go`;
    }
    Client.dom_setCountdown(newText);
}

// exports
module.exports.countdown_initCountDown = initCountDown;