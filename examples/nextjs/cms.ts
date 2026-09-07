type Paginated<T> = {
  docs: T[]
  totalDocs: number
}

const CMS_URL = process.env.CMS_URL ?? process.env.NEXT_PUBLIC_CMS_URL

export async function getCollection<T>(collection: string): Promise<T[]> {
  if (!CMS_URL) throw new Error('CMS_URL is not configured')

  const query = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: 'sortOrder',
    depth: '1',
    limit: '100',
  })

  const response = await fetch(`${CMS_URL}/api/${collection}?${query}`, {
    next: { revalidate: 300 },
  })

  if (!response.ok) throw new Error(`CMS request failed: ${response.status}`)
  const data = await response.json() as Paginated<T>
  return data.docs
}

export async function getSiteSettings<T>(): Promise<T> {
  if (!CMS_URL) throw new Error('CMS_URL is not configured')

  const response = await fetch(`${CMS_URL}/api/globals/site-settings?depth=1`, {
    next: { revalidate: 300 },
  })

  if (!response.ok) throw new Error(`CMS request failed: ${response.status}`)
  return response.json() as Promise<T>
}
