const RULE_IDS = [1001, 1002];

function makeRedirectRule(id, filter) {
  return {
    id,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        extensionPath: "/blocked.html",
      },
    },
    condition: {
      regexFilter: filter,
      resourceTypes: ["main_frame"],
    },
  };
}

async function updateBlockRules(isActive) {
  if (!chrome.declarativeNetRequest?.updateDynamicRules) return;

  const addRules = isActive
    ? [
        makeRedirectRule(1001, "^https?://([a-z0-9-]+\\.)?youtube\\.com/.*"),
        makeRedirectRule(1002, "^https?://([a-z0-9-]+\\.)?instagram\\.com/.*"),
      ]
    : [];

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: RULE_IDS,
    addRules,
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["studyTimerActive"], ({ studyTimerActive }) => {
    updateBlockRules(Boolean(studyTimerActive));
  });
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes.studyTimerActive) return;
  updateBlockRules(Boolean(changes.studyTimerActive.newValue));
});
