import * as fs from 'fs';
import * as path from 'path';
import type { PackageJson } from 'type-fest';

export default function readPackageJson() {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const packageJsonString = fs.readFileSync(packageJsonPath, 'utf-8');
  return JSON.parse(packageJsonString) as PackageJson;
}
