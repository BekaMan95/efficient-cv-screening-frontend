import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { config } from "../../config/congig"

/** -----------------------------
 * Create Crew
 * ----------------------------- */
export const useLoginMutation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`${config.baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Failed to create crew")
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crews"] })
      toast.success("Crew created successfully!")
      onSuccessCallback?.()
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create crew")
    },
  })
}

