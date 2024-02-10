// Content script (script.js) to interact with the currently open page
var dropdowns = document.querySelectorAll('select');
var count = 0;

function selOA(dropdown, val){
    dropdown.value = val;
}

dropdowns.forEach(function(dropdown, index) {
    var options = dropdown.options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].textContent.trim() === 'Other acceptable') {
            let btemp = document.createElement("BUTTON");
            btemp.textContent = "OA"+index;
            btemp.style = "padding : 3px; border-width: 1px;"
            let val = options[i].value;
            btemp.addEventListener('click', () => {selOA(dropdown, val)});
            document.body.appendChild(btemp);
            // dropdown.value = options[i].value;
            count++;
            break;
        }
    }
});

// Send message to the background script with the count
chrome.runtime.sendMessage({ count: count });
