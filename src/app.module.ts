import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
// import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nestjs_first',{
    connectionFactory: (connection) => {
      console.log('MongoDB Connected:', connection.readyState === 1 ? '✅ Connected' : '❌ Not Connected');
      return connection;
    },
  }), UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
