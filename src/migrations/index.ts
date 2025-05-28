import * as migration_20250505_020324 from './20250505_020324';
import * as migration_20250506_050759 from './20250506_050759';
import * as migration_20250510_032444 from './20250510_032444';
import * as migration_20250512_020815 from './20250512_020815';
import * as migration_20250526_175843 from './20250526_175843';
import * as migration_20250527_211742 from './20250527_211742';
import * as migration_20250528_021917 from './20250528_021917';

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
    name: '20250512_020815',
  },
  {
    up: migration_20250526_175843.up,
    down: migration_20250526_175843.down,
    name: '20250526_175843',
  },
  {
    up: migration_20250527_211742.up,
    down: migration_20250527_211742.down,
    name: '20250527_211742',
  },
  {
    up: migration_20250528_021917.up,
    down: migration_20250528_021917.down,
    name: '20250528_021917'
  },
];
