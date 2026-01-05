import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { OptimizedImage } from './OptimizedImage'
import type { Media } from '@/payload-types'

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
  const logo = siteSettings?.logo
  const description = footerGlobal?.description || siteSettings?.description
  const footerLinks = footerGlobal?.footerLinks || []
  const socialLinks = footerGlobal?.socialLinks || []
  const legalLinks = footerGlobal?.legalLinks || []

  return (
    <footer className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[auto_auto_auto] gap-x-16 gap-y-12">
          {/* Logo and Description */}
          <div className="flex flex-col items-start text-left max-w-sm">
            <div className="h-10 flex items-center">
              {logo && typeof logo === 'object' && 'url' in logo ? (
                <OptimizedImage
                  media={logo as Media}
                  width={157}
                  height={40}
                  className="h-10 w-auto object-contain"
                  alt={siteName}
                />
              ) : (
                <span className="text-xl font-bold text-white">{siteName}</span>
              )}
            </div>
            <div className="w-full max-w-52 h-px mt-8 bg-gradient-to-r from-black via-white/25 to-black"></div>
            {description && (
              <p className="text-sm text-white/60 mt-6 max-w-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Important Links */}
          {footerLinks.length > 0 && (
            <div className="flex flex-col items-start text-left">
              <h3 className="text-sm text-white font-medium">Important Links</h3>
              <div className="flex flex-col gap-2 mt-6">
                {footerLinks.map((item, idx) => {
                  if (!item?.url) return null
                  return (
                    <a
                      key={`${item.url}-${idx}`}
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel={item.url.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex flex-col items-start text-left">
              <h3 className="text-sm text-white font-medium">Social Links</h3>
              <div className="flex flex-col gap-2 mt-6">
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
                      className="text-sm text-white/60 hover:text-white transition-colors capitalize"
                    >
                      {platform}
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="w-full h-px mt-16 mb-4 bg-gradient-to-r from-black via-white/25 to-black"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            © {year} {footerGlobal?.copyright || siteName}
          </p>
          {legalLinks.length > 0 && (
            <div className="flex items-center gap-6">
              {legalLinks.map((link, idx) => {
                if (!link?.url) return null
                return (
                  <>
                    <a
                      key={`${link.url}-${idx}`}
                      href={link.url}
                      className="text-xs text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                    {idx < legalLinks.length - 1 && (
                      <div key={`sep-${idx}`} className="w-px h-4 bg-white/20"></div>
                    )}
                  </>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
