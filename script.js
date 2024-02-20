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
// holder.style = "min-width: 15rem; padding: 3px 3px 3px 16px; border-width: 1px; position: absolute; top: 50%; right: 0; transform: translateY(-50%); z-index: 9999; background-color: rgba(0, 0, 0, 0.3); backdrop-filter: blur(15px); box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.3);"
holder.style = "min-width: 15rem; padding: 3px 3px 3px 16px; border: 0.2px solid black; position: absolute; top: 50%; right: 0; transform: translateY(-50%); z-index: 9999; background-color: rgba(0, 0, 0, 0.3); backdrop-filter: blur(15px);"
let auto =  document.createElement("BUTTON")
auto.style = "border-width: 3px; display: block; margin: 8px 0px; font-weight: bold; padding: 8px 5px; font-size: 16px;"
auto.textContent = 'AUTO'
auto.addEventListener('click', ()=>{auto.style.backgroundColor = "rgb(47 192 47 / 95%)";})
holder.appendChild(auto)


// MAKING HOLDER DRAGABLE : 
    // Flag to track whether dragging is active
    let isDragging = false;
    // Variables to store initial mouse position and holder position
    let initialX;
    let initialY;
    let offsetX = 0;
    let offsetY = 0;
    // Function to handle mouse down event
    function handleMouseDown(e) {
        isDragging = true;
        initialX = e.clientX - offsetX;
        initialY = e.clientY - offsetY;
    }
    // Function to handle mouse move event
    function handleMouseMove(e) {
        if (isDragging) {
            let newX = e.clientX - initialX;
            let newY = e.clientY - initialY;
            offsetX = newX;
            offsetY = newY;
            holder.style.transform = `translate(${newX}px, ${newY}px)`;
        }
    }
    // Function to handle mouse up event
    function handleMouseUp() {
        isDragging = false;
    }
    // Add event listeners for mouse down, move, and up events
    holder.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);


// Function to update the position of the holder element
function updateHolderPosition() {
    let scrollY = window.scrollY
    let windowHeight = window.innerHeight;
    // let holderHeight = holder.offsetHeight;
    let topPosition = windowHeight/2 + scrollY;
    
    holder.style.top = topPosition + 'px';
}

// Update holder position when the page is scrolled
window.addEventListener('scroll', updateHolderPosition);

// Set initial position of the holder element
updateHolderPosition();


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
            let val = options[i].value
            let optionText = options[i].textContent.trim().toLowerCase()
            let currColor = getNextColor()
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
                btemp.textContent = (index+1) + ". " + optionText;
                divtemp.style = "padding-left : 15px; border-width: 1px; display: block; margin: 15px 0px; width: fit-content;"
                btemp.style = "padding: 8px 5px; border-width: 1px; font-size: 16px;"
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

if(count > 0)
    document.body.appendChild(holder);

// Send message to the background script with the count
chrome.runtime.sendMessage({ count: count });
