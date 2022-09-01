import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  joinPathFragments,
} from '@nrwl/devkit';

interface NewEnvSchemaOptions {}

export default async function (tree: Tree, schema: NewEnvSchemaOptions) {
  generateFiles(
    // virtual file system
    tree,

    // the location where the template files are
    joinPathFragments(__dirname, './files'),

    // where the files should be generated
    './',

    // the variables to be substituted in the template
    {
      template: '',
    }
  );

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
