import { Skeleton, Stack } from '@chakra-ui/react'

export default function LoadingSkeleton() {
  return (
    <div>
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </div>
  )
}
