import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Request, Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';

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

    // @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Body() user: UserDto, @Request() req,@Response() res): Promise<UserEntity> {
        return await this.usersService.create(user,res);
    }

    // @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UserDto, @Request() req): Promise<UserEntity> {
        console.log("idd",id);
        console.log("user",user);
        
        // return await this.usersService.update(id, user);
        const { updatedUser } = await this.usersService.update(id, user);
        // if (numberOfAffectedRows === 0) {
        //     throw new NotFoundException('This User doesn\'t exist');
        // }
        return updatedUser;
    }

    // @UseGuards(AuthGuard('jwt'))
    @Delete(':id/delete')
    async remove(@Param('id') id: number, @Request() req, @Response() res) {
        const deleted = await this.usersService.remove(id, res);
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }
        return deleted
    }
}
