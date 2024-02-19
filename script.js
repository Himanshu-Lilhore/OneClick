// Content script (script.js) to interact with the currently open page
let desiredOptions = [
    'other acceptable',
    'other unearned',
    'us passport',
    'in this home',
    'unknown'
]

var dropdowns = document.querySelectorAll('select');
var count = 0;
let holder = document.createElement("DIV");
holder.style = "padding: 3px; border-width: 1px; position: absolute; top: 0; right: 0; z-index: 9999;"


function selOA(dropdown, val){
    dropdown.value = val;
}

dropdowns.forEach(function(dropdown, index) {
    if(dropdown.attributes.type === 'hidden' || 
    window.getComputedStyle(dropdown).display === 'none' || 
    dropdown.disabled || 
    dropdown.hasAttribute('disabled')) return
    
    var options = dropdown.options;
    
    for (var i = 0; i < options.length; i++) {
        if (desiredOptions.includes(options[i].textContent.trim().toLowerCase())) {
            let val = options[i].value;

            // auto select all :
                // dropdown.value = val;

            // Give buttons for selection :
                let btemp = document.createElement("BUTTON");
                btemp.textContent = "sel-"+index;
                btemp.style = "padding : 3px; border-width: 1px;"
                    // btemp.style = "padding: 3px; border-width: 1px; position: absolute; top: 0; right: 0; z-index: 9999;"
                btemp.addEventListener('click', () => {selOA(dropdown, val)});
                holder.appendChild(btemp);
                    // document.body.appendChild(btemp, );
                
            count++;
            break;
        }
    }
});

document.body.appendChild(holder);

// Send message to the background script with the count
chrome.runtime.sendMessage({ count: count });
