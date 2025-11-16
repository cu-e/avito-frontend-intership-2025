import { Text } from '@gravity-ui/uikit';

type Characteristics = Record<string, string>;

type CharacteristicsListProps = {
  characteristics?: Characteristics;
};

function CharacteristicsList({ characteristics }: CharacteristicsListProps) {
  if (!characteristics) return null;

  const entries = Object.entries(characteristics);
  if (!entries.length) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {entries.map(([name, value]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <Text variant="body-2" color="secondary">
            {name}
          </Text>
          <Text variant="body-2" style={{ textAlign: 'right' }}>
            {value}
          </Text>
        </div>
      ))}
    </div>
  );
}

export default CharacteristicsList;
