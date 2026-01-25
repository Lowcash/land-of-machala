import { Beer, Cross, Hammer, Home, Landmark, ShoppingBag, type LucideIcon } from 'lucide-react'

export type View = 'town' | 'smith' | 'bank' | 'healer' | 'tavern' | 'market'

export interface ViewConfig {
  bg: string
  title: string
  icon: LucideIcon
  desc: string
}

export const viewData: Record<View, ViewConfig> = {
  town: {
    bg: '/assets/locations/city-background.jpg',
    title: 'Město Machala',
    icon: Home,
    desc: 'Nacházíš se v centru města <span class="text-[#ffd700]">Machala</span>, pulzujícího srdce obchodu a dobrodružství. Kolem tebe pobíhají kupci, dobrodruzi a místní obyvatelé. Můžeš navštívit <span class="text-[#6fbf6f]">léčitele</span> pro pomoc a léčení, <span class="text-[#ffd700]">zbrojíře</span> pro zbraně a zbroje, nebo <span class="text-[#ffd700]">banku</span> pro uložení cenností. Za městskými hradbami lze <span class="text-[#ff6b6b]">prozkoumat</span> neznámé končiny plné nebezpečí.',
  },
  smith: {
    bg: '/assets/locations/armory-background.jpg',
    title: 'Zbrojíř',
    icon: Hammer,
    desc: 'Vůně kovu a žhavého uhlí naplňuje vzduch v této dílně. Zbrojíř má široký výběr <span class="text-[#ffd700]">zbraní a zbrojí</span> k prodeji. V zadní části dílny můžeš s ním také <span class="text-[#69ccf0]">promluvit</span> o zakázkách a speciálních předmětech. Oheň v dílně plane a kladivo je připravené.',
  },
  bank: {
    bg: '/assets/locations/bank-background.jpg',
    title: 'Banka',
    icon: Landmark,
    desc: 'Masivní <span class="text-[#ffd700]">trezor</span> za pultem vzbuzuje důvěru. Tvé cennosti budou v bezpečí za těmito silnými zdmi. Můžeš zde <span class="text-[#ffd700]">uložit</span> peníze i vzácné předměty, které nepoužíváš. Nebo si své uložené <span class="text-[#ffd700]">zlato</span> zase <span class="text-[#69ccf0]">vybrat</span>. Bankéř na tebe přátelsky pokývne.',
  },
  healer: {
    bg: '/assets/locations/healer-background.jpg',
    title: 'Léčitel',
    icon: Cross,
    desc: 'Bylinková vůně a tichá atmosféra tě okamžitě uklidňují. Léčitel může <span class="text-[#6fbf6f]">uzdravit</span> tvá zranění a prodává účinné <span class="text-[#6fbf6f]">lektvary</span>. Na policích vidíš desítky lahviček s různobarevnými tekutinami. Možná pro tebe má i nějaký zajímavý <span class="text-[#ffd700]">quest</span>.',
  },
  tavern: {
    bg: '/assets/tavern-background.jpg',
    title: 'Taverna',
    icon: Beer,
    desc: 'Hlasitý smích a zvuk cinkajících hrnků naplňuje prostornou tavernu. Za barem stojí hostinský a čepuje pivo pro hladové dobrodruhy.',
  },
  market: {
    bg: '/assets/market-background.jpg',
    title: 'Tržiště',
    icon: ShoppingBag,
    desc: 'Rušné tržiště plné kupců a obchodníků. Můžeš zde najít opravdu cokoliv, pokud máš dost zlata.',
  },
}
