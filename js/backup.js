// Backups of the progress, kept on the device in two independent stores
// (localStorage under its own key, and IndexedDB), so that a broken or reset save
// can be restored from the admin screen. Also asks the browser not to evict the data.

const LS_KEY = 'kidsgame.backups.v1';
const DB = 'kidsgame-backup';
const KEEP = 12;
const EVERY_MS = 5 * 60 * 1000; // a new copy at most every 5 minutes (or when a topic is finished)

export function summary(p) {
  const topics = Object.values(p?.topics || {});
  return {
    child: p?.profile?.childName || '—',
    kitten: p?.profile?.kittenName || '—',
    coins: p?.coins || 0,
    done: topics.filter((t) => t.done).length,
    islands: Object.keys(p?.islandsPassed || {}).length,
  };
}

const meaningful = (p) => !!p && !!p.profile && (summary(p).done > 0 || (p.coins || 0) > 0);

function readLS() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function writeLS(list) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch { /* storage full: IndexedDB still has it */ }
}

function idb(mode, fn) {
  return new Promise((resolve) => {
    if (!('indexedDB' in window)) return resolve(null);
    let req;
    try { req = indexedDB.open(DB, 1); } catch { return resolve(null); }
    req.onupgradeneeded = () => req.result.createObjectStore('snaps', { keyPath: 'at' });
    req.onerror = () => resolve(null);
    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction('snaps', mode);
      const out = fn(tx.objectStore('snaps'));
      tx.oncomplete = () => { db.close(); resolve(out && 'result' in out ? out.result : true); };
      tx.onerror = () => { db.close(); resolve(null); };
    };
  });
}

let lastAt = 0;
let lastDone = -1;
/** Called after every save. Cheap: writes a copy only every few minutes or when progress grows. */
export function maybeBackup(p, force = false) {
  if (!meaningful(p)) return;
  const s = summary(p);
  const now = Date.now();
  if (!force && now - lastAt < EVERY_MS && s.done === lastDone) return;
  const key = JSON.stringify([p.profile, p.coins, p.topics, p.islandsPassed || {}]);
  const list = readLS().filter((x) => x.at !== now);
  if (list[0] && list[0].key === key) return; // nothing new since the last copy
  lastAt = now;
  lastDone = s.done;
  const snap = { at: now, summary: s, key, data: JSON.stringify(p) };
  list.unshift(snap);
  writeLS(list.slice(0, KEEP));
  idb('readwrite', (st) => {
    st.put(snap);
    const all = st.getAllKeys();
    all.onsuccess = () => all.result.sort((a, b) => b - a).slice(KEEP * 3).forEach((k) => st.delete(k));
  });
}

/** All copies from both stores, newest first, without duplicates. */
export async function listBackups() {
  const fromDb = (await idb('readonly', (st) => st.getAll())) || [];
  const map = new Map();
  for (const x of [...readLS(), ...fromDb]) if (x && x.at && !map.has(x.at)) map.set(x.at, x);
  // neighbours with the same content are shown once
  return [...map.values()].sort((a, b) => b.at - a.at).filter((x, i, arr) => i === 0 || !x.key || x.key !== arr[i - 1].key);
}

/** Ask the browser to keep the game's data (Safari/Chrome may otherwise clear it). */
export function askPersistent() {
  try { navigator.storage?.persist?.().catch(() => {}); } catch { /* not supported */ }
}
