const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
	url: process.env.DB_URI,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (req, file) => {
		const match = ['image/png', 'image/jpeg'];

		if (match.indexOf(file.mimetype) === -1) {
			return `${Date.now()}-any-name-${file.originalname}`;
		}

		return {
			bucketName: 'photos',
			filename: `${Date.now()}-any-name-${file.originalname}`,
		};
	},
});

const uploadFiles = util.promisify(multer({ storage }).single('file'));
export default uploadFiles;
