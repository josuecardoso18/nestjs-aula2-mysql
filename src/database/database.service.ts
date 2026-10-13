import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createPool,
  Pool,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';

@Injectable()
export class DatabaseService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.pool = createPool({
      host: this.configService.get<string>(
        'DB_HOST',
        'localhost',
      ),
      port: Number(
        this.configService.get<string>(
          'DB_PORT',
          '3306',
        ),
      ),
      user: this.configService.get<string>(
        'DB_USER',
        'root',
      ),
      password: this.configService.get<string>(
        'DB_PASSWORD',
        '',
      ),
      database: this.configService.get<string>(
        'DB_NAME',
        'escola',
      ),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async onModuleInit(): Promise<void> {
    const connection = await this.pool.getConnection();

    try {
      await connection.ping();
      console.log('MySQL conectado com sucesso!');
    } finally {
      connection.release();
    }
  }

  execute<T extends RowDataPacket[] | ResultSetHeader>(
    sql: string,
    values: any[] = [],
  ) {
    return this.pool.execute<T>(sql, values);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
    console.log('Pool MySQL encerrado.');
  }
}
