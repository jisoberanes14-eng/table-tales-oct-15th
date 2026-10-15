import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { reportsRepo } from '@/data'
import { queryKeys } from '@/lib/queryKeys'
import { useAuth } from './useAuth'

/** "Mark as closed": whether the signed-in person has reported this place, plus report/withdraw. */
export function useClosureReport(placeId: string) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const key = queryKeys.reports.closed(placeId)

  const query = useQuery({
    queryKey: key,
    queryFn: () => reportsRepo.hasReportedClosed(placeId),
    enabled: user !== null,
  })
  const invalidate = () => queryClient.invalidateQueries({ queryKey: key })

  const report = useMutation({
    mutationFn: () => reportsRepo.reportClosed(placeId),
    onSuccess: invalidate,
  })
  const withdraw = useMutation({
    mutationFn: () => reportsRepo.withdrawClosedReport(placeId),
    onSuccess: invalidate,
  })

  return { hasReported: query.data ?? false, isLoading: query.isPending, report, withdraw }
}
