import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail({}, { message: 'email khong dung dinh dang' })
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;
  address: string;
}
