import { SmallAddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useAddNewGame } from '../../services/crud/useAddNewGame'
import { useEditGame } from '../../services/crud/useUpdateGame'
import { TextAreaInput } from './textArea'

export function AddModal({ editData, setEditData, disclosure }: any) {
  const { isOpen, onOpen, onClose } = disclosure
  const finalRef = useRef(null)
  const { isLoading, mutate } = useAddNewGame()
  const { isLoading: editLoading, mutate: editMutate } = useEditGame()
  const [gameDescription, setGameDescription] = useState('')
  const [gameImage, setGameImage] = useState('')
  const [gameName, setGameName] = useState('')
  const toast = useToast()

  const [error, setError] = useState<any>(null)

  const closeModal = () => {
    if (editData) {
      setEditData()
    }
    setError('')
    onClose()
  }

  useEffect(() => {
    setGameDescription(editData?.gameDescription || '')
    setGameImage(editData?.gameImage || '')
    setGameName(editData?.gameName || '')
  }, [editData])

  const resetFormData = () => {
    setGameDescription('')
    setGameImage('')
    setGameName('')
    setError('')
  }

  const errorCheck = () => {
    if (!gameName) {
      setError('Game Name must be provided')
      return true
    }
    if (!gameImage) {
      setError('Game Image url must be provided')
      return true
    }

    if (!gameDescription) {
      setError('Description must be provided')
      return true
    }
    return false
  }

  const submitHandler = () => {
    if (errorCheck()) {
      return
    }

    if (editData) {
      editMutate(
        {
          _id: editData?._id,
          gameName,
          gameDescription,
          gameImage,
        },
        {
          onSuccess: () => {
            resetFormData()
            toast({
              title: `Game update successfully`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
            closeModal()
          },
          onError: (err: any) => {
            toast({
              title: err?.response?.data?.error || 'Something went wrong',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
          },
        },
      )
    } else {
      mutate(
        {
          gameName,
          gameDescription,
          gameImage,
        },

        {
          onSuccess: () => {
            resetFormData()
            toast({
              title: `Game created successfully`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
            closeModal()
          },
          onError: (err: any) => {
            toast({
              title: err?.response?.data?.error || 'Something went wrong',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
          },
        },
      )
    }
  }

  return (
    <>
      <Flex justifyContent={'flex-end'} alignItems={'center'} mb={2}>
        <button
          type="button"
          onClick={onOpen}
          className="px-2 pb-1 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white"
        >
          <SmallAddIcon fontSize={20} />
          Add Game
        </button>
      </Flex>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent bg="black">
          <ModalHeader className="text-gray-100">
            {!editData ? 'Create' : 'Edit'} Game
          </ModalHeader>
          <ModalCloseButton className="text-gray-200" />
          <ModalBody>
            <Box>
              <Input
                value={gameName}
                onChange={(e: any) => setGameName(e.target.value)}
                my={2}
                placeholder="Game Name"
                variant={'flushed'}
                borderColor={'gray.700'}
                color="white"
              />
              <Input
                value={gameImage}
                onChange={(e: any) => setGameImage(e.target.value)}
                mt={2}
                mb={4}
                placeholder="Game Image (URL Only)"
                variant={'flushed'}
                borderColor={'gray.700'}
                color="white"
              />
              <TextAreaInput
                value={gameDescription}
                setValue={setGameDescription}
                placeholder="Game description..."
              />
            </Box>
          </ModalBody>

          {error ? <p className="my-4 px-6 text-red-500">{error}</p> : null}

          <ModalFooter>
            <Button
              type="button"
              onClick={submitHandler}
              size="sm"
              rounded={'none'}
              mx={1}
              disabled={isLoading || editLoading}
              colorScheme="green"
            >
              Save
            </Button>
            <Button
              size="sm"
              color={'white'}
              mx={1}
              rounded={'none'}
              variant={'outline'}
              mr={3}
              onClick={closeModal}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
