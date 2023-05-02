import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
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
import moment from 'moment'
import { useState } from 'react'
import Layout from '../../_helper/layout'
import LoadingSkeleton from '../../_helper/loadingSkeleton'
import { useDeleteItem } from '../../services/item/useDeleteItem'
import { useItemList } from '../../services/item/useItemList'
import { AddModal } from './addModal'

export default function ListView() {
  const toast = useToast()
  const { data, isLoading } = useItemList()
  const [editData, setEditData] = useState<any>()
  const disclosure = useDisclosure()
  const { onOpen } = disclosure
  const [searchWord, setSearchWord] = useState<string>('')

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

  const globalSearch = () => {
    const filteredRepositories = data?.filter((value: any) => {
      return value?.name?.toLowerCase().includes(searchWord?.toLowerCase())
    })
    return filteredRepositories?.sort((a: any, b: any) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
    )
  }

  const filterDataList = searchWord ? globalSearch() : data

  return (
    <Layout>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <InputGroup>
            <Input
              value={searchWord}
              onChange={(e: any) => setSearchWord(e.target.value)}
              my={2}
              placeholder="Search by name..."
            />
            <InputRightElement mt={2} children={<SearchIcon />} />
          </InputGroup>
        </Box>

        <AddModal
          disclosure={disclosure}
          setEditData={setEditData}
          editData={editData}
        />
      </Flex>

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
            {filterDataList?.map((item: any, key: number) => (
              <Tr key={key}>
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
