const KEY = "studyflow-timer-active";
const POLL_MS = 1000;
let lastValue = null;

function readTimerState() {
  return localStorage.getItem(KEY) === "true";
}

function sync() {
  const isActive = readTimerState();
  if (isActive === lastValue) return;

  lastValue = isActive;
  chrome.storage.local.set({ studyTimerActive: isActive });
}

sync();
setInterval(sync, POLL_MS);

window.addEventListener("storage", (event) => {
  if (event.key === KEY) sync();
});
