var layerIndex = 10;

function openMyWindow(winElement) {
    winElement.style.display = "flex";
    layerIndex++;
    winElement.style.zIndex = layerIndex;
}

function closeMyWindow(winElement) {
    winElement.style.display = "none";
}

// Window Open Event Listeners
document.querySelector("#welcome_open").addEventListener("click", () => openMyWindow(document.querySelector("#welcome")));
document.querySelector("#notes_app_icon").addEventListener("click", () => openMyWindow(document.querySelector("#notes")));
document.querySelector("#lore_app_icon").addEventListener("click", () => openMyWindow(document.querySelector("#lore")));
document.querySelector("#audio_app_icon").addEventListener("click", () => openMyWindow(document.querySelector("#audio_window")));
document.querySelector("#terminal_app_icon").addEventListener("click", () => openMyWindow(document.querySelector("#terminal_window")));

// Window Close Event Listeners
document.querySelector("#welcome_close").addEventListener("click", () => closeMyWindow(document.querySelector("#welcome")));
document.querySelector("#notes_close").addEventListener("click", () => closeMyWindow(document.querySelector("#notes")));
document.querySelector("#lore_close").addEventListener("click", () => closeMyWindow(document.querySelector("#lore")));
document.querySelector("#audio_close").addEventListener("click", () => closeMyWindow(document.querySelector("#audio_window")));
document.querySelector("#terminal_close").addEventListener("click", () => closeMyWindow(document.querySelector("#terminal_window")));

// Quotes Rotation
var myQuotes = [
    "\"People cannot show each other their true feelings.\"",
    "\"Wake up to reality! Nothing ever goes as planned.\"",
    "\"The moment people come to know love, they run the risk of carrying hate.\""
];
var quoteNum = 0;

document.querySelector("#next_quote_btn").addEventListener("click", function() {
    quoteNum = (quoteNum + 1) % myQuotes.length;
    document.querySelector("#quote_display").innerHTML = myQuotes[quoteNum];
});

// Notes Sidebar Population
var myNotes = [
    { title: "The Reality", text: "<p>Pain, suffering, and futility are all that exist.</p>" },
    { title: "Infinite Dream", text: "<p>A world where everyone's desires come true.</p>" }
];

var sidebarBox = document.querySelector("#sidebar");
var notesArea = document.querySelector("#notes_content_display");

for (let i = 0; i < myNotes.length; i++) {
    let itemDiv = document.createElement("div");
    itemDiv.innerHTML = "<b>" + myNotes[i].title + "</b>";
    itemDiv.addEventListener("click", () => notesArea.innerHTML = myNotes[i].text);
    sidebarBox.appendChild(itemDiv);
}
notesArea.innerHTML = myNotes[0].text;

// Live Clock
function showLiveTime() {
    document.querySelector("#time_element").innerHTML = new Date().toLocaleTimeString();
}
setInterval(showLiveTime, 1000);

// Vibe / Theme Toggler
var isNormalVibe = true;
document.querySelector("#theme_toggle_btn").addEventListener("click", function() {
    isNormalVibe = !isNormalVibe;
    if (isNormalVibe) {
        document.body.style.filter = "none";
        this.innerHTML = "Change VIBE";
    } else {
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        this.innerHTML = "Inverted Mode";
    }
});

// Wallpaper Cycler
var wallIndex = 0;
var wallColors = [
    "url('obito-bg.jpg') center/cover no-repeat",
    "radial-gradient(circle, #1a0000 0%, #000000 100%)",
    "radial-gradient(circle, #0a0a1a 0%, #000000 100%)"
];
var wallNames = ["Red", "Dark Void", "Midnight"];

document.querySelector("#wallpaper_btn").addEventListener("click", function() {
    wallIndex = (wallIndex + 1) % wallColors.length;
    document.body.style.background = wallColors[wallIndex];
    this.innerHTML = "Wallpaper: " + wallNames[wallIndex];
});

// Terminal Engine
let termInput = document.querySelector("#term_input");
let termOutput = document.querySelector("#term_output");

termInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        let val = termInput.value.trim().toLowerCase();
        termOutput.innerHTML += `> ${termInput.value}<br>`;
        
        if (val === "help") {
            termOutput.innerHTML += `commands: help, clear, lore, creator<br>`;
        } else if (val === "clear") {
            termOutput.innerHTML = `Cleared.<br>`;
        } else if (val === "lore") {
            termOutput.innerHTML += `Obito Uchiha wanted to create an infinite dream.<br>`;
        } else if (val === "creator") {
            termOutput.innerHTML += `Built by a developer grinding for that AULA F75 keyboard.<br>`;
        } else {
            termOutput.innerHTML += `Unknown: ${val}. Type 'help'.<br>`;
        }
        
        termInput.value = "";
        termOutput.scrollTop = termOutput.scrollHeight;
    }
});

// Dynamic Sticky Note Creator
document.querySelector("#sticky_app_icon").addEventListener("click", function() {
    let container = document.querySelector("#sticky_container");
    
    let noteDiv = document.createElement("div");
    noteDiv.className = "sticky_note";
    
    layerIndex++;
    noteDiv.style.zIndex = layerIndex;
    
    let noteTitle = document.createElement("b");
    noteTitle.innerText = "Sticky Note:";
    
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.style.float = "right";
    deleteBtn.style.background = "none";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => container.removeChild(noteDiv));
    
    let noteInput = document.createElement("textarea");
    noteInput.placeholder = "Type your note here...";
    
    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(noteTitle);
    noteDiv.appendChild(document.createElement("br"));
    noteDiv.appendChild(noteInput);
    container.appendChild(noteDiv);

    // Draggable Sticky Note Logic
    let draggingSticky = false;
    let sX = 0, sY = 0;

    noteDiv.addEventListener("mousedown", function(e) {
        if (e.target === noteInput || e.target === deleteBtn) return;
        draggingSticky = true;
        sX = e.clientX - noteDiv.offsetLeft;
        sY = e.clientY - noteDiv.offsetTop;
        layerIndex++;
        noteDiv.style.zIndex = layerIndex;
    });

    document.addEventListener("mousemove", function(e) {
        if (!draggingSticky) return;
        noteDiv.style.left = (e.clientX - sX) + "px";
        noteDiv.style.top = (e.clientY - sY) + "px";
    });

    document.addEventListener("mouseup", () => draggingSticky = false);
});

// Universal Window Dragging Logic via standard dragzones
let activeWindow = null;
let startX = 0, startY = 0;

document.querySelectorAll(".app_window").forEach(win => {
    let dragzone = win.querySelector(".dragzone");
    if (dragzone) {
        dragzone.addEventListener("mousedown", (e) => {
            if (e.target.classList.contains("close_btn")) return;
            activeWindow = win;
            startX = e.clientX - win.offsetLeft;
            startY = e.clientY - win.offsetTop;
            
            layerIndex++;
            win.style.zIndex = layerIndex;
        });
    }
});

document.addEventListener("mousemove", (e) => {
    if (!activeWindow) return;
    activeWindow.style.left = (e.clientX - startX) + "px";
    activeWindow.style.top = (e.clientY - startY) + "px";
    activeWindow.style.transform = "none";
});

document.addEventListener("mouseup", () => activeWindow = null);