import { Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PlacePage } from '@/pages/PlacePage'
import { SavedPage } from '@/pages/SavedPage'
import { TrailDetailPage } from '@/pages/TrailDetailPage'
import { TrailsPage } from '@/pages/TrailsPage'

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="places/:placeId" element={<PlacePage />} />
        <Route path="trails" element={<TrailsPage />} />
        <Route path="trails/:trailId" element={<TrailDetailPage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
