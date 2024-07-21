import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { packageStatus } from 'src/helper/types/types';
import { query } from 'express';

@Controller('package')
@ApiTags('Package')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post(":customerId")
  @ApiOperation({ summary: 'Create a package' })
  @ApiBody({ type: CreatePackageDto })
  create(@Param('customerId') customerId: string,@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto,customerId);
  }

  @Get()
  @ApiQuery({name:'package_status'})
  findAll(@Query() query:{package_status:packageStatus}) {
    const {package_status}=query
    return this.packageService.findAll(package_status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(id);
  }
}
