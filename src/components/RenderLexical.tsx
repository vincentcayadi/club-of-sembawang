import React from 'react'
import { AccordionBlockComponent } from '@/blocks/Accordion/Component'

interface RenderLexicalProps {
  content: any
  className?: string
}

const blockComponents: Record<string, any> = {
  accordion: AccordionBlockComponent,
}

export function RenderLexical({ content, className }: RenderLexicalProps) {
  if (!content?.root?.children) {
    return null
  }

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null

    // Handle block nodes (accordion, gallery, etc.)
    if (node.type === 'block') {
      const blockType = node.fields?.blockType
      const BlockComponent = blockComponents[blockType]

      if (BlockComponent) {
        return (
          <div key={index}>
            <BlockComponent {...node.fields} />
          </div>
        )
      }
      return null
    }

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4">
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </p>
        )

      case 'heading': {
        // node.tag from Lexical HeadingFeature is already "h1"..."h6"
        const tag = node.tag?.startsWith('h') ? node.tag : `h${node.tag || '2'}`
        const HeadingTag = (tag as string) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        const headingClasses: Record<string, string> = {
          h1: 'text-4xl font-bold leading-tight md:text-5xl',
          h2: 'text-3xl font-semibold leading-snug md:text-4xl',
          h3: 'text-2xl font-semibold leading-snug md:text-3xl',
          h4: 'text-xl font-semibold leading-snug md:text-2xl',
          h5: 'text-lg font-semibold leading-snug md:text-xl',
          h6: 'text-base font-semibold leading-snug md:text-lg',
        }
        return React.createElement(
          HeadingTag,
          { key: index, className: `mb-4 ${headingClasses[tag] || 'font-bold'}` },
          node.children?.map((child: any, i: number) => renderNode(child, i)),
        )
      }

      case 'list':
        const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
        return (
          <ListTag key={index} className="mb-4 ml-6 list-inside">
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </ListTag>
        )

      case 'listitem':
        return (
          <li key={index}>
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </li>
        )

      case 'text':
        let text = <span key={index}>{node.text}</span>

        if (node.format & 1) {
          // Bold
          text = <strong key={index}>{node.text}</strong>
        }
        if (node.format & 2) {
          // Italic
          text = <em key={index}>{node.text}</em>
        }
        if (node.format & 8) {
          // Underline
          text = <u key={index}>{node.text}</u>
        }

        return text

      case 'link':
        return (
          <a
            key={index}
            href={node.fields?.url || '#'}
            target={node.fields?.newTab ? '_blank' : undefined}
            rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
            className="text-primary underline"
          >
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </a>
        )

      default:
        return null
    }
  }

  return (
    <div className={className}>
      {content.root.children.map((node: any, index: number) => renderNode(node, index))}
    </div>
  )
}
