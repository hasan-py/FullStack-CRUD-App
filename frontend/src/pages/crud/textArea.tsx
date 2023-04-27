import { Textarea } from '@chakra-ui/react'

export function TextAreaInput({ value, setValue, placeholder }: any) {
  let handleInputChange = (e: any) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
  return (
    <>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder || 'Here is a sample placeholder'}
        size="sm"
        className="text-white"
        variant="flushed"
        borderColor={'gray.700'}
      />
    </>
  )
}
