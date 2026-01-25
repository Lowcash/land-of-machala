'use client'

import { GameFooter, GameHeader } from '@/components/features/Game'
import { SplitLayout } from '@/components/layout'
import { PageLayout } from '@/components/layout/PageLayout'
import { ScrollText } from 'lucide-react'
import { useState } from 'react'
import { QuestDetailContent } from './Detail/QuestDetailContent'
import { QuestList } from './List/QuestList'
import type { MergedQuest } from './Shared/types'

interface QuestClientProps {
  quests: MergedQuest[]
  characterId: string
}

export function QuestClient({ quests, characterId }: QuestClientProps) {
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null)

  const selectedQuest = quests.find((q) => q.id === selectedQuestId) || null

  return (
    <PageLayout
      header={<GameHeader title="Deník úkolů" icon={ScrollText} />}
      footer={<GameFooter />}
      backgroundImage="/assets/locations/forest.jpg"
      showInfoLog={false}
    >
      <SplitLayout
        asideWidth="lg"
        hideMobileAside={!selectedQuestId}
        main={
          <div className="flex h-full">
            {/* Note: Quest UI is a bit different, QuestList IS the sidebar usually? 
                 Let's check original. Original probably put QuestList in main?
                 Wait, QuestList is a sidebar-like list, and Detail is the main content?
                 Or SplitView matches: Main (List) | Aside (Detail)?
                 Usually for SplitView: Main is the master (left/top), Aside is detail (right).
                 But in SplitView implementation:
                 Main is flex-1 (takes remaining space)
                 Aside is fixed width (right side)
                 So if we want List on Left and Detail on Right, 
                 we should put List in ... wait.
                 If Main is flex-1, it takes the space.
                 If we want a sidebar on the LEFT, SplitView (as implemented) puts Aside on RIGHT.
                 
                 Checking QuestList implementation... it has `w-80 lg:w-96` styles.
                 It seems QuestList is designed as a sidebar itself.
                 
                 If we put QuestList in `main`, it will stretch? 
                 QuestList has `w-full md:w-80` classes.
                 
                 Let's stick to the pattern:
                 SplitLayout puts `main` on left (flex-1) and `aside` on right.
                 
                 Do we want List | Detail?
                 Or Detail | List?
                 
                 The original code likely used SplitView.
                 If I replace it directly, expected behavior is Main|Aside.
                 
                 If QuestList is the "list", it should probably be on the left?
                 But SplitLayout enforces Aside on Right.
                 
                 If existing design used SplitView, then likely List was in Main and Detail in Aside?
                 Or maybe List was Aside?
                 
                 Let's assume standard master-detail:
                 Left: List
                 Right: Detail
                 
                 BUT SplitLayout logic:
                 <div className="flex ...">
                   <div className="flex-1 ...">{main}</div>
                   <aside ...>{aside}</aside>
                 </div>
                 
                 So Main is Left, Aside is Right.
                 So Main = List, Aside = Detail.
                 
                 Wait, if Main takes flex-1, it fills the width.
                 If QuestList has fixed width, it will look weird in Main?
                 Ah, looking at QuestList.tsx in Step 145:
                 `className={\`... md:w-80 lg:w-96\`}`
                 It has fixed width on desktop!
                 
                 If we put it in Main (which is flex-1), it will just take its width 
                 and leave empty space if container is wider?
                 
                 Actually, maybe we want:
                 Main = Detail (flex-1)
                 Aside = List (fixed width)?
                 
                 If we switch them, then List is on the RIGHT.
                 
                 Does existing PageTemplate/SplitView allow Left Sidebar?
                 No, SplitLayout hardcodes Aside after Main.
                 
                 However, maybe I should just execute the replacement as it was designated.
                 The user just wants imports fixed.
              */}
            <QuestList
              quests={quests}
              selectedQuest={selectedQuestId}
              onSelectQuestAction={setSelectedQuestId}
            />
            {/* We need a container for the detail view if it's not the aside? 
              Actually, if QuestList is the Master, and we want it on Left.
              We might need a different layout for Quests if SplitLayout is rigid.
              
              But I am just updating imports here. I will assume the previous usage worked or 
              I will follow the `SplitLayout` signature.
              
              Original code (grep): 
              `return <PageTemplate ...> <SplitView main={<QuestList .../>} aside={<QuestDetailContent .../>} />`
              
              So I will replicate that structure.
          */}
          </div>
        }
        aside={
          selectedQuest ? (
            <QuestDetailContent quest={selectedQuest} characterId={characterId} />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-[#8b7355] italic">
              Vyber quest ze seznamu pro zobrazení detailů.
            </div>
          )
        }
      />
    </PageLayout>
  )
}
