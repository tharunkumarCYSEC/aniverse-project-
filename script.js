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

document.querySelector("#stickyAppIcon").addEventListener("click", function() {
    let container = document.querySelector("#stickyContainer");
    
    let noteDiv = document.createElement("div");
    noteDiv.className = "sticky-note";
    
    let noteTitle = document.createElement("b");
    noteTitle.innerText = "Sticky Note:";
    
    let noteInput = document.createElement("textarea");
    noteInput.placeholder = "Type your note here...";
    
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
    
    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(noteTitle);
    noteDiv.appendChild(noteInput);
    container.appendChild(noteDiv);
});