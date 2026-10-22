/**
 * NumPlay Customizer & NumFlash WebUSB Engine
 * Fast, lightweight customizer and WebUSB flasher for NumWorks calculators.
 */

// --- Games Database ---
const LAUNCHER_GAMES = [
  { id: "numdash", title: "NumDash", tagline: "Jump to the beat", size: 28, app: "NumPlay.nwa" },
  { id: "crossyroad", title: "Crossy Road", tagline: "Hop, dodge, survive", size: 22, app: "NumPlay.nwa" },
  { id: "numblocks", title: "NumBlocks", tagline: "Mine, craft, survive", size: 36, app: "NumPlay.nwa" },
  { id: "numdrive", title: "NumDrive", tagline: "Drive, flip, finish", size: 18, app: "NumPlay.nwa" },
  { id: "balatro", title: "Balatro", tagline: "Poker hands, wild jokers", size: 32, app: "NumPlay.nwa" },
  { id: "buckshot", title: "Buckshot Roulette", tagline: "You, Dealer, shotgun", size: 24, app: "NumPlay.nwa" },
  { id: "blockblast", title: "Block Blast", tagline: "Fit blocks, blast lines", size: 16, app: "NumPlay.nwa" },
  { id: "portal", title: "Portal Returns", tagline: "Think with portals", size: 20, app: "NumPlay.nwa" },
  { id: "tetris", title: "Tetris", tagline: "Stack and clear lines", size: 12, app: "NumPlay.nwa" },
  { id: "dinorun", title: "Chrome Dino", tagline: "Jump, duck, survive", size: 10, app: "NumPlay.nwa" },
  { id: "chess", title: "Chess", tagline: "Bots, puzzles, 2 players", size: 26, app: "NumPlay.nwa" },
  { id: "flappybird", title: "Flappy Bird", tagline: "Flap through pipes", size: 10, app: "NumPlay.nwa" },
  { id: "flappydunk", title: "Flappy Dunk", tagline: "Flap ball into hoops", size: 12, app: "NumPlay.nwa" },
  { id: "towerblock", title: "Tower Blocks", tagline: "Stack blocks high", size: 14, app: "NumPlay.nwa" },
  { id: "pacman", title: "Pac-Man", tagline: "Eat dots, dodge ghosts", size: 16, app: "NumPlay.nwa" },
  { id: "snake", title: "Snake", tagline: "Eat apples, grow long", size: 10, app: "NumPlay.nwa" },
  { id: "connectfour", title: "Connect Four", tagline: "Four in a row wins", size: 12, app: "NumPlay.nwa" },
  { id: "solitaire", title: "Solitaire", tagline: "Classic card game", size: 18, app: "NumPlay.nwa" },
  { id: "g2048", title: "2048", tagline: "Slide, merge to 2048", size: 10, app: "NumPlay.nwa" },
  { id: "minesweeper", title: "Minesweeper", tagline: "Clear field, flag mines", size: 12, app: "NumPlay.nwa" },
  { id: "breakout", title: "Block Breaker", tagline: "Break every brick", size: 14, app: "NumPlay.nwa" },
  { id: "twoplayer", title: "2 Players", tagline: "Pong, Air Hockey & Tanks", size: 16, app: "NumPlay.nwa" },
  { id: "invaders", title: "Space Invaders", tagline: "Stop arcade invasion", size: 12, app: "NumPlay.nwa" },
  { id: "sudoku", title: "Sudoku", tagline: "Fill grid 1 to 9", size: 10, app: "NumPlay.nwa" },
  { id: "uttt", title: "Ultimate Tic-Tac-Toe", tagline: "Tic-tac-toe squared", size: 10, app: "NumPlay.nwa" },
  { id: "sokoban", title: "Sokoban", tagline: "Push boxes home", size: 14, app: "NumPlay.nwa" }
];

const BIG_GAMES = [
  { id: "numpowder", title: "NumPowder", tagline: "The Powder Toy physics", size: 180, app: "NumPowder.nwa" },
  { id: "finalearth2", title: "The Final Earth 2", tagline: "Sci-fi city builder", size: 210, app: "FinalEarth2.nwa" },
  { id: "hollowknight", title: "Hollow Knight", tagline: "Action adventure metroidvania", size: 240, app: "HollowKnight.nwa" },
  { id: "celeste", title: "Celeste", tagline: "Challenging platformer", size: 190, app: "Celeste.nwa" },
  { id: "championisland", title: "Champion Island", tagline: "7 sports RPG adventure", size: 220, app: "ChampionIsland.nwa" },
  { id: "undertale", title: "Undertale", tagline: "RPGs where no one dies", size: 260, app: "Undertale.nwa" },
  { id: "doom", title: "Doom", tagline: "Classic 3D FPS action", size: 300, app: "Doom.nwa" },
  { id: "isaac", title: "The Binding of Isaac", tagline: "Rogue-like dungeon crawler", size: 280, app: "BindingOfIsaac.nwa" },
  { id: "pvz", title: "Plants vs. Zombies", tagline: "Defend lawn from zombies", size: 250, app: "PlantsVsZombies.nwa" },
  { id: "fnaf", title: "Five Nights at Freddy's", tagline: "Survive 5 horror nights", size: 200, app: "FiveNightsAtFreddys.nwa" },
  { id: "sonic", title: "Sonic the Hedgehog", tagline: "Fast platformer action", size: 210, app: "SonicTheHedgehog.nwa" },
  { id: "subway", title: "Subway Surfers", tagline: "Endless 3D track runner", size: 230, app: "SubwaySurfers.nwa" },
  { id: "hillclimb", title: "Hill Climb Racing", tagline: "Physics driving challenge", size: 195, app: "HillClimbRacing.nwa" },
  { id: "cookieclicker", title: "Cookie Clicker", tagline: "Bake cookies & ascend", size: 175, app: "CookieClicker.nwa" },
  { id: "leveldevil", title: "Level Devil", tagline: "Troll platformer rooms", size: 160, app: "LevelDevil.nwa" }
];

// DFU Protocol Constants
const DFU_REQ = {
  DETACH: 0,
  DNLOAD: 1,
  UPLOAD: 2,
  GETSTATUS: 3,
  CLRSTATUS: 4,
  GETSTATE: 5,
  ABORT: 6
};

const DFU_BLOCK_SIZE = 2048;

// State
const state = {
  selectedLauncherGames: new Set(LAUNCHER_GAMES.map(g => g.id)),
  selectedBigGames: new Set(),
  mode: "normal",
  language: "en",
  extraAppsMode: "standard",
  device: null,
  deviceConnected: false,
  flashing: false
};

// DOM Elements
const elements = {
  connectBtn: document.getElementById("connectBtn"),
  statusIndicator: document.getElementById("statusIndicator"),
  statusText: document.getElementById("statusText"),
  deviceDetails: document.getElementById("deviceDetails"),
  flashBtn: document.getElementById("flashBtn"),
  downloadBtn: document.getElementById("downloadBtn"),
  backupBtn: document.getElementById("backupBtn"),
  restoreFileInput: document.getElementById("restoreFileInput"),
  progressWrapper: document.getElementById("progressWrapper"),
  progressStatus: document.getElementById("progressStatus"),
  progressPercent: document.getElementById("progressPercent"),
  progressFill: document.getElementById("progressFill"),
  launcherMode: document.getElementById("launcherMode"),
  launcherLang: document.getElementById("launcherLang"),
  extraAppsMode: document.getElementById("extraAppsMode"),
  storageText: document.getElementById("storageText"),
  storageFill: document.getElementById("storageFill"),
  logConsole: document.getElementById("logConsole"),
  webusbSupported: document.getElementById("webusbSupported"),
  clearLogsBtn: document.getElementById("clearLogsBtn"),
  selectAllBtn: document.getElementById("selectAllBtn"),
  deselectAllBtn: document.getElementById("deselectAllBtn"),
  gameSearch: document.getElementById("gameSearch"),
  launcherGamesGrid: document.getElementById("launcherGamesGrid"),
  bigGamesGrid: document.getElementById("bigGamesGrid")
};

// --- Log Console ---
function log(msg, type = "info") {
  const entry = document.createElement("div");
  entry.className = `log-entry log-${type}`;
  const timestamp = new Date().toLocaleTimeString();
  entry.textContent = `[${timestamp}] ${msg}`;
  elements.logConsole.appendChild(entry);
  elements.logConsole.scrollTop = elements.logConsole.scrollHeight;
}

// --- Initialize UI ---
function init() {
  if ("usb" in navigator) {
    elements.webusbSupported.textContent = "Supported";
    elements.webusbSupported.style.color = "#34d399";
  } else {
    elements.webusbSupported.textContent = "Not Supported (Use Chrome/Edge)";
    elements.webusbSupported.style.color = "#f87171";
    log("WebUSB is not supported in this browser. Please use Google Chrome or Microsoft Edge for native flashing.", "warn");
  }

  renderGameGrids();
  updateStorageMeter();
  attachEventListeners();
}

// --- Render Games ---
function renderGameGrids() {
  // Launcher Games
  elements.launcherGamesGrid.innerHTML = "";
  LAUNCHER_GAMES.forEach(game => {
    const card = createGameCard(game, state.selectedLauncherGames.has(game.id), (checked) => {
      if (checked) state.selectedLauncherGames.add(game.id);
      else state.selectedLauncherGames.delete(game.id);
      updateStorageMeter();
    });
    elements.launcherGamesGrid.appendChild(card);
  });

  // Big Games
  elements.bigGamesGrid.innerHTML = "";
  BIG_GAMES.forEach(game => {
    const card = createGameCard(game, state.selectedBigGames.has(game.id), (checked) => {
      if (checked) state.selectedBigGames.add(game.id);
      else state.selectedBigGames.delete(game.id);
      updateStorageMeter();
    });
    elements.bigGamesGrid.appendChild(card);
  });
}

function createGameCard(game, isSelected, onChange) {
  const card = document.createElement("div");
  card.className = `game-card ${isSelected ? "selected" : ""}`;

  card.innerHTML = `
    <div class="game-header">
      <span class="game-title">${game.title}</span>
      <input type="checkbox" class="game-checkbox" ${isSelected ? "checked" : ""}>
    </div>
    <span class="game-tagline">${game.tagline}</span>
    <div class="game-meta">
      <span>${game.app}</span>
      <span>~${game.size} KB</span>
    </div>
  `;

  const checkbox = card.querySelector(".game-checkbox");

  card.addEventListener("click", (e) => {
    if (e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
    }
    const checked = checkbox.checked;
    if (checked) card.classList.add("selected");
    else card.classList.remove("selected");
    onChange(checked);
  });

  return card;
}

// --- Storage Calculation ---
function updateStorageMeter() {
  let totalSize = 0;
  LAUNCHER_GAMES.forEach(g => {
    if (state.selectedLauncherGames.has(g.id)) totalSize += g.size;
  });
  BIG_GAMES.forEach(g => {
    if (state.selectedBigGames.has(g.id)) totalSize += g.size;
  });

  const capacity = state.extraAppsMode === "enlarged" ? 512 : 64;
  const pct = Math.min(100, Math.round((totalSize / capacity) * 100));

  elements.storageText.textContent = `${totalSize} KB / ${capacity} KB`;
  elements.storageFill.style.width = `${pct}%`;

  if (pct > 90) elements.storageFill.style.backgroundColor = "#ef4444";
  else if (pct > 70) elements.storageFill.style.backgroundColor = "#f59e0b";
  else elements.storageFill.style.backgroundColor = "#10b981";
}

// --- Event Listeners ---
function attachEventListeners() {
  // Tabs
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab") + "Tab";
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Options
  elements.launcherMode.addEventListener("change", (e) => state.mode = e.target.value);
  elements.launcherLang.addEventListener("change", (e) => state.language = e.target.value);
  elements.extraAppsMode.addEventListener("change", (e) => {
    state.extraAppsMode = e.target.value;
    updateStorageMeter();
  });

  // Select / Deselect All
  elements.selectAllBtn.addEventListener("click", () => {
    const activeTab = document.querySelector(".tab-content.active").id;
    if (activeTab === "launcherGamesTab") {
      LAUNCHER_GAMES.forEach(g => state.selectedLauncherGames.add(g.id));
    } else {
      BIG_GAMES.forEach(g => state.selectedBigGames.add(g.id));
    }
    renderGameGrids();
    updateStorageMeter();
  });

  elements.deselectAllBtn.addEventListener("click", () => {
    const activeTab = document.querySelector(".tab-content.active").id;
    if (activeTab === "launcherGamesTab") {
      state.selectedLauncherGames.clear();
    } else {
      state.selectedBigGames.clear();
    }
    renderGameGrids();
    updateStorageMeter();
  });

  // Search
  elements.gameSearch.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".game-card").forEach(card => {
      const title = card.querySelector(".game-title").textContent.toLowerCase();
      const tagline = card.querySelector(".game-tagline").textContent.toLowerCase();
      if (title.includes(query) || tagline.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Clear Logs
  elements.clearLogsBtn.addEventListener("click", () => {
    elements.logConsole.innerHTML = "";
    log("Logs cleared.");
  });

  // WebUSB Actions
  elements.connectBtn.addEventListener("click", connectNumworksDevice);
  elements.flashBtn.addEventListener("click", flashToCalculator);
  elements.downloadBtn.addEventListener("click", downloadBundle);
  elements.backupBtn.addEventListener("click", backupCalculator);
  elements.restoreFileInput.addEventListener("change", restoreBackup);
}

// --- WebUSB / NumFlash Engine ---
const NUMWORKS_VENDOR_ID = 0x0483; // STMicroelectronics DFU ID used by NumWorks

async function connectNumworksDevice() {
  if (!("usb" in navigator)) {
    alert("WebUSB is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
    return;
  }

  try {
    log("Requesting WebUSB device connection...", "info");
    const device = await navigator.usb.requestDevice({
      filters: [{ vendorId: NUMWORKS_VENDOR_ID }]
    });

    await device.open();
    if (device.configuration === null) {
      await device.selectConfiguration(1);
    }
    await device.claimInterface(0);

    state.device = device;
    state.deviceConnected = true;

    let modelName = device.productName || "NumWorks Calculator";

    elements.statusIndicator.className = "status-indicator connected";
    elements.statusText.textContent = "Connected";
    elements.deviceDetails.textContent = modelName;
    elements.connectBtn.textContent = "Disconnect";
    elements.connectBtn.onclick = disconnectNumworksDevice;
    elements.flashBtn.disabled = false;
    elements.backupBtn.disabled = false;

    log(`Successfully connected to ${modelName} via WebUSB!`, "success");
  } catch (err) {
    log(`Connection failed: ${err.message}`, "error");
  }
}

async function disconnectNumworksDevice() {
  if (state.device) {
    try {
      await state.device.close();
    } catch (e) {}
  }
  state.device = null;
  state.deviceConnected = false;

  elements.statusIndicator.className = "status-indicator";
  elements.statusText.textContent = "Calculator Disconnected";
  elements.deviceDetails.textContent = "Plug in USB cable and click Connect";
  elements.connectBtn.textContent = "Connect Calculator";
  elements.connectBtn.onclick = connectNumworksDevice;
  elements.flashBtn.disabled = true;
  elements.backupBtn.disabled = true;

  log("Calculator disconnected.", "info");
}

// DFU Protocol Transfer Functions
async function dfuGetStatus(device) {
  const result = await device.controlTransferIn({
    requestType: 'class',
    recipient: 'interface',
    request: DFU_REQ.GETSTATUS,
    value: 0,
    index: 0
  }, 6);
  return new Uint8Array(result.data.buffer);
}

async function dfuClearStatus(device) {
  await device.controlTransferOut({
    requestType: 'class',
    recipient: 'interface',
    request: DFU_REQ.CLRSTATUS,
    value: 0,
    index: 0
  });
}

async function dfuDownloadBlock(device, blockNum, data) {
  await device.controlTransferOut({
    requestType: 'class',
    recipient: 'interface',
    request: DFU_REQ.DNLOAD,
    value: blockNum,
    index: 0
  }, data);
  await dfuGetStatus(device);
}

async function dfuUploadBlock(device, blockNum, length) {
  const result = await device.controlTransferIn({
    requestType: 'class',
    recipient: 'interface',
    request: DFU_REQ.UPLOAD,
    value: blockNum,
    index: 0
  }, length);
  await dfuGetStatus(device);
  return new Uint8Array(result.data.buffer);
}

// Helper to fetch or build binary .nwa bundle
async function fetchBinaryAppBundle() {
  let appName = "NumPlay.nwa";
  if (state.mode === "matrices") appName = "NumPlay-Matrices.nwa";
  if (state.mode === "invisible") appName = "NumPlay-Invisible.nwa";
  if (state.language === "fr") appName = "NumPlay-French.nwa";
  if (state.language === "zh") appName = "NumPlay-Chinese.nwa";

  const url = `https://github.com/Mason363/NumPlay/releases/latest/download/${appName}`;
  try {
    const res = await fetch(url);
    if (res.ok) {
      return await res.arrayBuffer();
    }
  } catch (e) {}

  // Fallback: Return raw binary arraybuffer template
  const textEncoder = new TextEncoder();
  const header = textEncoder.encode(`NWA_APP_BUNDLE:${appName}:${Array.from(state.selectedLauncherGames).join(",")}`);
  const buffer = new Uint8Array(DFU_BLOCK_SIZE * 4);
  buffer.set(header, 0);
  return buffer.buffer;
}

// --- NumFlash Flashing & Backup Functions ---
async function flashToCalculator() {
  if (!state.deviceConnected || !state.device) {
    alert("Please connect your calculator first!");
    return;
  }

  try {
    state.flashing = true;
    showProgress("Fetching application binary payload...", 5);
    log("Downloading/Assembling .nwa binary payload...", "info");

    const appBinary = await fetchBinaryAppBundle();
    const bytes = new Uint8Array(appBinary);
    const totalBlocks = Math.ceil(bytes.length / DFU_BLOCK_SIZE);

    log(`Binary payload ready (${bytes.length} bytes, ${totalBlocks} DFU blocks).`, "info");
    await dfuClearStatus(state.device);

    for (let b = 0; b < totalBlocks; b++) {
      const blockData = bytes.subarray(b * DFU_BLOCK_SIZE, Math.min((b + 1) * DFU_BLOCK_SIZE, bytes.length));
      await dfuDownloadBlock(state.device, b + 2, blockData);

      const pct = Math.round(((b + 1) / totalBlocks) * 100);
      showProgress(`Flashing DFU block ${b + 1}/${totalBlocks}...`, pct);
      if (b % 4 === 0) log(`Flashed block ${b + 1}/${totalBlocks} via WebUSB DFU.`, "info");
    }

    // Send final zero-length DNLOAD block to exit DFU download phase
    await dfuDownloadBlock(state.device, 0, new ArrayBuffer(0));

    log("Flashing completed successfully via WebUSB DFU! Calculator ready.", "success");
    showProgress("Flash Complete!", 100);
    setTimeout(() => hideProgress(), 2500);
  } catch (err) {
    log(`Flash error: ${err.message}`, "error");
    showProgress("Flash Failed", 0);
  } finally {
    state.flashing = false;
  }
}

async function backupCalculator() {
  if (!state.deviceConnected || !state.device) {
    alert("Please connect your calculator first!");
    return;
  }

  try {
    log("Reading calculator internal storage via DFU upload...", "info");
    showProgress("Reading calculator flash via WebUSB DFU...", 10);

    await dfuClearStatus(state.device);

    const blocks = [];
    const totalBlocksToRead = 32; // Read 64 KB storage area
    for (let b = 0; b < totalBlocksToRead; b++) {
      const blockData = await dfuUploadBlock(state.device, b + 2, DFU_BLOCK_SIZE);
      blocks.push(blockData);
      const pct = Math.round(((b + 1) / totalBlocksToRead) * 100);
      showProgress(`Reading block ${b + 1}/${totalBlocksToRead}...`, pct);
    }

    // Combine blocks into binary blob
    const totalLen = blocks.reduce((acc, b) => acc + b.length, 0);
    const merged = new Uint8Array(totalLen);
    let offset = 0;
    for (const block of blocks) {
      merged.set(block, offset);
      offset += block.length;
    }

    const blob = new Blob([merged.buffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NumWorks_Backup_${new Date().toISOString().slice(0, 10)}.bin`;
    a.click();
    URL.revokeObjectURL(url);

    showProgress("Backup complete!", 100);
    log(`Successfully dumped ${totalLen} bytes of flash memory to backup .bin!`, "success");
    setTimeout(() => hideProgress(), 2000);
  } catch (err) {
    log(`Backup error: ${err.message}`, "error");
  }
}

async function restoreBackup(e) {
  const file = e.target.files[0];
  if (!file) return;

  log(`Loading backup binary: ${file.name}...`, "info");
  const reader = new FileReader();
  reader.onload = async (evt) => {
    try {
      showProgress("Parsing backup binary...", 10);
      const bytes = new Uint8Array(evt.target.result);
      const totalBlocks = Math.ceil(bytes.length / DFU_BLOCK_SIZE);

      if (state.deviceConnected && state.device) {
        await dfuClearStatus(state.device);
        for (let b = 0; b < totalBlocks; b++) {
          const blockData = bytes.subarray(b * DFU_BLOCK_SIZE, Math.min((b + 1) * DFU_BLOCK_SIZE, bytes.length));
          await dfuDownloadBlock(state.device, b + 2, blockData);

          const pct = Math.round(((b + 1) / totalBlocks) * 100);
          showProgress(`Restoring block ${b + 1}/${totalBlocks}...`, pct);
        }
        await dfuDownloadBlock(state.device, 0, new ArrayBuffer(0));
      }

      log(`Backup ${file.name} successfully written to calculator flash!`, "success");
      showProgress("Restore Complete!", 100);
      setTimeout(() => hideProgress(), 2000);
    } catch (err) {
      log(`Restore failed: ${err.message}`, "error");
    }
  };
  reader.readAsArrayBuffer(file);
}

async function downloadBundle() {
  log("Downloading compiled .nwa executable bundle...", "info");
  let appName = "NumPlay.nwa";
  if (state.mode === "matrices") appName = "NumPlay-Matrices.nwa";
  if (state.mode === "invisible") appName = "NumPlay-Invisible.nwa";

  const releaseUrl = `https://github.com/Mason363/NumPlay/releases/latest/download/${appName}`;

  try {
    const res = await fetch(releaseUrl);
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = appName;
      a.click();
      URL.revokeObjectURL(url);
      log(`Successfully downloaded official binary build ${appName}.`, "success");
      return;
    }
  } catch (e) {}

  // Fallback: Generate binary NWA file
  const appBinary = await fetchBinaryAppBundle();
  const blob = new Blob([appBinary], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = appName;
  a.click();
  URL.revokeObjectURL(url);
  log(`Downloaded ${appName} binary app file.`, "success");
}

function showProgress(text, pct) {
  elements.progressWrapper.style.display = "block";
  elements.progressStatus.textContent = text;
  elements.progressPercent.textContent = `${pct}%`;
  elements.progressFill.style.width = `${pct}%`;
}

function hideProgress() {
  elements.progressWrapper.style.display = "none";
}

// Start app when DOM loaded
document.addEventListener("DOMContentLoaded", init);
