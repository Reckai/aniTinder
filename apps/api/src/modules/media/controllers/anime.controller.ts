import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAnimeDto } from '../dto';
import { AnimeService } from '../services/anime/anime.service';

@Controller('anime')
@ApiTags('Anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  @ApiOperation({ summary: 'Create new anime' })
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animeService.create(createAnimeDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get anime by ID' })
  findOne(@Param('id') id: string) {
    return this.animeService.findOne(id);
  }

  //   @Patch(':id')
  //   @ApiOperation({ summary: 'Update anime' })
  //   update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
  //     return this.animeService.update(id, updateAnimeDto);
  //   }
}
