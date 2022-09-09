import isDependency from '@/helpers/is-dependency';

export default function isAnyDependency(dependencies: Array<string>) {
  return dependencies.some((dependency) => {
    return isDependency(dependency);
  });
}
