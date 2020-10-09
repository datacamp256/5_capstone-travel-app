//public functions here

function setCountdown(newText) {
    document.getElementById('countdown').innerText = newText;
}

function displayError(error){
    const errorLabel = document.getElementById('error-label');
    errorLabel.innerText=error;
    errorLabel.style.display = 'block';
    console.log(error);
}

function hideError(){
    document.getElementById('error-label').style.display = 'none';
    console.log('hide error');
}

// private functions here

// exports
module.exports.dom_setCountdown = setCountdown;
module.exports.dom_displayError = displayError;
module.exports.dom_hideError = hideError;