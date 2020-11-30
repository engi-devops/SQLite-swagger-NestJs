import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findOne(id): Promise<User> {
        return await this.userRepository.findOne({
            // where: { id },
            // include: [{ model: User, attributes: { exclude: ['password'] } }],
        });
    }

    async delete(id, userId) {
        return await this.userRepository.destroy({ where: { id, userId } });
    }

    async update(id, data) {
        console.log("ggggggg",id);
        console.log("hhhhhhhh",data);
        // return await this.userRepository.update({ ...data }, { where: { id }, returning: true });
        const [numberOfAffectedRows, [updatedUser]] = await this.userRepository.update(data, { where: { id }, returning: true });
        console.log("numberOfAffectedRows",numberOfAffectedRows);
        console.log("updatedUser",updatedUser);
        
        return { numberOfAffectedRows, updatedUser };
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { id } });
    }

}
