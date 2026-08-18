import { Guestbook } from "@/components/guestbook"
import { getEntries } from "@/lib/guestbook"

export const dynamic = "force-dynamic"

export default function Home() {
  return <Guestbook initialEntries={getEntries()} />
}
