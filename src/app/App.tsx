import './styles/global.css'
import './styles/variables.css'
import { FormOrder } from 'src/components/modules/FormOrder'
import { Footer } from 'src/components/modules/Footer'

function App() {
  return (
    <>
      <main>
        <FormOrder />
      </main>
      <Footer />
    </>
  )
}

export default App
