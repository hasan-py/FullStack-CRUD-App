import { Avatar, Box, ButtonGroup, Flex, HStack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getLocalStorageData, setLocalStorageData } from './localstorage'

export const Navber = () => {
  const navigate = useNavigate()
  const token = getLocalStorageData('token')
  const user = getLocalStorageData('user')

  return (
    <Box w="full" as="section">
      <Box
        w="full"
        zIndex={999}
        position="fixed"
        top={0}
        as="nav"
        bg="bg-surface"
        px={{ base: '4', lg: '16' }}
        py={{ base: '4', lg: '4' }}
        className="border-b border-gray-200 bg-white"
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

            {token && user ? (
              <>
                <Flex>
                  <Flex alignItems={'center'} mr={4}>
                    <Avatar size="xs" mr={1} />
                    <span className="font-semibold">{user.name}</span>
                  </Flex>

                  <ButtonGroup variant="link" spacing="8">
                    <button
                      onClick={() => {
                        setLocalStorageData('token', '')
                        setLocalStorageData('user', '')
                        navigate('/login')
                      }}
                      className="px-8 pb-1 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white"
                    >
                      Logout
                    </button>
                  </ButtonGroup>
                </Flex>
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
