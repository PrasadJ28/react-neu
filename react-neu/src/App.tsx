import { NeuButton } from './components/Button/Button'
import { NeuTextInput } from './components/TextInput/TextInput'
function App() {

  return (
    <>
    <NeuTextInput
      placeholder="Enter your name"
      variant="pressed"
      color="#f6f5f4"
      intensity={10}
      elevation={2}
    />
    <br/>
      Hello
      <NeuButton variant="flat">Flat</NeuButton>
      <NeuButton variant="convex" >Convex</NeuButton>
      <NeuButton variant="concave" >Concave</NeuButton>
      <NeuButton
        variant="pressed"
        intensity={10}
       shadowintensity={10} 
      >
        Pressed
      </NeuButton>
    </>
  )
}

export default App
