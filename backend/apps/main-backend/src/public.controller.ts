import {
    Controller,
    Get,
    Param,
    Res,
    UseGuards,
    NotFoundException,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { join } from 'path';
  import { existsSync } from 'fs';
import { JwtAuthGuard } from '@portfolio-builder/shared';
import { ApiBearerAuth } from '@nestjs/swagger';
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  
  @Controller('public')
  export class FileController {
    
    @Get(':filename')
    async getFile(@Param('filename') filename: string, @Res() res: Response) {
      const filePath = join(process.cwd(), 'public', filename);
      if (!existsSync(filePath)) {
        throw new NotFoundException('File not found');
      }
      res.sendFile(filePath);
    }
  }
  