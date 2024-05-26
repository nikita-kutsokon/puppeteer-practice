import fs from 'fs';
import path from 'path';
import axios from 'axios';

import { googleDriveProvider } from './google-drive/provider';

const createFolder = async (folderName: string, parentFolderId?: string) => {
	const fileMetadata = {
		name: folderName,
		mimeType: 'application/vnd.google-apps.folder',
		parents: [parentFolderId || process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID!],
	};

	const folder = await googleDriveProvider.files.create({
		requestBody: fileMetadata,
		fields: 'id',
	});

	return folder.data.id;
};

const uploadJsonToDrive = async (data: Object, folderId: string) => {
	const fileMetadata = {
		name: 'data.json',
		parents: [folderId],
	};

	const media = {
		mimeType: 'application/json',
		body: JSON.stringify(data),
	};

	const file = await googleDriveProvider.files.create({
		requestBody: fileMetadata,
		media: media,
		fields: 'id',
	});

	return file;
};

const uploadPdfToDrive = async (pdfFilePath: string, fileName: string, folderId: string) => {
	const response = await axios.get(pdfFilePath, {
		responseType: 'arraybuffer',
	});

	const pdfBuffer = response.data;

	const tempFilePath = path.join(__dirname, fileName);
	fs.writeFileSync(tempFilePath, pdfBuffer);

	const fileMetadata = {
		name: fileName,
		mimeType: 'application/pdf',
		parents: [folderId],
	};

	const media = {
		mimeType: 'application/pdf',
		body: fs.createReadStream(tempFilePath),
	};

	const file = await googleDriveProvider.files.create({
		requestBody: fileMetadata,
		media: media,
		fields: 'id',
	});

	fs.unlinkSync(tempFilePath);

	return file.data.id;
};

export default {
	createFolder,
	uploadPdfToDrive,
	uploadJsonToDrive,
};