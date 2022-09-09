import semver from 'semver';
import isDependency from '@/helpers/is-dependency';
import readPackageJson from '@/helpers/read-package-json';

export default function getDependencyVersion(dependency: string) {
  if (isDependency(dependency) === false) {
    throw new Error(`+++ ERROR: ${dependency} was not found in package.json.`);
  }

  const { dependencies, devDependencies } = readPackageJson();

  const dependencyVersion = dependencies?.[dependency];
  const devDependencyVersion = devDependencies?.[dependency];

  if (dependencyVersion === undefined && devDependencyVersion === undefined) {
    throw new Error(
      `+++ ERROR: ${dependency}'s version could not be determined from package.json.`
    );
  }

  const versionRaw = (dependencyVersion || devDependencyVersion) as string;

  const versionClean = semver.coerce(versionRaw);

  if (versionClean === null) {
    throw new Error(
      `+++ ERROR: ${dependency}'s version could not be determined from package.json.`
    );
  }

  return versionClean.raw;
}
