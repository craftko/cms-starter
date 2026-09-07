type Paginated<T> = { docs: T[] }

const CMS_URL = import.meta.env.VITE_CMS_URL

export async function getPublished<T>(collection: string): Promise<T[]> {
  if (!CMS_URL) throw new Error('VITE_CMS_URL is not configured')

  const query = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: 'sortOrder',
    depth: '1',
    limit: '100',
  })

  const response = await fetch(`${CMS_URL}/api/${collection}?${query}`)
  if (!response.ok) throw new Error(`CMS request failed: ${response.status}`)

  const data = await response.json() as Paginated<T>
  return data.docs
}
