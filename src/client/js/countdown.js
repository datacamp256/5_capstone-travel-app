let targetDate;
let countdown;

function initCountDown() {
    targetDate = document.getElementById('start-input').value;
    countdown = setInterval(updateCountdown, 1000);
    updateCountdown();
}

function updateCountdown() {
    let diff = new Date(targetDate.replace(/-/g, '/')) - new Date();
    let newText;
    if (diff <= 0) {
        newText = '';
        clearInterval(countdown);
    } else {
        const days = Math.ceil(diff / 86400000);
        newText = `${days} days to go`;
    }
    Client.dom_setCountdown(newText);
}


module.exports.countdown_initCountDown = initCountDown;