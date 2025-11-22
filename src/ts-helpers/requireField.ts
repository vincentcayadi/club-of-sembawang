/**
 * Makes specific fields required in a type
 *
 * @example
 * type Page = {
 *   title: string
 *   slug?: string
 *   content?: string
 * }
 *
 * type PageWithSlug = RequireField<Page, 'slug'>
 * // Result: { title: string; slug: string; content?: string }
 */
export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * Makes specific fields optional in a type
 *
 * @example
 * type Page = {
 *   title: string
 *   slug: string
 *   content: string
 * }
 *
 * type PageDraft = OptionalField<Page, 'slug' | 'content'>
 * // Result: { title: string; slug?: string; content?: string }
 */
export type OptionalField<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
