import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function Footer() {
  const payload = await getPayload({ config: configPromise })
  const year = new Date().getFullYear()

  const [footerGlobal, siteSettings] = await Promise.all([
    payload.findGlobal({
      slug: 'footer',
    }),
    payload.findGlobal({
      slug: 'siteSettings',
    }),
  ])

  const siteName = siteSettings?.siteName || 'Club of Sembawang'
  const tagline = siteSettings?.tagline || "Singapore's first public health initiative"
  const socialLinks = footerGlobal?.socialLinks || []

  return (
    <footer className="border-t border-border/60 text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="text-left">
          <div className="font-medium text-foreground">
            © {year} {footerGlobal?.copyright || siteName}
          </div>
          <div className="text-xs text-muted-foreground">{tagline}</div>
        </div>
        {socialLinks.length > 0 && (
          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Connect</div>
            <div className="flex flex-col items-start gap-1 md:items-end">
              {socialLinks.map((link, idx) => {
                if (!link?.url) return null
                const platform =
                  link.platform === 'other' ? link.customPlatform : link.platform
                return (
                  <a
                    key={`${link.url}-${idx}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted/60"
                  >
                    <span className="capitalize">{platform || link.url}</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
