import { useQuery } from "@tanstack/react-query"
import { config } from "../../config/congig";

export const useJobsQuery = (
  page: number,
  per_page: number,
  sort: { field: string; sort: "asc" | "desc" }[],
  search?: string,
  filters: {
    column_field: string
    operator_value: string
    value: string
  }[] = [],
  link_op = "AND",
) => {
  return useQuery<any>({
    queryKey: ["jobs", { page, per_page, search, sort, filters, link_op }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString(),
        sort: JSON.stringify(sort),
        link_op,
      })

      if (search) {
        params.append("search", search)
      }

      if (filters.length > 0) {
        params.append("filter", JSON.stringify(filters))
      }

      const res = await fetch(
        `${config.baseUrl}/units?${params.toString()}`,
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Failed to fetch units")
      }

      return res.json()
    },
    retry: 1,
    placeholderData: (previousData:any) => previousData,
  })
}
