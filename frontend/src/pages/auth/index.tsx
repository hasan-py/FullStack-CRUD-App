import {
  EmailIcon,
  InfoIcon,
  LockIcon,
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
import { useCreateModerator } from '../../services/auth/useCreateUser'
import { useLogin } from '../../services/auth/useLogin'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignup, setIsSignup] = useState(false)

  const {
    isSuccess,
    isLoading: moderatorCreateLoading,
    mutate: moderatorCreateMutate,
  } = useCreateModerator()
  const { isLoading: loginLoading, mutate: loginMutate } = useLogin()

  const errorCheck = () => {
    if (!name && isSignup) {
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

    setError('')
    return false
  }

  const handleShowClick = () => setShowPassword(!showPassword)

  const handleSubmit = () => {
    if (errorCheck()) {
      return
    }

    if (isSignup) {
      moderatorCreateMutate(
        {
          name,
          email,
          password,
        },
        {
          onSuccess: () => {
            setError('')
            setIsSignup(false)
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

  if (moderatorCreateLoading || loginLoading) {
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
          {!isSignup ? 'Login' : 'Create Account'}
        </Heading>

        <Box minW={{ base: '90%', md: '468px' }}>
          <form autoComplete="new-password">
            <Stack rounded={'lg'} spacing={4} p="2rem" boxShadow="lg">
              {!isSignup ? null : (
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<InfoIcon color="gray.300" />}
                    />
                    <Input
                      value={name}
                      type="name"
                      onChange={(e: any) => {
                        setName(e.target.value)
                      }}
                      placeholder="Name"
                      autoComplete="off"
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
                    placeholder="Email"
                    autoComplete="off"
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
                    onChange={(e: any) => {
                      setPassword(e.target.value)
                    }}
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
                {!isSignup ? 'Login' : 'Create'}
              </button>

              <div className="flex justify-center">
                <span
                  className="text-blue-500 cursor-pointer text-center"
                  onClick={() => {
                    setError('')
                    setIsSignup(!isSignup)
                  }}
                >
                  Goto {isSignup ? 'Login' : 'Signup'}
                </span>
              </div>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
