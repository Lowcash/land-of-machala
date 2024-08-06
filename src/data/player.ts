'use client'

import { createPlayer } from "@/server/actions/player"
import { useMutation } from "@tanstack/react-query"

export function useCreatePlayerMutation() {
  return useMutation({
    mutationFn: createPlayer
  })
}