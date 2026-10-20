import { useSyncExternalStore } from 'react'

const SESSION_KEY = 'variant.resume.unlocked'
const CHANGE_EVENT = 'resume-privacy-change'

function readUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

// Keep a successful unlock for this page even when sessionStorage is unavailable.
let unlockedInMemory = false

function getSnapshot() {
  return unlockedInMemory || readUnlocked()
}

export function unlockResumePrivacy() {
  unlockedInMemory = true
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Browsers may disable sessionStorage in private mode.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** Resume and social contacts share the same session unlock. */
export function useResumePrivacy() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
