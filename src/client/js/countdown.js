let targetDate;
function initCountDown() {
    targetDate = document.getElementById('start-input').value;
    console.log(targetDate);
}

module.exports.initCountDown = initCountDown;