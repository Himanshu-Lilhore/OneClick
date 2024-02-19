// Content script (script.js) to interact with the currently open page
let desiredOptions = [
    'other acceptable',
    'other unearned',
    'us passport',
    'in this home',
    'unknown'
]

let colors = [
    "#2196f3", // blue
    "#EF6C00", // orange
    "#4caf50", // green
    "#ab47bc", // magenta
    "#FFEB3B", // yellow
]

var dropdowns = document.querySelectorAll('select');
var count = 0;
let holder = document.createElement("DIV");
holder.style = "min-width: 16rem; padding: 3px; border-width: 1px; position: sticky; top: 0; right: 0; z-index: 9999;"
let auto =  document.createElement("BUTTON")
auto.style = "padding : 1px; border-width: 3px; display: block; margin: 8px 0px; font-weight: bold;"
auto.textContent = 'AUTO'
auto.addEventListener('click', ()=>{auto.style.backgroundColor = "rgb(47 192 47 / 95%)";})
holder.appendChild(auto)

function selOA(dropdown, val){
    dropdown.value = val;
    dropdown.style.borderStyle = "dashed"
}

let currColorIndex = -1
function getNextColor(){
    currColorIndex++
    if(currColorIndex >= colors.length) currColorIndex = 0
    return colors[currColorIndex]
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
            let currColor = getNextColor();
            dropdown.style.borderWidth = "2px"

            // // FULL AUTO : 
            // // auto select all without button :
            //     selOA(dropdown, val)
            //     dropdown.style.borderColor = "#4caf50"
            
            // MANUAL : 
            // auto select all with button :
                auto.addEventListener('click', () => {selOA(dropdown, val)});

            // Give buttons for selection :
                let divtemp = document.createElement("DIV")
                let btemp = document.createElement("BUTTON");
                btemp.textContent = (index+1) + ". " + val;
                divtemp.style = "padding-left : 15px; border-width: 1px; display: block; margin: 15px 0px; width: fit-content;"
                btemp.style = "padding: 5px 0px; border-width: 1px;"
                btemp.addEventListener('click', () => {selOA(dropdown, val)});
                btemp.addEventListener('click', () => {divtemp.style.paddingLeft = "2px"});
                divtemp.style.backgroundColor = currColor
                dropdown.style.borderColor = currColor
                divtemp.appendChild(btemp)
                holder.appendChild(divtemp)
                
            count++;
            break;
        }
    }
});

document.body.appendChild(holder);

// Send message to the background script with the count
chrome.runtime.sendMessage({ count: count });
