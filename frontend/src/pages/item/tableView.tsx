import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import Layout from '../../_helper/layout'
import LoadingSkeleton from '../../_helper/loadingSkeleton'
import { useDeleteItem } from '../../services/item/useDeleteItem'
import { useItemList } from '../../services/item/useItemList'
import { AddModal } from './addModal'
import moment from 'moment'

export default function ListView() {
  const toast = useToast()
  const { data, isLoading } = useItemList()
  const [editData, setEditData] = useState<any>()
  const disclosure = useDisclosure()
  const { onOpen } = disclosure

  const {
    isLoading: deleteIsLoading,
    mutate: deleteItemMutate,
  } = useDeleteItem()

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!isLoading && data?.length === 0) {
    return (
      <>
        <Layout>
          <AddModal
            disclosure={disclosure}
            setEditData={setEditData}
            editData={editData}
          />

          <Alert my={4} status="error">
            <AlertIcon />
            <AlertTitle>No Data Found</AlertTitle>
          </Alert>
        </Layout>
      </>
    )
  }

  return (
    <Layout>
      <AddModal
        disclosure={disclosure}
        setEditData={setEditData}
        editData={editData}
      />

      <TableContainer mt={10}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Created At</Th>
              <Th>Created By</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item: any) => (
              <Tr>
                <Td>{item?._id}</Td>
                <Td>{item?.name}</Td>
                <Td>
                  {moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </Td>
                <Td>{item?.createdBy?.email}</Td>
                <Td>
                  <EditIcon
                    cursor={'pointer'}
                    onClick={() => {
                      setEditData(item)
                      onOpen()
                    }}
                    color="teal.500"
                    marginLeft={4}
                  />

                  <DeleteIcon
                    cursor={'pointer'}
                    onClick={() => {
                      if (!deleteIsLoading) {
                        deleteItemMutate(
                          {
                            _id: item?._id,
                          },
                          {
                            onSuccess: () => {
                              toast({
                                title: `Item update successfully`,
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                              })
                            },
                          },
                        )
                      }
                    }}
                    color="red.500"
                    marginLeft={4}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  )
}
