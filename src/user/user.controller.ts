/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';


// @UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor( private readonly userService: UserService){}
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

 @Get()
  async list(){
    return this.userService.list();
  }

  @Get(':id')
  async show(@ParamId() id:number){
    console.log('HUAHAUHAUAH'+{id})
    return this.userService.show(id);
  }

  @Put (':id')
  async update (@Body() data:UpdatePutUserDTO, @Param('id',ParseIntPipe)id:number){
    return this.userService.update(id, data)
   
  }

  @Patch (':id')
  async updatePartial (@Body() data:UpdatePatchUserDTO, @Param('id',ParseIntPipe)id:number) {
    return this.userService.updatePartial(id,data);
    
  }

  @Delete (':id')
  async delete (@Param('id',ParseIntPipe)id:number) {
    return this.userService.delete(id);
    
  }
 

}

