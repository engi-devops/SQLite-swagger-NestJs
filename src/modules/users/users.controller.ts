import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { User as UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @Get()
    // async findAll() {
    //     // get all posts in the db
    //     return await this.usersService.findAll();
    // }

    // @Get(':id')
    // async findOne(@Param('id') id: number): Promise<PostEntity> {
    //     // find the post with this id
    //     const post = await this.usersService.findOne(id);

    //     // if the post doesn't exit in the db, throw a 404 error
    //     if (!post) {
    //         throw new NotFoundException('This Post doesn\'t exist');
    //     }

    //     // if post exist, return the post
    //     return post;
    // }

    // @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Body() user: UserDto, @Request() req): Promise<UserEntity> {
        return await this.usersService.create(user);
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Put(':id')
    // async update(@Param('id') id: number, @Body() post: PostDto, @Request() req): Promise<PostEntity> {
    //     // get the number of row affected and the updated post
    //     const { numberOfAffectedRows, updatedPost } = await this.usersService.update(id, post, req.user.id);

    //     // if the number of row affected is zero, it means the post doesn't exist in our db
    //     if (numberOfAffectedRows === 0) {
    //         throw new NotFoundException('This Post doesn\'t exist');
    //     }

    //     // return the updated post
    //     return updatedPost;
    // }

    // @UseGuards(AuthGuard('jwt'))
    // @Delete(':id')
    // async remove(@Param('id') id: number, @Request() req) {
    //     // delete the post with this id
    //     const deleted = await this.usersService.delete(id, req.user.id);

    //     // if the number of row affected is zero, then the post doesn't exist in our db
    //     if (deleted === 0) {
    //         throw new NotFoundException('This Post doesn\'t exist');
    //     }

    //     // return success message
    //     return 'Successfully deleted';
    // }
}
