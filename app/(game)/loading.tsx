import { Skeleton } from '@/components/ui/skeleton'
import { HStack, VStack } from '@/components/ui/stack'

export default function Loading() {
  return (
    <VStack fullHeight fullWidth gap="none" bg="black" overflow="hidden">
      {/* Header Skeleton */}
      <VStack border="game-b" bg="black-40" p="md" backdrop>
        <HStack gap="md" align="center">
          <Skeleton width={32} height={32} circle />
          <VStack gap="xs">
            <Skeleton width={200} height={16} />
            <Skeleton width={150} height={12} />
          </VStack>
        </HStack>
      </VStack>

      <VStack flex="1" overflow="hidden" p="md">
        <VStack display="grid" gridCols="1-3-lg" gap="md" fullHeight>
          {/* Main Content Skeleton */}
          <VStack gap="md" _internalClassName="lg:col-span-2">
            <Skeleton width="100%" height={200} />
            <VStack display="grid" gridCols="2" gap="md">
              <Skeleton width="100%" height={150} />
              <Skeleton width="100%" height={150} />
            </VStack>
          </VStack>

          {/* Sidebar Skeleton */}
          <VStack _internalClassName="lg:col-span-1">
            <Skeleton width="100%" height="100%" />
          </VStack>
        </VStack>
      </VStack>

      <VStack border="game-t" bg="black-80" px="md" py="sm">
        <HStack justify="center" gap="lg" fullWidth maxW="lg" _internalClassName="mx-auto">
          <Skeleton width={40} height={40} circle />
          <Skeleton width={40} height={40} circle />
          <Skeleton width={40} height={40} circle />
          <Skeleton width={40} height={40} circle />
          <Skeleton width={40} height={40} circle />
        </HStack>
      </VStack>
    </VStack>
  )
}
