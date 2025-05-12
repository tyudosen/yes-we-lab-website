import * as migration_20250505_020324 from './20250505_020324';
import * as migration_20250506_050759 from './20250506_050759';
import * as migration_20250510_032444 from './20250510_032444';
import * as migration_20250512_020815 from './20250512_020815';

export const migrations = [
  {
    up: migration_20250505_020324.up,
    down: migration_20250505_020324.down,
    name: '20250505_020324',
  },
  {
    up: migration_20250506_050759.up,
    down: migration_20250506_050759.down,
    name: '20250506_050759',
  },
  {
    up: migration_20250510_032444.up,
    down: migration_20250510_032444.down,
    name: '20250510_032444',
  },
  {
    up: migration_20250512_020815.up,
    down: migration_20250512_020815.down,
    name: '20250512_020815'
  },
];
