export const dynamic = "force-dynamic"

export function GET() {
  return Response.json({
    status: "ok",
    environment: process.env.APP_ENV ?? process.env.NODE_ENV,
    version: process.env.APP_VERSION ?? "local",
    timestamp: new Date().toISOString(),
  })
}
