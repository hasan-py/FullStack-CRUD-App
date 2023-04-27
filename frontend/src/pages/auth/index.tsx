import {
  EmailIcon,
  LockIcon,
  MinusIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons'
import {
  Box,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheckModeratorCreate } from '../../services/auth/useCheckModeratorCreate'
import { useCreateModerator } from '../../services/auth/useCreateModerator'
import { useLogin } from '../../services/auth/useLogin'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {
    data,
    isLoading: checkModeratorCreateLoading,
  } = useCheckModeratorCreate()
  const {
    isSuccess,
    isLoading: moderatorCreateLoading,
    mutate: moderatorCreateMutate,
  } = useCreateModerator()
  const { isLoading: loginLoading, mutate: loginMutate } = useLogin()

  const errorCheck = () => {
    if (!name && !data?.userExists) {
      setError('Name must be provided')
      return true
    }
    if (!email) {
      setError('Email must be provided')
      return true
    }
    if (!password) {
      setError('Password must be provided')
      return true
    }

    return false
  }

  const handleShowClick = () => setShowPassword(!showPassword)

  const handleSubmit = () => {
    if (errorCheck()) {
      return
    }

    if (!data?.userExists) {
      moderatorCreateMutate(
        {
          name,
          email,
          password,
        },
        {
          onSuccess: () => {
            setError('')
          },
        },
      )
    } else {
      // login here!
      loginMutate(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            setError('')
          },
        },
      )
    }
  }

  if (checkModeratorCreateLoading) {
    return (
      <Flex w="full" h="100vh" alignItems={'center'} justifyContent={'center'}>
        <Spinner color="red.500" />
      </Flex>
    )
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size={'lg'} color="red.400">
          {data?.userExists ? 'Login' : 'Create Account'}
        </Heading>

        <Box minW={{ base: '90%', md: '468px' }}>
          <form>
            <Stack rounded={'lg'} spacing={4} p="1rem" boxShadow="lg">
              {data?.userExists ? null : (
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MinusIcon color="gray.300" />}
                    />
                    <Input
                      value={name}
                      type="name"
                      onChange={(e: any) => {
                        setName(e.target.value)
                      }}
                      placeholder="Name"
                      autoComplete="off"
                      variant={'flushed'}
                      borderColor={'gray.700'}
                      className="text-white"
                    />
                  </InputGroup>
                </FormControl>
              )}

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.300" />}
                  />
                  <Input
                    value={email}
                    onChange={(e: any) => {
                      setEmail(e.target.value)
                    }}
                    type="email"
                    variant={'flushed'}
                    placeholder="Email"
                    autoComplete="off"
                    borderColor={'gray.700'}
                    className="text-white"
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<LockIcon color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    variant={'flushed'}
                    onChange={(e: any) => {
                      setPassword(e.target.value)
                    }}
                    borderColor={'gray.700'}
                    className="text-white"
                  />

                  <InputRightElement width="4.5rem" onClick={handleShowClick}>
                    {showPassword ? (
                      <ViewIcon color="gray.500" cursor={'pointer'} />
                    ) : (
                      <ViewOffIcon color="gray.500" cursor={'pointer'} />
                    )}
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {error ? <p className="my-2 text-red-500">{error}</p> : null}

              {isSuccess ? (
                <p className="my-2 text-green-500">
                  {'Account created! please login!'}
                </p>
              ) : null}

              <button
                type="button"
                disabled={loginLoading || moderatorCreateLoading}
                onClick={handleSubmit}
                className="px-8 p-2 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white"
              >
                {data?.userExists ? 'Login' : 'Create'}
              </button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
