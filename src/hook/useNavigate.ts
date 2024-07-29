import { useRouter } from 'next/navigation'

export default function useNavigate() {
  const router = useRouter()

  return (url: string) => { 
    router.replace(url)
    router.refresh()
  }
}