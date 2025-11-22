import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  ParagraphFeature,
  HeadingFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  BlocksFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Gallery } from '@/blocks/Gallery/config'
import { CTA } from '@/blocks/CTA/config'
import { Accordion } from '@/blocks/Accordion/config'

export const richLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    BlockquoteFeature(),
    LinkFeature({
      enabledCollections: ['posts'],
    }),
    HorizontalRuleFeature(),
    BlocksFeature({
      blocks: [Accordion, MediaBlock, Gallery, CTA],
    }),
    FixedToolbarFeature(),
  ],
})
