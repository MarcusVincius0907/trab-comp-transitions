import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function syncReadFile(filename: string) {
  const result = readFileSync(join(process.cwd(), filename), 'utf-8');

  return result;
}
