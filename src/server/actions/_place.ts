import { db } from '@/server/db'

export function get(position: Coordinates) {
  return db.place.findFirst({
    where: { pos_x: position.x, pos_y: position.y },
    include: {
      hospital: true,
      armory: true,
      bank: true,
    },
  })
}
