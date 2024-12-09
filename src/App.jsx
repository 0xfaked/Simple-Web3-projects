import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig, useConnect, WagmiProvider, useSendTransaction, useAccount, useBalance } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'


const queryClient = new QueryClient()

export const config = createConfig({
  chains: [mainnet,],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})
const fontsize = {
  fontsize: "67 px",
  paddingBottom: "7vh",
  marginTop: "7vh"
}
const containerStyles = {
  display: "flex",
  flexDirection: "column", // Stack elements vertically
  justifyContent: "center", // Center vertically
  alignItems: "center", // Center horizontally
  height: "100vh",
  width: "210vh", // Take full viewport height
  // Optional for better visualization
  
  
};

function App() {


  return(
    
    <div style={containerStyles}> 
    <div style={fontsize}>
  A Simple Ethereum Wallet Adapter Application
</div>
    <WagmiProvider config={config}>
    <QueryClientProvider client = {queryClient}>
    <WalletConnector/>
    <EthSend/>
    <MyAddress/>
    </QueryClientProvider>
    </WagmiProvider>
    </div>
  )
}

function MyAddress(){

  const {address} = useAccount()
  const balance = useBalance({address})

  return <div>
    
    {address}<br></br><br></br>
    {balance?.data?.value}<br></br>
  </div>
    
}
function WalletConnector(){
  const { connectors, connect } = useConnect()

  return  connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
))}<br></br>
function EthSend(){

  const { data: hash, sendTransaction } = useSendTransaction()

  function sendEth(){
    sendTransaction({
      to: document.getElementById("abc").value,
      value: 100000000000000000
    })
  }

  return <div style={containerStyles}>
    <input id='abc' type="text" placeholder='Address...' ></input>
    <button onClick={sendEth}> Send 0.1 Eth </button><br></br>
  </div>
}

export default App;