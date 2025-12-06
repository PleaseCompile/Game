import { GameProvider } from './context/GameContext';
import { GameBoard } from './components/GameBoard';
import { ActionPanel } from './components/ActionPanel';
import { ActionQueue } from './components/ActionQueue';
import { Notifications } from './components/Notifications';
import { TurnInfo } from './components/TurnInfo';
import { AssetInfoPanel } from './components/AssetInfoPanel';

function App() {
  return (
    <GameProvider>
      <div style={{
        minHeight: '100vh',
        background: '#0a0e27',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          gap: '20px',
        }}>
          {/* Left Column - Main Game Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TurnInfo />
            <GameBoard />
            <Notifications />
          </div>
          
          {/* Right Column - Action Panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ActionPanel />
            <ActionQueue />
            <AssetInfoPanel />
          </div>
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
