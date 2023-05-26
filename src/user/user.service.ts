/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}
    async create({email, name, password,birthAt}: CreateUserDTO){
       return  this.prisma.user.create({
            data:{
                email,
                name,
                password,
                birthAt: birthAt ? new Date(birthAt): null
                
            },
        });
    }

    async list(){
        return this.prisma.user.findMany();
    }

    async show(id: number){
        await this.exists(id)
        return this.prisma.user.findUnique({
            where:{
                id
            }
        })

    }

    async update(id: number,{email,name, password,birthAt} : UpdatePutUserDTO){
        console.log({email,name, password,birthAt});
        await this.exists(id)
        
        return this.prisma.user.update({
            data:{email,name, password,birthAt: birthAt ? new Date(birthAt): null},
            where:{
                id
            }
        })
    }
    async updatePartial(id: number,{email,name, password,birthAt}: UpdatePatchUserDTO){
        const data: any = {};
        if(birthAt){
            data.birthAt = new Date (data.birthAt);
        }

        if (email){
            data.email = email;
        }

        if (name){
            data.name = name;
        }

        if (password){
            data.password = password;
        }

        return this.prisma.user.update({
            data,
            where:{
                id
            }
        })
    }

    async delete(id:number){
        await this.exists(id)

        if(!(await this.show(id))) {
            throw new NotFoundException (`O usuário ${id} não existe`);

        };
        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists (id: number) {
       if(!(await this.prisma.user.count({
        where:{
            id
        }
       }))) {
        throw new NotFoundException(`O usuário ${id} não existe`);
       }
    }
}