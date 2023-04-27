import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Card,
  Flex,
  Image,
  TableContainer,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import Layout from '../../_helper/layout'
import LoadingSkeleton from '../../_helper/loadingSkeleton'
import { useDeleteGame } from '../../services/crud/useDeleteGame'
import { useGameList } from '../../services/crud/useGameList'
import { useEditGame } from '../../services/crud/useUpdateGame'
import { AddModal } from './addModal'

export default function ListView() {
  const toast = useToast()
  const { data, isLoading } = useGameList()
  const [editData, setEditData] = useState<any>()
  const disclosure = useDisclosure()
  const { onOpen } = disclosure

  const {
    isLoading: deleteReviewLoading,
    mutate: deleteReviewMutate,
  } = useEditGame()

  const {
    isLoading: deleteIsLoading,
    mutate: deleteGameMutate,
  } = useDeleteGame()

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

      <TableContainer>
        <div className="text-gray-300">
          {data?.map((item: any) => (
            <Card bg="gray.900" my={4} rounded={'none'} px={8} py={4}>
              <div className="text-gray-300">
                <div>
                  <Flex alignItems={'center'}>
                    <Flex alignItems={'center'}>
                      <Image
                        objectFit="cover"
                        width={24}
                        height={24}
                        marginRight={2}
                        rounded={'md'}
                        src={
                          item?.gameImage ||
                          'https://cdn.mos.cms.futurecdn.net/jSAqsHHfjKpGqDfvG5Ccqe-1200-80.jpg.webp'
                        }
                        alt={'Game Image'}
                      />

                      <div>
                        <p className="text-lg">{item?.gameName}</p>
                        <p>{item?.gameDescription}</p>
                      </div>
                    </Flex>

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
                          deleteGameMutate(
                            {
                              _id: item?._id,
                            },
                            {
                              onSuccess: () => {
                                toast({
                                  title: `Game update successfully`,
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
                  </Flex>
                </div>
              </div>

              <div>
                {item?.reviews?.length === 0 ? (
                  <div>
                    <div className="text-gray-300 my-4">No Reviews</div>
                  </div>
                ) : null}

                {item?.reviews?.map((comment: any) => (
                  <div className="my-4 text-gray-300">
                    <div>
                      <Flex alignItems={'flex-start'}>{comment.username}</Flex>
                      <Text color="gray.500">{comment?.text}</Text>
                    </div>
                    <div>{comment.email}</div>

                    <div className="flex">
                      <div>
                        <Flex alignItems={'center'}>
                          {[...Array(Math.floor(comment.rating))]?.map((_) => (
                            <StarIcon mx={'2px'} color="#f59e0b" />
                          ))}
                          <Text marginLeft={2}>
                            {comment.rating?.toFixed(2)}
                          </Text>
                        </Flex>
                      </div>

                      <div>
                        {' '}
                        <DeleteIcon
                          cursor={'pointer'}
                          onClick={() => {
                            if (!deleteReviewLoading) {
                              deleteReviewMutate(
                                {
                                  _id: item?._id,
                                  review: {
                                    _id: comment?._id,
                                    isDeleted: true,
                                  },
                                },
                                {
                                  onSuccess: () => {
                                    toast({
                                      title: `Review deleted successfully`,
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </TableContainer>
    </Layout>
  )
}
