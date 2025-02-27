import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel:Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel:Model<UserSettings>,

  ){}
  async createUser({ settings, ...createUserDto}: CreateUserDto) {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings:savedNewSettings._id,
      });
      return newUser.save()
      
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();

  }

  getUsers() {
    return this.userModel.find().populate(['settings','posts']);
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate(['settings','posts']);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
