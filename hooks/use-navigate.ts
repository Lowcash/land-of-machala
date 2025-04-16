import { useRouter } from 'next/navigation'

export function useNavigate() {
  const router = useRouter()

  return {
    navigate: (url?: string) => {
      if (!!url) router.replace(url)
      router.refresh()
    },
  }
}
