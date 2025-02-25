import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    contents:string;

    @IsString()
    @IsNotEmpty()
    userId:string;
}
