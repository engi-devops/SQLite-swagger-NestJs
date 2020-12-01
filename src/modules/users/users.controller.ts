import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Request, Response, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../../utils/index';
import { diskStorage } from 'multer';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id/view')
    async findOne(@Param('id') id: number,@Response() res): Promise<UserEntity> {
        const post = await this.usersService.findOne(id,res);
        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return post;
    }

    @Post('create')
    @UseInterceptors(
        FilesInterceptor('image', 200000, {
            storage: diskStorage({
                destination: './upload',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async create(@UploadedFiles() files, @Body() user: UserDto, @Request() req, @Response() res): Promise<UserEntity> {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse.filename);
        });
        
        let userDetails = {
            userName: user.userName,
            email: user.email,
            tags: user.tags,
            IsResourceOwner: user.IsResourceOwner,
            image : response
        }
        return await this.usersService.create(userDetails,res);
    }


    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UserDto, @Request() req): Promise<UserEntity> {
        
        const { numberOfAffectedRows, updatedUser } = await this.usersService.update(id, user);
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This User doesn\'t exist');
        }
        return updatedUser;
    }

    @Delete(':id/delete')
    async remove(@Param('id') id: number, @Request() req, @Response() res) {
        const deleted = await this.usersService.remove(id, res);
        if (deleted === 0) {
            throw new NotFoundException('This User doesn\'t exist');
        }
        return deleted
    }

    @Get('/getalldata')
    async getalldata(@Response() res) {
        return this.usersService.getalldata(res);
    }
}
