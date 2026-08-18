export type GuestbookEntry = {
  id: string
  name: string
  message: string
  createdAt: string
}

const seedEntries = (): GuestbookEntry[] => {
  const now = Date.now()

  return [
    {
      id: "welcome-1",
      name: "Maya",
      message: "Small apps with a little personality are the best kind of demo.",
      createdAt: new Date(now - 12 * 60_000).toISOString(),
    },
    {
      id: "welcome-2",
      name: "Noah",
      message: "Hello from the other side of the API 👋",
      createdAt: new Date(now - 31 * 60_000).toISOString(),
    },
    {
      id: "welcome-3",
      name: "Sofia",
      message: "Wishing this tiny guestbook a smooth first deployment.",
      createdAt: new Date(now - 54 * 60_000).toISOString(),
    },
  ]
}

const store = globalThis.guestbookEntries ?? seedEntries()
globalThis.guestbookEntries = store

export function getEntries() {
  return [...store]
}

export function addEntry(name: string, message: string) {
  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name,
    message,
    createdAt: new Date().toISOString(),
  }

  store.unshift(entry)
  return entry
}

declare global {
  var guestbookEntries: GuestbookEntry[] | undefined
}
