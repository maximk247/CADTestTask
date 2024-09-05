import { InputValues } from './props/BoxForm.interface'
import { Dimensions } from './props/Camera.interface'

export interface AppState {
  vertices: number[]
  indices: number[]
  dimensions: Dimensions
  inputValues: InputValues
  isDarkMode: boolean
}
