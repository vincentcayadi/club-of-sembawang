import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'
import { AccordionBlockComponent } from '@/blocks/Accordion/Component'
import { CTABlockComponent } from '@/blocks/CTA/Component'
import { GalleryBlockComponent } from '@/blocks/Gallery/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { QuoteBlockComponent } from '@/blocks/Quote/Component'
import { InstagramBlockComponent } from '@/blocks/Instagram/Component'

interface RenderLexicalProps {
  content: any
  className?: string
  disableIndent?: boolean | string[]
  disableTextAlign?: boolean | string[]
}

const headingClasses: Record<string, string> = {
  h1: 'mb-4 text-4xl font-bold leading-tight md:text-5xl',
  h2: 'mb-4 text-3xl font-semibold leading-snug md:text-4xl',
  h3: 'mb-4 text-2xl font-semibold leading-snug md:text-3xl',
  h4: 'mb-4 text-xl font-semibold leading-snug md:text-2xl',
  h5: 'mb-4 text-lg font-semibold leading-snug md:text-xl',
  h6: 'mb-4 text-base font-semibold leading-snug md:text-lg',
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const tag = node.tag?.startsWith('h') ? node.tag : `h${node.tag || '2'}`
    const HeadingTag = (tag as string) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

    return (
      <HeadingTag className={headingClasses[tag] || headingClasses.h2}>
        {nodesToJSX({ nodes: node.children })}
      </HeadingTag>
    )
  },
  paragraph: ({ node, nodesToJSX, parent }) => {
    const children = nodesToJSX({ nodes: node.children })
    const marginClass = parent?.type === 'listitem' ? 'mb-2 last:mb-0' : 'mb-4'

    if (!children?.length) {
      return (
        <p className={marginClass}>
          <br />
        </p>
      )
    }

    return <p className={`${marginClass} leading-relaxed`}>{children}</p>
  },
  list: ({ node, nodesToJSX }) => {
    const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
    const listStyle =
      node.listType === 'bullet' ? 'list-disc' : node.listType === 'check' ? 'list-none' : 'list-decimal'

    return (
      <ListTag className={`mb-4 ml-6 ${listStyle}`}>
        {nodesToJSX({
          nodes: node.children,
        })}
      </ListTag>
    )
  },
  listitem: ({ node, nodesToJSX }) => (
    <li className="leading-relaxed">{nodesToJSX({ nodes: node.children })}</li>
  ),
  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const rel = node.fields?.newTab ? 'noopener noreferrer' : undefined
    const target = node.fields?.newTab ? '_blank' : undefined
    let href = node.fields?.url || '#'

    if (node.fields?.linkType === 'internal') {
      const internalDoc = node.fields?.doc
      const value =
        internalDoc && typeof internalDoc === 'object' && 'value' in internalDoc
          ? (internalDoc as { value?: unknown }).value
          : internalDoc
      href =
        typeof value === 'object' ? String((value as { id?: unknown })?.id ?? value) : String(value ?? '#')
    }

    return (
      <a
        href={href}
        rel={rel}
        target={target}
        className="text-current underline underline-offset-4 decoration-primary/70 hover:decoration-primary"
      >
        {children}
      </a>
    )
  },
  blocks: {
    ...(defaultConverters.blocks ?? {}),
    accordion: ({ node }: { node: { fields: any } }) => (
      <AccordionBlockComponent {...node.fields} />
    ),
    ctaBlock: ({ node }: { node: { fields: any } }) => <CTABlockComponent {...node.fields} />,
    gallery: ({ node }: { node: { fields: any } }) => <GalleryBlockComponent {...node.fields} />,
    mediaBlock: ({ node }: { node: { fields: any } }) => <MediaBlockComponent {...node.fields} />,
    quote: ({ node }: { node: { fields: any } }) => <QuoteBlockComponent {...node.fields} />,
    instagram: ({ node }: { node: { fields: any } }) => <InstagramBlockComponent {...node.fields} />,
  },
})

export function RenderLexical({
  content,
  className,
  disableIndent,
  disableTextAlign,
}: RenderLexicalProps) {
  if (!content?.root?.children?.length) {
    return null
  }

  const wrapperClass = cn('max-w-4xl w-full', className)

  return (
    <RichText
      className={wrapperClass}
      converters={converters}
      data={content}
      disableIndent={disableIndent}
      disableTextAlign={disableTextAlign}
    />
  )
}
