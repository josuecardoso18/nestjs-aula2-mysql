import { Injectable } from '@nestjs/common';
import { AlunosRepository } from './alunos.repository';

@Injectable()
export class AlunosService {
  constructor(private readonly alunosRepository: AlunosRepository) {}

  findAll() {
    return this.alunosRepository.findAll();
  }

  findById(id: number) {
    return this.alunosRepository.findById(id);
  }

  create(nome: string, email: string, curso: string) {
    return this.alunosRepository.create(nome, email, curso);
  }

  async update(id: number, nome: string, email: string, curso: string) {
    const affectedRows = await this.alunosRepository.update(id, nome, email, curso);
    if (affectedRows === 0) return null;
    return this.alunosRepository.findById(id);
  }

  delete(id: number) {
    return this.alunosRepository.delete(id);
  }
}
