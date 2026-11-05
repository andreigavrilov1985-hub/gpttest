// Scene engine: loads explainers/<topic-id>.js (data only) and mounts blocks for a step.
import { BLOCKS } from './blocks.js';
import { SCENES } from '../explainers/index.js';

const cache = new Map();

/** Returns the scene for a topic, or null when there is none yet (then the text fallback is used). */
export async function loadScene(topicId) {
  if (cache.has(topicId)) return cache.get(topicId);
  let scene = null;
  if (!SCENES.includes(topicId)) {
    cache.set(topicId, null);
    return null;
  }
  try {
    scene = (await import(`../explainers/${topicId}.js`)).default;
  } catch {
    scene = null;
  }
  cache.set(topicId, scene);
  return scene;
}

export const hasSceneCached = (topicId) => !!cache.get(topicId);

/** Mounts the block of `step` into host. Re-mounting replays the animation. */
export function mountStep(host, step, helpers) {
  const block = BLOCKS[step.block];
  host.innerHTML = '';
  host.dataset.block = step.block;
  host.dataset.run = String(Number(host.dataset.run || 0) + 1);
  delete host.dataset.touched;
  if (!block) {
    host.textContent = '';
    return;
  }
  block(host, step.params || {}, helpers);
}

/** Rough reading time of a scene, seconds: captions + kitten lines at ~10 chars/s, plus ~3 s of animation per step. */
export function sceneSeconds(scene) {
  return scene.steps.reduce((t, s) => t + ((s.caption || '').length + (s.cat || '').length) / 10 + 3, 0);
}
