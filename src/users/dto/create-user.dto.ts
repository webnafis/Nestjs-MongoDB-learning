import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateUserSettingsDto{
    @IsOptional()
    @IsBoolean()
    recieveNotifications?:boolean;

    @IsOptional()
    @IsBoolean()
    recieveEmails?:boolean;

    @IsOptional()
    @IsBoolean()
    recieveSMS?:boolean;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsOptional()
    displayName?:string;

    @IsOptional()
    @ValidateNested()
    @Type(()=> CreateUserSettingsDto)
    settings?:CreateUserSettingsDto;
}

