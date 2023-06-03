import './styles/global.css'
import './styles/variables.css'
import { FormOrder } from 'src/components/modules/FormOrder'
import { Footer } from 'src/components/modules/Footer'
import { OrderCalculationData } from 'src/service/orderCalc/OrderCalculationData'

function App() {
  console.log(new OrderCalculationData())
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
