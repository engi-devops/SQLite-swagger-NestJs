import { Injectable, Inject, UseInterceptors } from '@nestjs/common';
const { Op } = require("sequelize");
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: UserDto, res): Promise<User> {
        
        if(user.IsResourceOwner == 'true'){
            let tagData:any = user.tags.split(",");
            if(tagData.length > 10){
                return res.status(201).send({
                    code: 201,
                    message: 'Tags cannot be more than 10. currently it is '+ tagData.length,
                    data: [],
                    error: [],
                });
            }
            const createData = await this.userRepository.create<User>(user);
            return res.status(201).send({
                code: 201,
                message: 'Created Successfully',
                data: createData,
                error: [],
            });
        }
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
        const data = await this.userRepository.destroy({ where: { id } });
        return res.status(200).send({
            code: 200,
            message: 'Successfully deleted',
            data: [],
            error: [],
        });
    }

    async getalldata(res): Promise<User> {
        const users = await this.userRepository.findAll();
        const alluserdata = JSON.parse(JSON.stringify(users));
        
        return res.status(200).send({
            code: 200,
            message: 'View Details Successfully',
            data: alluserdata,
            error: [],
        });
    }

    async filter(req,res): Promise<User> {
        let searchData = req.body.search;
        const users = await this.userRepository.findAll({
            where:{
                [Op.or]:[
                  {userName:{ [Op.like]: '%' + searchData + '%' }},
                  {email:{ [Op.like]: '%' + searchData + '%' }},
                ]
            }
          })
        const alluserdata = JSON.parse(JSON.stringify(users));
        
        return res.status(200).send({
            code: 200,
            message: 'Filtered Data',
            data: alluserdata,
            error: [],
        });
    }
}
