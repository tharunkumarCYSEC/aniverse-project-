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

// sticky notes app - made them movable so reviewers stop complaining
document.querySelector("#stickyAppIcon").addEventListener("click", function() {
    let container = document.querySelector("#stickyContainer");
    
    let noteDiv = document.createElement("div");
    noteDiv.className = "sticky-note";
    noteDiv.style.position = "absolute";
    noteDiv.style.left = "120px";
    noteDiv.style.top = "160px";
    noteDiv.style.background = "#222";
    noteDiv.style.border = "1px solid #ff3333";
    noteDiv.style.padding = "10px";
    noteDiv.style.borderRadius = "6px";
    
    layerIndex++;
    noteDiv.style.zIndex = layerIndex;
    
    let noteTitle = document.createElement("b");
    noteTitle.innerText = "Sticky Note:";
    noteTitle.style.color = "#fff";
    noteTitle.style.cursor = "grab";
    
    let noteInput = document.createElement("textarea");
    noteInput.placeholder = "Type your note here...";
    noteInput.style.background = "#111";
    noteInput.style.color = "#fff";
    noteInput.style.border = "none";
    noteInput.style.marginTop = "5px";
    
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

    // drag logic for sticky notes
    let draggingSticky = false;
    let sX = 0;
    let sY = 0;

    noteDiv.addEventListener("mousedown", function(e) {
        if (e.target === noteInput) return; // let them type normally
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

// make windows draggable
let activeWindow = null;
let startX = 0;
let startY = 0;

document.querySelectorAll(".window").forEach(win => {
    let header = win.querySelector(".windowheader");
    if (header) {
        header.addEventListener("mousedown", (e) => {
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