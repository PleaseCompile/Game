// GameBoard - Network visualization using Konva
import { Stage, Layer, Circle, Line, Text, Rect, Group } from 'react-konva';
import { useGame } from '../context/GameContext';
import { Asset } from '../game/gameState';

export function GameBoard() {
  const { state, selectAsset } = useGame();
  const { assets, selectedAssetId } = state;
  
  const getAssetColor = (asset: Asset): string => {
    if (asset.status === 'COMPROMISED') return '#F44336'; // Red
    if (asset.status === 'DENIED') return '#9E9E9E'; // Gray
    return '#4CAF50'; // Green (SAFE)
  };
  
  const getAssetStrokeColor = (asset: Asset): string => {
    if (asset.id === selectedAssetId) return '#2196F3'; // Blue border for selected
    return '#333';
  };
  
  const handleAssetClick = (assetId: string) => {
    selectAsset(assetId === selectedAssetId ? undefined : assetId);
  };
  
  return (
    <div style={{
      background: '#1a1a2e',
      borderRadius: '8px',
      padding: '20px',
      height: '600px',
    }}>
      <Stage width={900} height={560}>
        <Layer>
          {/* Draw connections */}
          {assets.map(asset => 
            asset.connectedTo.map(targetId => {
              const target = assets.find(a => a.id === targetId);
              if (!target) return null;
              
              return (
                <Line
                  key={`${asset.id}-${targetId}`}
                  points={[
                    asset.position.x,
                    asset.position.y,
                    target.position.x,
                    target.position.y,
                  ]}
                  stroke="#444"
                  strokeWidth={2}
                  dash={[10, 5]}
                />
              );
            })
          )}
          
          {/* Draw assets */}
          {assets.map(asset => {
            // Blue Team always sees all assets, Red only sees discovered ones
            const isVisible = true; // Player is always Blue Team, so show all assets
            
            if (!isVisible) return null;
            
            return (
              <Group
                key={asset.id}
                onClick={() => handleAssetClick(asset.id)}
                onTap={() => handleAssetClick(asset.id)}
              >
                {/* Asset circle */}
                <Circle
                  x={asset.position.x}
                  y={asset.position.y}
                  radius={40}
                  fill={getAssetColor(asset)}
                  stroke={getAssetStrokeColor(asset)}
                  strokeWidth={asset.id === selectedAssetId ? 4 : 2}
                  shadowBlur={10}
                  shadowColor={getAssetColor(asset)}
                  shadowOpacity={0.5}
                />
                
                {/* Critical star indicator */}
                {asset.isCritical && (
                  <Text
                    x={asset.position.x - 10}
                    y={asset.position.y - 40}
                    text="⭐"
                    fontSize={20}
                  />
                )}
                
                {/* Asset name */}
                <Text
                  x={asset.position.x - 50}
                  y={asset.position.y + 50}
                  text={asset.name}
                  fontSize={12}
                  fill="#ffffff"
                  width={100}
                  align="center"
                />
                
                {/* Vulnerability count */}
                {asset.vulnerabilities.length > 0 && (
                  <Rect
                    x={asset.position.x + 25}
                    y={asset.position.y - 35}
                    width={30}
                    height={20}
                    fill="#ff6b6b"
                    cornerRadius={4}
                  />
                )}
                {asset.vulnerabilities.length > 0 && (
                  <Text
                    x={asset.position.x + 25}
                    y={asset.position.y - 32}
                    text={`🐛${asset.vulnerabilities.length}`}
                    fontSize={12}
                    fill="#ffffff"
                    width={30}
                    align="center"
                  />
                )}
                
                {/* Control icons */}
                {asset.controls.some(c => c.type === 'FIREWALL') && (
                  <Text
                    x={asset.position.x - 40}
                    y={asset.position.y - 10}
                    text="🛡️"
                    fontSize={16}
                  />
                )}
                
                {asset.controls.some(c => c.type === 'IDS') && (
                  <Text
                    x={asset.position.x - 40}
                    y={asset.position.y + 10}
                    text="🔍"
                    fontSize={16}
                  />
                )}
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
