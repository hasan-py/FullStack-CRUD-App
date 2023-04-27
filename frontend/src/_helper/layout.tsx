import { Container } from '@chakra-ui/react'
import { Navber } from './navber'

export default function Layout(props: any) {
  return (
    <>
      <Navber />

      <Container
        mt={{ base: 16, lg: 28 }}
        maxW={props?.maxWid || '1280px'}
        maxH={'100%'}
        minH={'100vh'}
      >
        {props.children}
      </Container>
    </>
  )
}
