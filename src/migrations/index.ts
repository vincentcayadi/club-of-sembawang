import * as migration_20260105_032015 from './20260105_032015';

export const migrations = [
  {
    up: migration_20260105_032015.up,
    down: migration_20260105_032015.down,
    name: '20260105_032015'
  },
];
