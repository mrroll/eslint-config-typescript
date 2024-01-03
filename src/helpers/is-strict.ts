import { match } from 'ts-pattern';
import ts from 'typescript';

export const isStrict = (): boolean => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const configFileName = ts.findConfigFile(process.cwd(), ts.sys.fileExists);

  if (typeof configFileName === 'undefined') {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);

  const compilerOptions = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    process.cwd(),
  );

  return match({
    strict: compilerOptions.options.strict,
    strictNullChecks: compilerOptions.options.strictNullChecks,
  })
    .with({ strict: true }, { strictNullChecks: true }, () => true)
    .with({ strict: undefined }, { strictNullChecks: undefined }, () => false)
    .otherwise(() => false);
};
