import { readPackageJson } from '@/helpers/read-package-json';

export const isDependency = (dependency: string) => {
  const packageJson = readPackageJson();
  const { dependencies, devDependencies } = packageJson;

  return [dependencies, devDependencies].some((dependencyList) => {
    if (dependencyList === undefined) {
      return false;
    }

    return dependency in dependencyList;
  });
};
