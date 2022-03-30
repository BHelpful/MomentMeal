import util from 'util';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
	url: process.env.DB_URI as string,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (req: unknown, file: { mimetype: string; originalname: unknown }) => {
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

const uploadFiles = util.promisify(
	multer({
		storage: storage,
		limits: {
			fileSize: 1000,
		},
	}).single('file')
);
export default uploadFiles;
