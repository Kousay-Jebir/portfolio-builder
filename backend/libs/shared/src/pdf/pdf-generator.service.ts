
import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';

@Injectable()
export class PdfService {
  async generateResumePdf(data: any){
    const templatePath = path.join(process.cwd(), 'uploads','template.html');
    const templateContent = await fs.readFile(templatePath, 'utf8');

    const template = Handlebars.compile(templateContent);
    const html = template(data);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });

    const date = dayjs().format('YYYY-MM-DD');
    const uniqueId = uuidv4().split('-')[0];
    const fileName = `resume_${date}_${uniqueId}.pdf`;
    const filePath = path.join(publicDir, fileName);

    await page.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    return {filePath:filePath,filename:fileName};
  }
}
