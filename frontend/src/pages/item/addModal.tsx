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
import { useAddNewItem } from '../../services/item/useAddNewItem'
import { useEditItem } from '../../services/item/useUpdateItem'
import { getLocalStorageData } from '../../_helper/localstorage'

export function AddModal({ editData, setEditData, disclosure }: any) {
  const { isOpen, onOpen, onClose } = disclosure
  const finalRef = useRef(null)
  const { isLoading, mutate } = useAddNewItem()
  const { isLoading: editLoading, mutate: editMutate } = useEditItem()
  const [name, setName] = useState('')
  const toast = useToast()
  const user = getLocalStorageData('user')
  const [error, setError] = useState<any>(null)

  const closeModal = () => {
    if (editData) {
      setEditData()
    }
    setError('')
    onClose()
  }

  useEffect(() => {
    setName(editData?.name || '')
  }, [editData])

  const resetFormData = () => {
    setName('')
    setError('')
  }

  const errorCheck = () => {
    if (!name) {
      setError('Item Name must be provided')
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
          name,
        },
        {
          onSuccess: () => {
            resetFormData()
            toast({
              title: `Item update successfully`,
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
          name,
          createdBy: user._id,
        },

        {
          onSuccess: () => {
            resetFormData()
            toast({
              title: `Item created successfully`,
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
      <Flex justifyContent={'flex-end'} alignItems={'center'}>
        <button
          type="button"
          onClick={onOpen}
          className="px-2 pb-1 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white"
        >
          <SmallAddIcon fontSize={20} />
          Add Item
        </button>
      </Flex>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>{!editData ? 'Create' : 'Edit'} Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Input
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                my={2}
                placeholder="Item Name"
              />
            </Box>
          </ModalBody>

          {error ? <p className="px-7 text-red-500">{error}</p> : null}

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
