import config from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await getPayload({ config })
    return Response.json({ status: 'ok' }, { status: 200 })
  } catch {
    return Response.json({ status: 'unavailable' }, { status: 503 })
  }
}
