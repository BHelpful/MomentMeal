import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  joinPathFragments,
} from '@nrwl/devkit';

interface NewArticleSchemaOptions {
  db_uri: string;
  test_db_uri: string;
}

export default async function (tree: Tree, schema: NewArticleSchemaOptions) {
  generateFiles(
    // virtual file system
    tree,

    // the location where the template files are
    joinPathFragments(__dirname, './files'),

    // where the files should be generated
    './',

    // the variables to be substituted in the template
    {
      db_uri: schema.db_uri,
      test_db_uri: schema.test_db_uri,

      template: '',
    }
  );

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
