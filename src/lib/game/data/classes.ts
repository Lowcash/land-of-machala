import classesData from './classes.json'

export interface ClassInfo {
  id: string
  nameKey: string
}

export const CLASSES = classesData as ClassInfo[]
