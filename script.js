var layerIndex = 10;

function openMyWindow(winElement) {
    winElement.style.display = "flex";
    layerIndex++;
    winElement.style.zIndex = layerIndex;
}

function closeMyWindow(winElement) {
    winElement.style.display = "none";
}

document.querySelector("#welcomeopen").addEventListener("click", function() {
    openMyWindow(document.querySelector("#welcome"));
});

document.querySelector("#notesappicon").addEventListener("click", function() {
    openMyWindow(document.querySelector("#notes"));
});

document.querySelector("#loreappicon").addEventListener("click", function() {
    openMyWindow(document.querySelector("#lore"));
});

document.querySelector("#audioappicon").addEventListener("click", function() {
    openMyWindow(document.querySelector("#audioWindow"));
});

document.querySelector("#terminalAppIcon").addEventListener("click", function() {
    openMyWindow(document.querySelector("#terminalWindow"));
});

document.querySelector("#welcomeclose").addEventListener("click", function() {
    closeMyWindow(document.querySelector("#welcome"));
});
document.querySelector("#notesclose").addEventListener("click", function() {
    closeMyWindow(document.querySelector("#notes"));
});
document.querySelector("#loreclose").addEventListener("click", function() {
    closeMyWindow(document.querySelector("#lore"));
});
document.querySelector("#audioclose").addEventListener("click", function() {
    closeMyWindow(document.querySelector("#audioWindow"));
});
document.querySelector("#terminalclose").addEventListener("click", function() {
    closeMyWindow(document.querySelector("#terminalWindow"));
});

var myQuotes = [
    "\"People cannot show each other their true feelings.\"",
    "\"Wake up to reality! Nothing ever goes as planned.\"",
    "\"The moment people come to know love, they run the risk of carrying hate.\""
];
var quoteNum = 0;

document.querySelector("#nextQuoteBtn").addEventListener("click", function() {
    quoteNum = (quoteNum + 1) % myQuotes.length;
    document.querySelector("#quoteDisplay").innerHTML = myQuotes[quoteNum];
});

var myNotes = [
    { title: "The Reality", text: "<p>Pain, suffering, and futility are all that exist.</p>" },
    { title: "Infinite Dream", text: "<p>A world where everyone's desires come true.</p>" }
];

var sidebarBox = document.querySelector("#sidebar");
var notesArea = document.querySelector("#notesContentDisplay");

for (let i = 0; i < myNotes.length; i++) {
    let itemDiv = document.createElement("div");
    itemDiv.innerHTML = "<b>" + myNotes[i].title + "</b>";
    itemDiv.addEventListener("click", function() {
        notesArea.innerHTML = myNotes[i].text;
    });
    sidebarBox.appendChild(itemDiv);
}
notesArea.innerHTML = myNotes[0].text;

function showLiveTime() {
    var currentTimeString = new Date().toLocaleTimeString();
    document.querySelector("#timeElement").innerHTML = currentTimeString;
}
setInterval(showLiveTime, 1000);

var isNormalVibe = true;
document.querySelector("#themeToggleBtn").addEventListener("click", function() {
    isNormalVibe = !isNormalVibe;
    if (isNormalVibe) {
        document.body.style.filter = "none";
        this.innerHTML = " Change Vibe";
    } else {
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        this.innerHTML = " Inverted Mode";
    }
});

var wallIndex = 0;
var wallColors = [
    "url('obito-bg.jpg') center/cover no-repeat",
    "radial-gradient(circle, #1a0000 0%, #000000 100%)",
    "radial-gradient(circle, #0a0a1a 0%, #000000 100%)"
];
var wallNames = ["Red", "Dark Void", "Midnight"];

document.querySelector("#wallpaperBtn").addEventListener("click", function() {
    wallIndex = (wallIndex + 1) % wallColors.length;
    document.body.style.background = wallColors[wallIndex];
    this.innerHTML = "Wallpaper: " + wallNames[wallIndex];
});


let termInput = document.querySelector("#termInput");
let termOutput = document.querySelector("#termOutput");

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
            termOutput.innerHTML += `Built by a 17-year-old grinding for that AULA F75 keyboard.<br>`;
        } else {
            termOutput.innerHTML += `Unknown: ${val}. Type 'help'.<br>`;
        }
        
        termInput.value = "";
        termOutput.scrollTop = termOutput.scrollHeight;
    }
});


document.querySelector("#stickyAppIcon").addEventListener("click", function() {
    let container = document.querySelector("#stickyContainer");
    
    let noteDiv = document.createElement("div");
    noteDiv.className = "sticky-note";
    noteDiv.style.position = "absolute";
    noteDiv.style.left = "120px";
    noteDiv.style.top = "160px";
    noteDiv.style.background = "#ffcc00";
    noteDiv.style.color = "#000";
    noteDiv.style.padding = "10px";
    noteDiv.style.borderRadius = "8px";
    noteDiv.style.width = "200px";
    noteDiv.style.height = "150px";
    noteDiv.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";
    
    layerIndex++;
    noteDiv.style.zIndex = layerIndex;
    
    let noteTitle = document.createElement("b");
    noteTitle.innerText = "Sticky Note:";
    noteTitle.style.cursor = "grab";
    
    let noteInput = document.createElement("textarea");
    noteInput.placeholder = "Type your note here...";
    noteInput.style.width = "100%";
    noteInput.style.height = "80%";
    noteInput.style.background = "transparent";
    noteInput.style.border = "none";
    noteInput.style.resize = "none";
    noteInput.style.outline = "none";
    noteInput.style.fontFamily = "inherit";
    noteInput.style.color = "#000";
    
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.style.float = "right";
    deleteBtn.style.background = "red";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";
    
    deleteBtn.addEventListener("click", function() {
        container.removeChild(noteDiv);
    });

  
    let draggingSticky = false;
    let sX = 0;
    let sY = 0;

    noteDiv.addEventListener("mousedown", function(e) {
        if (e.target === noteInput) return;
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

    document.addEventListener("mouseup", function() {
        draggingSticky = false;
    });
    
    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(noteTitle);
    noteDiv.appendChild(document.createElement("br"));
    noteDiv.appendChild(noteInput);
    container.appendChild(noteDiv);
});

document.querySelectorAll(".min-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        let win = this.closest(".window");
        let content = win.querySelector(".window-content");
        if (content.style.display === "none") {
            content.style.display = "flex";
            if(win.id === "notes") content.style.display = "flex";
        } else {
            content.style.display = "none";
        }
    });
});

let activeWindow = null;
let startX = 0;
let startY = 0;

document.querySelectorAll(".window").forEach(win => {
    let header = win.querySelector(".windowheader");
    if (header) {
        header.addEventListener("mousedown", (e) => {
            if (e.target.classList.contains("min-btn") || e.target.classList.contains("closebutton")) return;
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
    let newX = e.clientX - startX;
    let newY = e.clientY - startY;
    
    activeWindow.style.left = newX + "px";
    activeWindow.style.top = newY + "px";
    activeWindow.style.transform = "none"; 
});

document.addEventListener("mouseup", () => {
    activeWindow = null;
});