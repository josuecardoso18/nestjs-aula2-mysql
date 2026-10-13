import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';

interface AlunoBody {
  nome: string;
  email: string;
  curso: string;
}

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Get()
  findAll() {
    return this.alunosService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const aluno = await this.alunosService.findById(id);
    if (!aluno) throw new NotFoundException('Aluno não encontrado');
    return aluno;
  }

  @Post()
  create(@Body() body: AlunoBody) {
    return this.alunosService.create(body.nome, body.email, body.curso);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AlunoBody,
  ) {
    const aluno = await this.alunosService.update(
      id,
      body.nome,
      body.email,
      body.curso,
    );
    if (!aluno) throw new NotFoundException('Aluno não encontrado');
    return aluno;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const affectedRows = await this.alunosService.delete(id);
    if (affectedRows === 0) throw new NotFoundException('Aluno não encontrado');
    return { mensagem: 'Aluno excluído com sucesso' };
  }
}
