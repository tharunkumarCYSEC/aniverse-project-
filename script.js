// obito os script
// tried to keep it simple lol

var z = 10; // z-index counter so the newest window stays on top

function openWin(name) {
  var w = document.getElementById(name);
  w.style.display = "block";
  z = z + 1;
  w.style.zIndex = z;
}

function closeWin(name) {
  document.getElementById(name).style.display = "none";
}

// dragging - got this from w3schools and changed it a bit
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var header = document.getElementById(elmnt.id + "header");
  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    z++;
    elmnt.style.zIndex = z;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("logs"));
dragElement(document.getElementById("lore"));
dragElement(document.getElementById("music"));
dragElement(document.getElementById("term"));

// ---------- clock ----------
function updateClock() {
  var d = new Date();
  document.getElementById("clock").innerHTML = d.toLocaleTimeString();
}
updateClock();
setInterval(updateClock, 1000);

// ---------- quotes ----------
var quotes = [
  '"People cannot show each other their true feelings."',
  '"Wake up to reality! Nothing ever goes as planned."',
  '"The moment people come to know love, they run the risk of carrying hate."',
  '"Those who break the rules are scum, but those who abandon their friends are worse than scum."'
];
var q = 0;

function nextQuote() {
  q++;
  if (q >= quotes.length) {
    q = 0;
  }
  document.getElementById("quote").innerHTML = quotes[q];
}

// ---------- logs ----------
var notes = [
  ["The Reality", "Pain, suffering, and futility are all that exist."],
  ["Infinite Dream", "A world where everyones desires come true."],
  ["Kamui", "His eye power lets him go intangible or send stuff to another dimension."]
];

var sidebar = document.getElementById("sidebar");
for (var i = 0; i < notes.length; i++) {
  sidebar.innerHTML += '<button onclick="showNote(' + i + ')">' + notes[i][0] + '</button>';
}

function showNote(n) {
  document.getElementById("notetext").innerHTML = "<h3>" + notes[n][0] + "</h3><p>" + notes[n][1] + "</p>";
}
showNote(0);

// ---------- wallpaper + sharingan ----------
var walls = ["url('obito-bg.jpg')", "linear-gradient(black, #2b0a3d)", "linear-gradient(#0b0b2b, black)"];
var wallNum = 0;

function changeWall() {
  wallNum++;
  if (wallNum == walls.length) wallNum = 0;
  document.body.style.backgroundImage = walls[wallNum];
}

function toggleVibe() {
  document.body.classList.toggle("sharingan");
}

// ---------- terminal ----------
var termInput = document.getElementById("terminput");
var termOut = document.getElementById("termout");

termInput.onkeydown = function(e) {
  if (e.keyCode == 13) {
    var cmd = termInput.value.toLowerCase().trim();
    termOut.innerHTML += "> " + termInput.value + "<br>";

    if (cmd == "help") {
      termOut.innerHTML += "commands: help, clear, lore, creator, date, sharingan<br>";
    } else if (cmd == "clear") {
      termOut.innerHTML = "";
    } else if (cmd == "lore") {
      termOut.innerHTML += "Obito Uchiha wanted to create an infinite dream.<br>";
    } else if (cmd == "creator") {
      termOut.innerHTML += "made by a dev saving up for an AULA F75 keyboard<br>";
    } else if (cmd == "date") {
      termOut.innerHTML += new Date().toDateString() + "<br>";
    } else if (cmd == "sharingan") {
      toggleVibe();
      termOut.innerHTML += "eye activated 👁<br>";
    } else if (cmd != "") {
      termOut.innerHTML += "unknown command: " + cmd + " (try help)<br>";
    }

    termInput.value = "";
    termOut.scrollTop = termOut.scrollHeight;
  }
};

// ---------- sticky notes ----------
var stickyCount = 0;

function addSticky() {
  stickyCount++;
  var note = document.createElement("div");
  note.className = "sticky";
  note.id = "sticky" + stickyCount;
  note.style.left = (400 + stickyCount * 25) + "px";
  note.style.top = (120 + stickyCount * 25) + "px";
  note.innerHTML = '<div class="stickybar" id="sticky' + stickyCount + 'header">note ' + stickyCount +
    '<span class="sx" onclick="this.parentNode.parentNode.remove()">x</span></div>' +
    '<textarea placeholder="write something..."></textarea>';
  document.body.appendChild(note);
  dragElement(note);
  z++;
  note.style.zIndex = z;
}

// show the welcome window when the page loads
openWin("welcome");
