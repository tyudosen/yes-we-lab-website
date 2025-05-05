import * as migration_20250505_020324 from './20250505_020324';

export const migrations = [
  {
    up: migration_20250505_020324.up,
    down: migration_20250505_020324.down,
    name: '20250505_020324'
  },
];
