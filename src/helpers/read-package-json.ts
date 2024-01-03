import * as fs from 'node:fs';

import * as findUp from 'find-up';
import type { PackageJson } from 'type-fest';

export const readPackageJson = () => {
  const packageJsonPath = findUp.sync('package.json');

  if (typeof packageJsonPath === 'undefined') {
    throw new Error('Could not find package.json');
  }

  const packageJsonString = fs.readFileSync(packageJsonPath, 'utf-8');
  return JSON.parse(packageJsonString) as PackageJson;
};
