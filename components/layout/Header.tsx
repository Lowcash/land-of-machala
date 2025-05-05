import { H3 } from '@/styles/typography'
import SignOut from '@/components/button/SignOut'
import Coords from '@/components/Coords'

export default function Header() {
  return (
    <header className='h-12 w-full bg-custom-yellow-2'>
      <div className='container mx-auto flex items-center justify-between p-2'>
        <div>
          <H3>Land of Machala</H3>
        </div>
        <div className='flex items-center gap-2'>
          <Coords />
          <SignOut />
        </div>
        {/* <div className='container mx-auto flex justify-between'>
        <div className='flex w-fit items-center gap-1 px-2'>
          <span className='max-w-32 overflow-hidden text-ellipsis whitespace-nowrap'>
            {playerShowQuery.data?.name ?? 'player_name'}
          </span>
          |<span>{playerShowQuery.data?.race.name ?? 'player_race'}</span>|
          <span>{playerShowQuery.data?.class.name ?? 'player_class'}</span>
        </div>
        <div className='flex w-fit items-center gap-1'>
          <div className='flex'>
            <Inventory />
            <Quest />
            <SignOut />
          </div>
        </div>
      </div>
      <div className='container mx-auto flex justify-between'>
        <div className='flex w-fit items-center gap-1 px-2'>
          <span>🦾 {playerShowQuery.data?.strength ?? 'player_strength'}</span>|
          <span>🤸 {playerShowQuery.data?.agility ?? 'player_agility'}</span>|
          <span>🧠 {playerShowQuery.data?.intelligence ?? 'player_intelligence'}</span>|
          <span>
            ⚔️ {playerShowQuery.data?.damage_min ?? 'player_damage_min'} -{' '}
            {playerShowQuery.data?.damage_max ?? 'player_damage_max'}
          </span>
        </div>
        <div className='flex w-fit items-center gap-1 px-2'>
          <span>🎖️ {playerShowQuery.data?.level ?? 'player_level'}</span>
          <span>💰 {new Intl.NumberFormat('cs-CZ').format(playerShowQuery.data?.money ?? 0)}</span>
        </div>
      </div> */}
      </div>
    </header>
  )
}
