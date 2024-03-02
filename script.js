const overall_multiplier = .5;

const width_percent = 0.75 * overall_multiplier;
var qr_size = innerWidth * width_percent;

window.onload = function() {
    doTag();
}

async function doTag() {
    var tag = await getText("Enter tag name");
    var url = `https://www.home-assistant.io/tag/${tag}`;
    var qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=${qr_size}x${qr_size}&data=${encodeURIComponent(url)}`;
    qrdisplay.width = qrdisplay.height = main.style.width = qr_size;
    qrdisplay.src = qrURL;
    var displayName = await getText("Enter display name", tag);
    nameDisplaySpan.innerText = displayName;
    const fontMultiplier = .2;
    nameDisplaySpan.style.fontSize = qr_size * fontMultiplier;
}

function getText(question="", defaultValue="") {

    display.hide();
    textInputDiv.show();
    textInput.focus();
    textPrompt.innerText = question;
    textInput.value = "";
    if (defaultValue != "") {
        textInput.value = defaultValue;
        textInput.select();
    }
    return new Promise(function(resolve) {
        submitBtn.onclick = function() {
            resolve(textInput.value);
        }
    });
}

HTMLElement.prototype.hide = function() {
    this.setAttribute("hidden", true);
}

HTMLElement.prototype.show = function() {
    this.removeAttribute("hidden");
}