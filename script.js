// --- 1. State & Variables ---
var biggestIndex = 1;
var selectedIcon = undefined;
var topBar = document.querySelector("#top");

// Select Elements
var welcomeScreen = document.querySelector("#welcome");
var notesScreen = document.querySelector("#notes");
var loreScreen = document.querySelector("#lore");

var welcomeClose = document.querySelector("#welcomeclose");
var notesClose = document.querySelector("#notesclose");
var loreClose = document.querySelector("#loreclose");

var welcomeOpen = document.querySelector("#welcomeopen");
var notesAppIcon = document.querySelector("#notesappicon");
var loreAppIcon = document.querySelector("#loreappicon");

// --- 2. Advanced App Interactive Logic (Quotes App) ---
var quotesList = [
  "\"People cannot show each other their true feelings. Fear, suspicion, and resentment never subside.\"",
  "\"Wake up to reality! Nothing ever goes as planned in this accursed world.\"",
  "\"The moment people come to know love, they run the risk of carrying hate.\"",
  "\"I'm about to enter hell... but you'll be joining me.\""
];
var currentQuoteIndex = 0;

var nextQuoteBtn = document.querySelector("#nextQuoteBtn");
var quoteDisplay = document.querySelector("#quoteDisplay");

nextQuoteBtn.addEventListener("click", function() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotesList.length;
  quoteDisplay.innerHTML = quotesList[currentQuoteIndex];
});

// --- 3. Dynamic Content Array for Notes App ---
var content = [
  {
    title: "The Reality",
    date: "06/28/2023",
    content: `
      <h3>Wake up to reality...</h3>
      <p>Nothing ever goes as planned in this accursed world. The longer you live, the more you realize that the only things that truly exist in this reality are merely pain, suffering, and futility.</p>
    `
  },
  {
    title: "Infinite Tsukuyomi",
    date: "06/29/2023",
    content: `
      <h3>Creating a Dream World</h3>
      <p>A world where everyone can have their deepest desires fulfilled without experiencing heartbreak, loss, or grief.</p>
    `
  }
];

// --- 4. Window Management Functions ---
function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function closeWindow(element) {
  element.style.display = "none";
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  if (selectedIcon) {
    deselectIcon(selectedIcon);
  }
}

function initializeWindow(element) {
  element.addEventListener("mousedown", function() {
    handleWindowTap(element);
  });
}

initializeWindow(welcomeScreen);
initializeWindow(notesScreen);
initializeWindow(loreScreen);

// --- 5. Event Listeners for Open / Close ---
welcomeClose.addEventListener("click", () => closeWindow(welcomeScreen));
notesClose.addEventListener("click", () => closeWindow(notesScreen));
loreClose.addEventListener("click", () => closeWindow(loreScreen));

welcomeOpen.addEventListener("click", () => openWindow(welcomeScreen));

notesAppIcon.addEventListener("click", function(e) {
  e.stopPropagation();
  selectIcon(notesAppIcon);
  openWindow(notesScreen);
});

loreAppIcon.addEventListener("click", function(e) {
  e.stopPropagation();
  selectIcon(loreAppIcon);
  openWindow(loreScreen);
});

// --- 6. Icon Selection Logic ---
function selectIcon(element) {
  if (selectedIcon && selectedIcon !== element) {
    deselectIcon(selectedIcon);
  }
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
  }
}

document.body.addEventListener("click", function() {
  if (selectedIcon) {
    deselectIcon(selectedIcon);
  }
});

// --- 7. Render Notes Dynamic Content ---
function setNotesContent(index) {
  var displayArea = document.querySelector("#notesContentDisplay");
  displayArea.innerHTML = content[index].content;
}

function addToSideBar(index) {
  var sidebar = document.querySelector("#sidebar");
  var note = content[index];
  var newDiv = document.createElement("div");
  
  newDiv.innerHTML = `
    <p style="margin: 0px; font-weight: 600; color: #fff;">${note.title}</p>
    <p style="font-size: 11px; margin: 2px 0 0 0; color: #888;">${note.date}</p>
  `;
  
  newDiv.addEventListener("click", function() {
    setNotesContent(index);
  });
  
  sidebar.appendChild(newDiv);
}

for (let i = 0; i < content.length; i++) {
  addToSideBar(i);
}
setNotesContent(0);

// --- 8. Draggable Windows Logic ---
dragElement(welcomeScreen);
dragElement(notesScreen);
dragElement(loreScreen);

function dragElement(element) {
  var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    
    element.style.transform = "none";
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// --- 9. Live Clock Logic ---
function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}

updateTime();
setInterval(updateTime, 1000);