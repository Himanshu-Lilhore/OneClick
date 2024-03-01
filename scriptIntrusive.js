let desiredOptions = [
    'other acceptable',
    'other unearned',
    'us passport',
    'in this home',
    'unknown',
    'yes',
    'no',
    'pass'
]

let colors = [
    "#2196f3", // blue
    "#EF6C00", // orange
    "#4caf50", // green
    "#ab47bc", // magenta
    "#FFEB3B", // yellow
]

const dropdowns = document.querySelectorAll('select');
const radios = document.querySelectorAll('input[type="radio"]');

let count = 0;
let binaryCountDropdown = 0;
let binaryCountRadio = 0;

const outerHolder = document.createElement("div");
const holder = document.createElement("div");
const yesNoDiv = document.createElement("div");

outerHolder.style.borderRadius = "0.375rem";
outerHolder.style.userSelect = "none";
outerHolder.style.overflow = "hidden";
outerHolder.style.minWidth = "15rem";
outerHolder.style.border = "0.2px solid black";
outerHolder.style.position = "absolute";
outerHolder.style.bottom = '0';
outerHolder.style.right = "0";
// outerHolder.style.transform = "translateY(-50%)";
outerHolder.style.zIndex = "9999";
outerHolder.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
outerHolder.style.backdropFilter = "blur(12px)";

holder.style.padding = "3px 3px 3px 16px";

yesNoDiv.style.display = "flex";

const auto = document.createElement("button");
const yesToAll = document.createElement("button");
const noToAll = document.createElement("button");

auto.style.borderWidth = "3px";
auto.style.display = "block";
auto.style.margin = "8px 0px";
auto.style.fontWeight = "bold";
auto.style.padding = "8px 5px";
auto.style.fontSize = "16px";

yesToAll.style.backgroundColor = "green";
yesToAll.style.borderWidth = "3px";
yesToAll.style.display = "block";
yesToAll.style.margin = "8px 5px 8px 0";
yesToAll.style.fontWeight = "bold";
yesToAll.style.padding = "8px 5px";
yesToAll.style.fontSize = "16px";

noToAll.style.backgroundColor = "red";
noToAll.style.borderWidth = "3px";
noToAll.style.display = "block";
noToAll.style.margin = "8px 0px";
noToAll.style.fontWeight = "bold";
noToAll.style.padding = "8px 5px";
noToAll.style.fontSize = "16px";

yesToAll.textContent = 'YES to all';
noToAll.textContent = 'NO to all';
auto.textContent = 'AUTO';

auto.addEventListener('click', () => {
    auto.style.backgroundColor = "rgb(47 192 47 / 95%)";
});

auto.addEventListener('click', () => {
    auto.style.opacity = '50%';
});

const controls = document.createElement("div");
controls.style.width = "100%";

holder.appendChild(auto);
holder.appendChild(yesNoDiv);


// CONTROLS :
const controlsHolder = document.createElement("div");
controlsHolder.style.display = 'flex';
controlsHolder.style.justifyContent = 'space-between';

const dragDiv = document.createElement("div");
dragDiv.style.maxHeight = "6rem";
dragDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style='width: 3rem; height: 3rem;' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
</svg>`;

const closeDiv = document.createElement("div");
closeDiv.style.marginTop = "4px";
closeDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style='width: 3rem; height: 3rem;' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>`;
closeDiv.addEventListener('click', () => { outerHolder.style.display = 'none'; });

const separator = document.createElement("div");
separator.style.width = "100%";
separator.style.border = "1.5px solid black";

controlsHolder.appendChild(dragDiv);
controlsHolder.appendChild(closeDiv);
controls.appendChild(controlsHolder);
controls.appendChild(separator);

// MAKING HOLDER DRAGGABLE :
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
        const newX = e.clientX - initialX;
        const newY = e.clientY - initialY;
        offsetX = newX;
        offsetY = newY;
        outerHolder.style.transform = `translate(${newX}px, ${newY}px)`;
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
    outerHolder.style.bottom = '';
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const holderHeight = outerHolder.offsetHeight;
    let topPosition = scrollY + windowHeight - holderHeight
    outerHolder.style.top = `${topPosition}px`;
}

// Update holder position when the page is scrolled
window.addEventListener('scroll', updateHolderPosition);


function selDropdownVal(dropdown, val) {
    dropdown.value = val;
    dropdown.style.borderStyle = "dashed";
}

function selRadioVal(radio) {
    radio.checked = true;
    radio.style.borderStyle = "dashed";
}

let currColorIndex = -1;
function getNextColor() {
    currColorIndex++;
    if (currColorIndex >= colors.length) currColorIndex = 0;
    return colors[currColorIndex];
}

dropdowns.forEach(function(dropdown, index) {
    if (
        dropdown.value.trim().toLowerCase() !== "" ||
        dropdown.attributes.type === 'hidden' ||
        window.getComputedStyle(dropdown).display === 'none' ||
        dropdown.disabled ||
        dropdown.hasAttribute('disabled') ||
        dropdown.style.display === 'none' ||
        dropdown.closest('[disabled]') !== null || //
        dropdown.offsetWidth === 0 || dropdown.offsetHeight === 0  //
    ) return;

    var options = dropdown.options;

    for (var i = 0; i < options.length; i++) {
        if (desiredOptions.includes(options[i].textContent.trim().toLowerCase())) {
            let val = options[i].value;
            let optionText = options[i].textContent.trim().toLowerCase();
            let iniBorder = dropdown.style.border;
            closeDiv.addEventListener('click', () => { dropdown.style.border = iniBorder; });
            let yesNoBorWidth = '5px';
            if (optionText === 'yes') {
                let yesColor = '#0e9808';
                dropdown.style.borderLeftColor = yesColor;
                dropdown.style.borderLeftWidth = yesNoBorWidth;
                yesToAll.addEventListener('click', () => { selDropdownVal(dropdown, val); });
                yesToAll.addEventListener('click', () => {
                    dropdown.style.borderLeftColor = yesColor;
                    dropdown.style.borderRightColor = yesColor;
                });
                binaryCountDropdown++;
                continue;
            } else if (optionText === 'no') {
                let noColor = 'red';
                dropdown.style.borderRightColor = noColor;
                dropdown.style.borderRightWidth = yesNoBorWidth;
                noToAll.addEventListener('click', () => { selDropdownVal(dropdown, val); });
                noToAll.addEventListener('click', () => {
                    dropdown.style.borderLeftColor = noColor;
                    dropdown.style.borderRightColor = noColor;
                });
                continue;
            }

            let currColor = getNextColor();

            // MANUAL : 
            // auto select all with button :
            auto.addEventListener('click', () => { selDropdownVal(dropdown, val); });

            // Give buttons for selection :
            let divtemp = document.createElement("div");
            let btemp = document.createElement("button");
            btemp.textContent = (index + 1) + ". " + optionText;
            divtemp.style.overflow = "hidden";
            divtemp.style.borderRadius = "9999px";
            divtemp.style.padding = "0 0 0 10px";
            divtemp.style.border = "2px solid black";
            divtemp.style.display = "block";
            divtemp.style.width = "fit-content";
            btemp.style.borderRadius = "9999px";
            btemp.style.padding = "2px 5px";
            btemp.style.border = "1px solid black";
            btemp.addEventListener('click', () => { selDropdownVal(dropdown, val); });
            btemp.addEventListener('click', () => { divtemp.style.padding = "0 10px 0 0"; });
            btemp.addEventListener('click', () => { divtemp.style.opacity = '50%'; });
            divtemp.style.backgroundColor = currColor;
            divtemp.appendChild(btemp);


            // Calculate position and size of dropdown
            let rect = dropdown.getBoundingClientRect();
            let dropdownLeft = rect.left + window.pageXOffset;
            let dropdownTop = rect.top + window.pageYOffset;
            let dropdownWidth = rect.width;

            // Create button element
            let button = document.createElement("div");
            // button.textContent = optionText;
            button.style.position = "absolute";
            button.style.left = dropdownLeft + dropdownWidth + 10 + "px"; // Position button to the right of the dropdown with additional margin
            button.style.top = dropdownTop + "px"; // Align button with the top of the dropdown
            button.style.marginLeft = "10px"; // Adjust spacing as needed

            button.appendChild(divtemp);

            // Append button to document body
            document.body.appendChild(button);

            closeDiv.addEventListener('click', () => { button.style.display = 'none'; });

            count++;
            break;
        }
    }
});


radios.forEach(function(radio, index) {
    if (
        radio.attributes.type === 'hidden' ||
        window.getComputedStyle(radio).display === 'none' ||
        radio.disabled ||
        radio.hasAttribute('disabled') ||
        radio.style.display === 'none'
    ) return;

    var radioVal = radio.value;

    let iniBorder = radio.style.border;
    closeDiv.addEventListener('click', () => { radio.style.border = iniBorder; });
    let yesNoBorWidth = '5px';

    if (radioVal === 'Y') {
        let yesColor = '#0e9808';
        radio.style.borderLeftColor = yesColor;
        radio.style.borderLeftWidth = yesNoBorWidth;
        yesToAll.addEventListener('click', () => { selRadioVal(radio); });
        yesToAll.addEventListener('click', () => {
            radio.style.borderLeftColor = yesColor;
            radio.style.borderRightColor = yesColor;
        });
        binaryCountRadio++;
    } else if (radioVal === 'N') {
        let noColor = 'red';
        radio.style.borderRightColor = noColor;
        radio.style.borderRightWidth = yesNoBorWidth;
        noToAll.addEventListener('click', () => { selRadioVal(radio); });
        noToAll.addEventListener('click', () => {
            radio.style.borderLeftColor = noColor;
            radio.style.borderRightColor = noColor;
        });
        binaryCountRadio++;
    }
});

outerHolder.appendChild(controls);
if (binaryCountDropdown > 0 || binaryCountRadio > 0) {
    let bcp = document.createElement("p");
    bcp.innerHTML = ` [${binaryCountDropdown + binaryCountRadio}]`;
    bcp.style.margin = '8px 5px 8px 0';
    bcp.style.fontWeight = 'bold';
    bcp.style.padding = '8px 5px';
    yesNoDiv.appendChild(yesToAll);
    yesNoDiv.appendChild(noToAll);
    yesNoDiv.appendChild(bcp);
}
outerHolder.appendChild(holder);

if (count > 0 || binaryCountDropdown > 0 || binaryCountRadio > 0)
    document.body.appendChild(outerHolder);

// Send message to the background script with the count
chrome.runtime.sendMessage({ count: count });
