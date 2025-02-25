import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/Post.schema';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) 
    private postModel:Model<Post>,
    @InjectModel(User.name) 
    private userModel:Model<User>,
  ){}
  async createPost({userId, ...createPostDto}: CreatePostDto) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) {
      throw new HttpException('User Not Found', 404);

    }
    const newPost = new this.postModel(createPostDto);
    const savePost = await newPost.save();
    await findUser.updateOne({
      $push:{
        posts:savePost._id,
      },
    });
    return savePost;
  }

  findAll() {
    return `This action returns all posts`;
  }

  findPostById(id: string) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
