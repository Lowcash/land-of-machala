import {
  Shield as ShieldIcon,
  Skull,
  Sparkles,
  Swords,
  Target,
  User,
  Wand2,
  Zap,
} from 'lucide-react'

import { ClassId, RaceId } from '@/lib/game/constants/mechanics'

export type Race = RaceId
export type Class = ClassId

export function isCasterClass(id: ClassId | string): boolean {
  return [ClassId.MAGE, ClassId.NECROMANCER].includes(id as ClassId)
}

export function isTankClass(id: ClassId | string): boolean {
  return [ClassId.WARRIOR, ClassId.PALADIN].includes(id as ClassId)
}

export type StoryStep = {
  id: number
  text: string
  choices: {
    text: string
    effect?: { class?: Class; race?: Race }
    nextStep: number | 'end'
  }[]
}

export const storySteps: StoryStep[] = [
  {
    id: 0,
    text: 'Probouzíš se v husté mlze. Nevíš, kdo jsi, ani jak jsi se sem dostal. Před sebou vidíš obrysy tří postav. Která z nich tě nejvíce přitahuje?',
    choices: [
      {
        text: 'Postava v těžké zbroji s velkým mečem',
        effect: { class: ClassId.WARRIOR },
        nextStep: 1,
      },
      {
        text: 'Postava v kápi, kolem které jiskří magie',
        effect: { class: ClassId.MAGE },
        nextStep: 1,
      },
      {
        text: 'Postava ve stínech s dýkami v rukou',
        effect: { class: ClassId.ROGUE },
        nextStep: 1,
      },
    ],
  },
  {
    id: 1,
    text: 'Postava k tobě přistoupí. Cítíš z ní zvláštní energii. Najednou se ozve hlasitý řev z lesa. Jak zareaguješ?',
    choices: [
      {
        text: 'Okamžitě tasíš zbraň a připravíš se k boji',
        effect: { race: RaceId.ORC },
        nextStep: 2,
      },
      {
        text: 'Rychle se schováš a vyhodnotíš situaci',
        effect: { race: RaceId.HALFLING },
        nextStep: 2,
      },
      {
        text: 'Využiješ magii k vytvoření ochranné bariéry',
        effect: { race: RaceId.ELF },
        nextStep: 2,
      },
    ],
  },
  {
    id: 2,
    text: 'Z lesa se vyřítí monstrum. Není čas na přemýšlení. Co je tvou největší předností v boji?',
    choices: [
      {
        text: 'Hrubá síla a odolnost',
        effect: { class: ClassId.WARRIOR, race: RaceId.DWARF },
        nextStep: 'end',
      },
      {
        text: 'Inteligence a znalost magie',
        effect: { class: ClassId.MAGE, race: RaceId.HUMAN },
        nextStep: 'end',
      },
      {
        text: 'Rychlost a přesnost',
        effect: { class: ClassId.RANGER, race: RaceId.ELF },
        nextStep: 'end',
      },
    ],
  },
]

export const races = [
  {
    id: RaceId.HUMAN,
    name: 'Člověk',
    icon: User,
    desc: 'Všestranní a adaptabilní bojovníci. Lidé jsou známí svou vyrovnaností ve všech aspektech boje. Mají dobré zdraví, slušné magické schopnosti a vyvážené bojové vlastnosti. Jejich adaptabilita jim umožňuje ovládnout jakýkoliv styl boje.',
    stats: { hp: 100, mana: 80, strength: 10, intelligence: 8, agility: 10, stamina: 10 },
    bonuses: 'Vyvážené statistiky, +10% rychlejší učení',
  },
  {
    id: RaceId.DWARF,
    name: 'Trpaslík',
    icon: ShieldIcon,
    desc: 'Odolní a silní bojovníci z podzemních hal. Trpaslíci jsou mistři v kovářství a obraně. Jejich robustní těla snesou mnohem více ran než ostatní rasy. Preferují těžkou zbroj a silné zbraně, ale jejich malé nohy jim brání v rychlosti.',
    stats: { hp: 120, mana: 60, strength: 12, intelligence: 5, agility: 7, stamina: 15 },
    bonuses: '+20 HP, +5 Výdrž, +2 Síla, -3 Obratnost',
  },
  {
    id: RaceId.ELF,
    name: 'Elf',
    icon: Zap,
    desc: 'Rychlí a magicky nadaní lesní obyvatelé. Elfové mají vrozenou afinitu k magii a přírodě. Jsou mistři v lukostřelbě a magii živlů. Jejich štíhlé tělo jim dává nepřekonatelnou rychlost, ale jsou křehcí v blízkém boji.',
    stats: { hp: 80, mana: 120, strength: 8, intelligence: 15, agility: 14, stamina: 7 },
    bonuses: '+40 Mana, +7 Inteligence, +4 Obratnost, -20 HP',
  },
  {
    id: RaceId.ORC,
    name: 'Ork',
    icon: Swords,
    desc: 'Brutální síla divočiny. Orkové jsou nejsilnější rasou v blízkém boju. Jejich svaly a zuřivost nemají ve válce konkurenci. Magii považují za slabost a svým těžkopádným pohybům chybí finesa, ale když ork zaútočí, jen málokdo přežije.',
    stats: { hp: 140, mana: 40, strength: 18, intelligence: 3, agility: 6, stamina: 12 },
    bonuses: '+40 HP, +8 Síla, +2 Výdrž, -5 Inteligence',
  },
  {
    id: RaceId.HALFLING,
    name: 'Půlčík',
    icon: Target,
    desc: 'Malí, ale obratní a šikovní. Půlčíci jsou mistři ve vyhýbání se útokům a překvapivém úderu ze stínů. Jejich malá postava a přirozená hbitost z nich dělají vynikající zloděje a záškodníky. Co jim chybí na síle, nahrazují lstí.',
    stats: { hp: 90, mana: 70, strength: 9, intelligence: 7, agility: 16, stamina: 8 },
    bonuses: '+6 Obratnost, vyšší šance na únik a kritický zásah',
  },
  {
    id: RaceId.DRAGONBORN,
    name: 'Dračí rod',
    icon: Sparkles,
    desc: 'Dědicové dračí krve s vyvážených silou. Potomci starověkých draků kombinují sílu, magii i obratnost. Mají vrozenou odolnost vůči magii a schopnost dýchat ohnivým dechem. Jsou vzácní a respektovaní bojovníci.',
    stats: { hp: 110, mana: 100, strength: 13, intelligence: 12, agility: 9, stamina: 11 },
    bonuses: '+10 HP, +20 Mana, +3 Síla, +4 Inteligence, dračí dech',
  },
]

export const classes = [
  {
    id: ClassId.WARRIOR,
    name: 'Válečník',
    icon: Swords,
    desc: 'Mistr blízkého boje a těžké zbroje. Válečníci jsou frontální bojovníci tréninovaní v použití všech zbraní. Zvyšují útok a obranu, což jim umožňuje stát v první linii a přežít i ty nejtvrdší bitvy. Jsou specialisté na fyzický boj.',
    statMod: { strength: +5, stamina: +5, intelligence: 0, agility: 0 },
    bonuses: '+5 Síla, +5 Výdrž, schopnost používat těžké zbroje',
  },
  {
    id: ClassId.PALADIN,
    name: 'Paladin',
    icon: ShieldIcon,
    desc: 'Svatý ochránce s magií a obranou. Paladinové kombinují bojové dovednosti s léčivou a ochrannou magií. Jsou neotřesitelní obránci slabých a využívají světelnou magii k oslabení nepřátel. Jejich zbroj září jako znamení naděje.',
    statMod: { strength: +3, stamina: +8, intelligence: +3, agility: -2 },
    bonuses: '+8 Výdrž, +3 Inteligence, +3 Síla, léčivá magie',
  },
  {
    id: ClassId.ROGUE,
    name: 'Lotr',
    icon: Target,
    desc: 'Rychlý zabiják ze stínů. Lotři jsou mistři nenápadnosti a kritických úderů. Spoléhají na rychlost a přesnost místo hrubé síly. Jejich speciální schopnosti zahrnují útoky ze zálohy, otrávené zbraně a dovednost odemykat zámky.',
    statMod: { strength: +4, stamina: 0, intelligence: 0, agility: +8 },
    bonuses: '+8 Obratnost, +4 Síla, kritické údery, nenápadnost',
  },
  {
    id: ClassId.MAGE,
    name: 'Mág',
    icon: Wand2,
    desc: 'Mistr mystických sil a ničivé magie. Mágové ovládají živelnou magii - oheň, led, blesk. Jejich kouzla dokážou zničit celé skupiny nepřátel. Jsou však fyzicky slabí a musí udržovat odstup od nepřátel. Studiem získávají nová mocnější kouzla.',
    statMod: { strength: 0, stamina: -2, intelligence: +12, agility: +2 },
    bonuses: '+12 Inteligence, +2 Obratnost, ničivá kouzla, -2 Výdrž',
  },
  {
    id: ClassId.RANGER,
    name: 'Hraničář',
    icon: Zap,
    desc: 'Lučištník a stopař divočiny. Hraničáři jsou spojení s přírodou a ovládají boj na dálku. Jejich lukostřelba je smrtící přesná a dokážou stopovat jakoukoliv kořist. Kombinují fyzický útok s přírodní magií a schopností ovládat zvířata.',
    statMod: { strength: +6, stamina: +2, intelligence: 0, agility: +6 },
    bonuses: '+6 Síla, +6 Obratnost, +2 Výdrž, boj na dálku',
  },
  {
    id: ClassId.NECROMANCER,
    name: 'Nekromant',
    icon: Skull,
    desc: 'Temný kouzelník ovládající smrt. Nekromanti manipulují se smrtí a nemrtvými. Dokážou oživovat mrtvoly jako své služebníky a vysávat životní sílu z nepřátel. Jejich temná magie je mocná, ale společnost je často odsuzuje. Ovládají kletby a stínovou magii.',
    statMod: { strength: 0, stamina: 0, intelligence: +10, agility: +3 },
    bonuses: '+10 Inteligence, +3 Obratnost, oživování nemrtvých, vysávání života',
  },
]

export const RANDOM_NAMES = [
  'Aragorn',
  'Theron',
  'Kael',
  'Elara',
  'Dorian',
  'Lyssa',
  'Brennan',
  'Seraphina',
  'Cedric',
  'Isolde',
  'Magnus',
  'Rowena',
] as const
