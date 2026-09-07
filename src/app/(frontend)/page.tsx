import Link from 'next/link'

const collections = ['pages', 'services', 'faqs', 'projects']

export default function HomePage() {
  return (
    <main>
      <p className="eyebrow">CRAFTKO · PAYLOAD CMS STARTER</p>
      <h1>One small CMS.<br />Many websites.</h1>
      <p className="lead">
        Manage shared business content in a protected admin panel and consume only published data through the REST API.
      </p>
      <div className="actions">
        <Link className="primary" href="/admin">Open admin</Link>
        <Link href="/healthz">Health check</Link>
      </div>
      <section>
        <h2>Public endpoints</h2>
        <code>/api/globals/site-settings</code>
        {collections.map((collection) => <code key={collection}>/api/{collection}?where[_status][equals]=published&amp;sort=sortOrder</code>)}
      </section>
      <p className="note">On first launch, open <strong>/admin</strong> and create the initial administrator.</p>
    </main>
  )
}
