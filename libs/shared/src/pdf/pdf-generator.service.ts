import * as puppeteer from 'puppeteer';
import * as Handlebars from 'handlebars';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs/promises';
import * as fssync from 'fs';

@Injectable()
export class PdfService {
  async generateResumePdf(data: any): Promise<string> {
    const templateHtml = await fs.readFile(
      join(__dirname, 'uploads', 'template.html'),
      'utf-8'
    );

    const template = Handlebars.compile(templateHtml);
    const html = template(data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const outputDir = join(process.cwd(), 'public');
    if (!fssync.existsSync(outputDir)) {
      fssync.mkdirSync(outputDir);
    }

    const outputPath = join(outputDir, 'resume.pdf');

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    return outputPath;
  }
}
