import { Object3DNode } from '@react-three/fiber'
import { Text as DreiText } from '@react-three/drei'

declare module '@react-three/fiber' {
  interface ThreeElements {
    text: Object3DNode<DreiText, typeof DreiText>
  }
}

declare module '@react-three/drei' {
  export interface TextProps {
    'material-transparent'?: boolean;
  }
} 