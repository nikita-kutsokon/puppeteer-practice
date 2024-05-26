import puppeteer from 'puppeteer';

import { ICatalogData } from './types';
import TusParserConfig from './config';


const getCatalogsData = async (): Promise<ICatalogData[]> => {
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(TusParserConfig.pages.root, { waitUntil: 'domcontentloaded' });

    const data = await page.evaluate(() => {
        const catalogCardElements = document.querySelectorAll('.card.card-catalogue');

        return Array.from(catalogCardElements).map(element => {
            const name = element.querySelector('h3 a')!.textContent!.trim();

            const expiredDateElement = element.querySelectorAll('p time')[1];
            const expiredAtTextContent = expiredDateElement!.textContent!;
            const [day, month, year] = expiredAtTextContent.split('.').map(part => part.trim());
            const expiredAt = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)).toDateString();

            const pdfLink = element.querySelector('figcaption a.pdf')!.getAttribute('href');

            return { 
                name,
                pdfLink,
                expiredAt,
            } as ICatalogData;
        });
    });

    await browser.close();

    return data;
};

export default {
    getCatalogsData
};