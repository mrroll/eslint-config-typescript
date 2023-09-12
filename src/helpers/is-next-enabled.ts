import isDependency from '@/helpers/is-dependency';
import readPackageJson from '@/helpers/read-package-json';

const disabledPackages = ['@mrroll/next-config'];

export const isNextEnabled = () => {
  const packageJson = readPackageJson();

  if (
    disabledPackages.some((disabledPackage) => {
      disabledPackage === packageJson.name;
    })
  ) {
    return false;
  }

  return isDependency('next');
};
