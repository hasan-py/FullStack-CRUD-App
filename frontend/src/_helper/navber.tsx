import { Box, ButtonGroup, Flex, HStack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getLocalStorageData, setLocalStorageData } from './localstorage'

export const Navber = () => {
  const navigate = useNavigate()
  const token = getLocalStorageData('token')

  return (
    <Box w="full" as="section" pb={4}>
      <Box
        w="full"
        zIndex={999}
        backgroundColor={'#141416'}
        position="fixed"
        top={0}
        as="nav"
        bg="bg-surface"
        px={{ base: '4', lg: '16' }}
        py={{ base: '4', lg: '5' }}
        className="border-b border-gray-700"
      >
        <HStack justify="space-between">
          <Flex justify="space-between" flex="1">
            <Text
              onClick={() => {
                if (token) {
                  navigate('/')
                } else {
                  navigate('/')
                }
              }}
              fontSize="2xl"
              fontWeight={700}
              cursor={'pointer'}
            >
              <span className="text-red-500">CRUD App</span>
            </Text>

            {token ? (
              <>
                <ButtonGroup variant="link" spacing="8">
                  <button
                    onClick={() => {
                      setLocalStorageData('token', '')
                      navigate('/login')
                    }}
                    className="px-8 pb-1 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </ButtonGroup>
              </>
            ) : (
              <ButtonGroup variant="link" spacing="8">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/login')
                  }}
                  className="px-8 pb-1 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white"
                >
                  Login
                </button>
              </ButtonGroup>
            )}
          </Flex>
        </HStack>
      </Box>
    </Box>
  )
}
