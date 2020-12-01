import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userName : string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.ARRAY(DataType.JSON),
        allowNull: false,
    })
    image: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    tags: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '0',
        allowNull: false,
    })
    resourceOrNonResource: string; // if resourceOrNonResource = '0' means 'Resource Owner User', if  resourceOrNonResource = '1' means 'Non-Resource Owner user'
}
