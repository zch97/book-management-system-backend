import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as path from 'path'
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './my-file-storage';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest:'uploads', //保存文件的目录
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 3 //文件大小限制
    },
    // 限制扩展名只能是图片
    fileFilter(req, file, callback) {
      const extname = path.extname(file.originalname);
      if(['.png', '.jpg', '.gif'].includes(extname)){
        callback(null, true)
      } else {
        callback(new BadRequestException('只能上传图片'), false)
      }
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path
  }

  @Get('list')
  async list(@Query('name') name: string) {
    return this.bookService.list(name);
  }

  @Get(':id')
  async findById(@Param('id') id: string){
    return this.bookService.findById(+id)
  }

  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put('update')
  async update(@Body() updateBookDto: UpdateBookDto){
    return this.bookService.update(updateBookDto)
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string){
    return this.bookService.delete(+id)
  }
}
