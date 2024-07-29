import User from "./User";

export default function Header() {
  return (
    <header className='z-40 h-9 w-screen bg-amber-300'>
      <div className='ml-auto w-fit gap-2'><User /></div>
    </header>
  )
}
