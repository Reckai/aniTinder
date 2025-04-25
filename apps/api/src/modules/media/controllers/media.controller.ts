import { MediaType } from 'generated/prisma';
import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MediaService } from '../services/media.service';
import { MediaResponseDto } from '../dto';

@Controller('media')
@ApiTags('Media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all media with optional filtering' })
  @ApiResponse({
    status: 200,
    type: [MediaResponseDto],
    description: 'Successfully retrieved media list',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid parameters',
  })
  @ApiQuery({ name: 'type', enum: MediaType, required: false })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'year', required: false })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starts from 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  findAll(
    @Query('type') type?: MediaType,
    @Query('title') title?: string,
    @Query('year') year?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const limitToNumber = Number(limit);
    return this.mediaService.findAll({
      type,
      title,
      year,
      page,
      limit: limitToNumber,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get media by ID' })
  @ApiParam({ name: 'id', description: 'Media ID' })
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete media by ID' })
  @ApiParam({ name: 'id', description: 'Media ID' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
