import { IsOptional, IsString, IsNotEmpty} from 'class-validator';


export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({
    message: 'Informe um título',
})
  title: string;

  @IsString()
  @IsNotEmpty({
    message: 'Informe uma descrição',
})
  description: string;

  @IsString()
  @IsOptional()
  statusTask: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  statusTask: string;
}

export class SearchTaskDto {

  @IsString()
  @IsNotEmpty({
    message: 'Informe um status',
})
  statusTask: string;
}

