import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../config/typeorm.config.js';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (
        options?: DataSourceOptions,
      ): Promise<DataSource> => {
        if (!options) {
          throw new Error('🚨 options for connecting to undefined database!!!');
        }
        const dataSource = new DataSource(options).initialize();

        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
