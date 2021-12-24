import {
	Tree,
	formatFiles,
	installPackagesTask,
	generateFiles,
	joinPathFragments,
} from '@nrwl/devkit';

interface NewArticleSchemaOptions {
	mpapi_port: string;
	mpapi_host: string;
	mpapi_db_uri: string;
	mp_mpapi_uri: string;
	mpapi_salt_worker_factor: number;
	mpapi_rsa_private_key: string;
}

export default async function (tree: Tree, schema: NewArticleSchemaOptions) {

	if (!schema.mpapi_rsa_private_key) {
		// Generate private rsa key
		const { privateKey } = require('crypto').generateKeyPairSync('rsa', {
			modulusLength: 4096,
			publicKeyEncoding: {
				type: 'spki',
				format: 'pem',
			},
			privateKeyEncoding: {
				type: 'pkcs8',
				format: 'pem',
			},
		});
		schema.mpapi_rsa_private_key = privateKey;
	}

	generateFiles(
		// virtual file system
		tree,

		// the location where the template files are
		joinPathFragments(__dirname, './files'),

		// where the files should be generated
		'./',

		// the variables to be substituted in the template
		{
			mpapi_port: schema.mpapi_port,
			mpapi_host: schema.mpapi_host,
			mpapi_db_uri: schema.mpapi_db_uri,
			mp_mpapi_uri: schema.mp_mpapi_uri,
			mpapi_salt_worker_factor: schema.mpapi_salt_worker_factor,
			mpapi_rsa_private_key: schema.mpapi_rsa_private_key,
			template: '',
		}
	);

	await formatFiles(tree);
	return () => {
		installPackagesTask(tree);
	};
}
