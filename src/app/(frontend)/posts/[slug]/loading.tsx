import { Skeleton } from '@/components/LoadingSkeleton'

export default function Loading() {
  return (
    <article className="container mx-auto px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Skeleton className="mb-8 h-4 w-24" />

        <header className="mb-12">
          <Skeleton className="mb-6 h-12 w-full md:h-16" />
          <Skeleton className="mb-6 h-4 w-32" />
          <Skeleton className="mb-6 h-20 w-full" />
        </header>

        <Skeleton className="mb-12 aspect-video w-full" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="pt-8">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </article>
  )
}
