import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PureReactQuery from './severalReactQueries/pure/PureReactQuery'
import UpgradeReactQuery from './severalReactQueries/upgrade/UpgradeReactQuery'
import MoreUpgradeReactQuery from './severalReactQueries/moreUpgrade/MoreUpgradeReactQuery'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '40px',
        }}
      >
        <PureReactQuery />
        <UpgradeReactQuery />
        <MoreUpgradeReactQuery />
      </div>
    </QueryClientProvider>
  )
}

export default App
