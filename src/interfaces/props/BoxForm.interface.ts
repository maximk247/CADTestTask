export interface BoxFormProps {
  inputValues: InputValues
  setInputValues: React.Dispatch<React.SetStateAction<InputValues>>
  onFinish: () => void
}

export interface InputValues {
  length: number
  width: number
  height: number
}
