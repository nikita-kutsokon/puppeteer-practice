import { Request, Response } from 'express';

import { TusParser } from '../../parsers';
import GoogleDriveService from '../../services';


const parseCatalogData = async (_: Request, res: Response) => {
    const catalogsData = await TusParser.getCatalogsData();
    const targetFolderId = await GoogleDriveService.createFolder(`Tus- ${new Date().toLocaleString()}`);

    const pdfsFolderId = await GoogleDriveService.createFolder('Pdf files', targetFolderId!);

    await GoogleDriveService.uploadJsonToDrive(catalogsData, targetFolderId!);
    
    const uploadPromises = catalogsData.map(({ pdfLink, name }) => 
        GoogleDriveService.uploadPdfToDrive(pdfLink, name, pdfsFolderId!)
    );

    await Promise.all(uploadPromises);

    res.status(500).json({ msg: 'Ok' });
};

export default {
    parseCatalogData
};