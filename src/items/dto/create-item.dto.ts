import { isBoolean, IsNotEmpty, IsNumber, isNumber, IsPositive, isPositive, IsString, MinLength } from "class-validator";

export class CreateItemDto {
    @IsString({ message: 'O nome deve ser um texto' })
    @IsNotEmpty({ message: 'O nome não pode estar vazio' })
    @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    name: string;


    @IsNotEmpty({ message: 'A quantidade não pode estar vazia' })
    @IsNumber({}, { message: 'A quantidade deve ser um número válido' })
    @IsPositive({ message: 'A quantidade deve ser maior que zero' })
    quantity: number;
}
