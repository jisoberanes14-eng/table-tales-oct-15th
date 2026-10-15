import { NotFoundView } from '@/components/layout/NotFoundView'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return <NotFoundView />
}
