"use client"

import { FormEvent, useState } from "react"
import { ArrowUpRight, CircleCheck, MessageSquareText, Send } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { GuestbookEntry } from "@/lib/guestbook"

const avatarColors = [
  "bg-blue-500/15 text-blue-300",
  "bg-cyan-500/15 text-cyan-300",
  "bg-violet-500/15 text-violet-300",
  "bg-emerald-500/15 text-emerald-300",
]

export function Guestbook({ initialEntries }: { initialEntries: GuestbookEntry[] }) {
  const [entries, setEntries] = useState(initialEntries)
  const [messageLength, setMessageLength] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), message: data.get("message") }),
      })
      const result = await response.json()

      if (!response.ok) throw new Error(result.error)

      setEntries((current) => [result.entry, ...current])
      setMessageLength(0)
      form.reset()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="app-shell min-h-screen px-4 py-4 text-foreground sm:px-6 sm:py-6">
      <div className="tech-grid pointer-events-none fixed inset-0" />

      <div className="relative mx-auto max-w-6xl">
        <Header />

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
          <Card className="border-border/70 bg-card/90 py-0 shadow-2xl shadow-black/20 backdrop-blur lg:sticky lg:top-6">
            <CardHeader className="border-b border-border/70 px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Leave a message</CardTitle>
                  <CardDescription className="mt-1.5">Add your name and a short note.</CardDescription>
                </div>
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Send className="size-4" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-5 py-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block space-y-2 text-xs font-medium text-foreground/80">
                  Name
                  <Input
                    name="name"
                    required
                    maxLength={32}
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-10 bg-background/60 px-3"
                  />
                </label>

                <label className="block space-y-2 text-xs font-medium text-foreground/80">
                  Message
                  <Textarea
                    name="message"
                    required
                    maxLength={280}
                    rows={5}
                    placeholder="Write a short message…"
                    className="min-h-32 resize-none bg-background/60 px-3 py-2.5"
                    onChange={(event) => setMessageLength(event.target.value.length)}
                  />
                </label>

                <div className="flex justify-end text-[11px] text-muted-foreground">{messageLength}/280</div>
                <Button type="submit" size="lg" disabled={submitting} className="w-full">
                  {submitting ? "Sending…" : "Add to guestbook"}
                  <Send data-icon="inline-end" />
                </Button>
                {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
              </form>

              <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4 text-[11px] text-muted-foreground">
                <CircleCheck className="size-3.5 text-emerald-400" />
                Connected to <code className="font-mono text-foreground/70">POST /api/entries</code>
              </div>
            </CardContent>
          </Card>

          <section aria-labelledby="entries-heading" className="min-w-0 rounded-xl border border-border/70 bg-card/45 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4 sm:px-6">
              <div>
                <h2 id="entries-heading" className="text-sm font-semibold">Recent messages</h2>
                <p className="mt-1 text-xs text-muted-foreground">Newest entries appear first.</p>
              </div>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {entries.length} {entries.length === 1 ? "entry" : "entries"}
              </Badge>
            </div>

            <div className="divide-y divide-border/60">
              {entries.map((entry, index) => (
                <EntryRow key={entry.id} entry={entry} index={index} />
              ))}
            </div>

            <p className="border-t border-border/70 px-5 py-3 text-[11px] text-muted-foreground sm:px-6">
              Demo data is stored in memory and resets when the server restarts.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

function Header() {
  return (
    <header className="flex h-14 items-center justify-between rounded-xl border border-border/70 bg-card/75 px-4 shadow-lg shadow-black/10 backdrop-blur sm:px-5">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <MessageSquareText className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Guestbook</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Next.js sample</p>
        </div>
      </div>

      <a href="/api/health" className="group flex items-center gap-2 rounded-md border border-border/70 bg-background/40 px-2.5 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_var(--color-emerald-400)]" />
        API online
        <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </header>
  )
}

function EntryRow({ entry, index }: { entry: GuestbookEntry; index: number }) {
  return (
    <article className="group px-5 py-5 transition-colors hover:bg-secondary/25 sm:px-6">
      <div className="flex gap-3.5">
        <Avatar size="lg">
          <AvatarFallback className={avatarColors[index % avatarColors.length]}>
            {entry.name.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-sm font-medium">{entry.name}</h3>
            <time className="font-mono text-[10px] text-muted-foreground" dateTime={entry.createdAt}>
              {formatDate(entry.createdAt)}
            </time>
          </div>
          <p className="mt-2 text-sm leading-6 text-foreground/70">{entry.message}</p>
        </div>
      </div>
    </article>
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(value)) + " UTC"
}
