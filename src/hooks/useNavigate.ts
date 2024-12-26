import { useRouter } from 'next/navigation'

export default function useNavigate() {
  const router = useRouter()

  return (url?: string) => {
    if (!!url) router.replace(url)
    router.refresh()
  }
}