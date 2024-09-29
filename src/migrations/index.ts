import * as migration_20240928_101518_initial from './20240928_101518_initial';
import * as migration_20240928_101602_initial from './20240928_101602_initial';
import * as migration_20240929_104404 from './20240929_104404';

export const migrations = [
  {
    up: migration_20240928_101518_initial.up,
    down: migration_20240928_101518_initial.down,
    name: '20240928_101518_initial',
  },
  {
    up: migration_20240928_101602_initial.up,
    down: migration_20240928_101602_initial.down,
    name: '20240928_101602_initial',
  },
  {
    up: migration_20240929_104404.up,
    down: migration_20240929_104404.down,
    name: '20240929_104404'
  },
];
