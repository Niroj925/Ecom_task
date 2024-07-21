import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/db.config';
import { AtStrategy } from './middleware/strategies/at.strategies';
import { ItemModule } from './modules/item/item.module';
import { PackageModule } from './modules/package/package.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    ItemModule,
    PackageModule,
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService,AtStrategy],
})
export class AppModule { }
