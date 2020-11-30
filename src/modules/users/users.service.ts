import { Injectable, Inject, UseInterceptors } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { fileStorage } from '../../utils/index';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    @UseInterceptors(fileStorage)
    async create(user: UserDto,res): Promise<User> {
        const createData = await this.userRepository.create<User>(user);
        return res.status(201).send({
            code: 201,
            message: 'Created Successfully',
            data: createData,
            error: [],
        });
    }

    async findOne(id,res): Promise<User> {
        const data =  await this.userRepository.findOne({
            where: { id },
        });
        return res.status(200).send({
            code: 200,
            message: 'View Details Successfully',
            data: data,
            error: [],
        });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedUser]] = await this.userRepository.update({...data}, { where: { id }});
        return { numberOfAffectedRows, updatedUser };
    }

    async remove(id,res) {
        // return await this.userRepository.destroy({ where: { id } });
        const data = await this.userRepository.destroy({ where: { id } });
        return res.status(200).send({
            code: 200,
            message: 'Successfully deleted',
            data: [],
            error: [],
        });
    }

}
