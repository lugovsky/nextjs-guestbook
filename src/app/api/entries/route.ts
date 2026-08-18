import { addEntry, getEntries } from "@/lib/guestbook"

export const dynamic = "force-dynamic"

export function GET() {
  return Response.json({ entries: getEntries() })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const name = typeof body?.name === "string" ? body.name.trim() : ""
  const message = typeof body?.message === "string" ? body.message.trim() : ""

  if (!name || !message || name.length > 32 || message.length > 280) {
    return Response.json(
      { error: "Add a name and a message within the character limits." },
      { status: 400 }
    )
  }

  return Response.json({ entry: addEntry(name, message) }, { status: 201 })
}
