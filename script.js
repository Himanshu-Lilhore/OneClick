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
let outerHolder = document.createElement("DIV");
let holder = document.createElement("DIV");
outerHolder.style = "user-select: none; overflow: hidden; min-width: 15rem; border: 0.2px solid black; position: absolute; top: 50%; right: 0; transform: translateY(-50%); z-index: 9999; background-color: rgba(0, 0, 0, 0.3); backdrop-filter: blur(15px);"
// holder.style = "min-width: 15rem; padding: 3px 3px 3px 16px; border-width: 1px; position: absolute; top: 50%; right: 0; transform: translateY(-50%); z-index: 9999; background-color: rgba(0, 0, 0, 0.3); backdrop-filter: blur(15px); box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.3);"
holder.style = "padding: 3px 3px 3px 16px;"
let auto =  document.createElement("BUTTON")
auto.style = "border-width: 3px; display: block; margin: 8px 0px; font-weight: bold; padding: 8px 5px; font-size: 16px;"
auto.textContent = 'AUTO'
auto.addEventListener('click', ()=>{auto.style.backgroundColor = "rgb(47 192 47 / 95%)";})
let controls = document.createElement("DIV");
controls.style = "width: 100%;"
holder.appendChild(auto)

// CONTROLS :
let controlsHolder =  document.createElement("DIV")
controlsHolder.style = 'display:flex; '
let dragDiv =  document.createElement("DIV")
dragDiv.style = "max-height : 6rem;"
dragDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 141 25" fill="#000000" x="0px" y="0px"><path d="M0 0h24v24H0V0z" fill="none"></path>
<path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
</svg>`
let closeDiv =  document.createElement("DIV")
closeDiv.style = "padding-top: 4px;"
closeDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style='width: 3rem; height: 3rem;' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
`
closeDiv.addEventListener('click', ()=>{outerHolder.classList.add('hidden')})
let seperator = document.createElement("DIV")
seperator.style = "width: 100%; border: 1.5px solid black;"
controlsHolder.appendChild(dragDiv)
controlsHolder.appendChild(closeDiv)
controls.appendChild(controlsHolder)
controls.appendChild(seperator)

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
        outerHolder.style.transform = `translate(${newX}px, ${newY - outerHolder.offsetHeight/2}px)`;
    }
}
// Function to handle mouse up event
function handleMouseUp() {
    isDragging = false;
}
// Add event listeners for mouse down, move, and up events
controls.addEventListener('mousedown', handleMouseDown);
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

outerHolder.appendChild(controls)
outerHolder.appendChild(holder)

if(count > 0)
    document.body.appendChild(outerHolder);

// Send message to the background script with the count
chrome.runtime.sendMessage({ count: count });
