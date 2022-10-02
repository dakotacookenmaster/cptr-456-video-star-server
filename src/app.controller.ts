import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags, ApiParam, ApiOkResponse, ApiNotFoundResponse } from "@nestjs/swagger"
import { Video } from './entities/Video.entity'

@ApiTags("Root")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getVideos(): Promise<Video[]> {
    return this.appService.getVideos()
  }

  /**
   * Returns information about a given video based on its ID.
   * @param id The ID of the video you want information about.
   * @returns { Promise<Video> } Returns a promise containing information about the retrieved video.
   * @throws { NotFoundError } Throws a NotFoundError if the ID was invalid. 
   */
  @Get("/:id")
  @ApiParam({
    name: "id",
    type: "number",
    description: "The ID of the video you want information about."
  })
  @ApiOkResponse({
    type: Video,
    description: "The video was successfully found."
  })
  @ApiNotFoundResponse({
    description: "The video could not be found."
  })
  getVideoById(@Param("id") id: number): Promise<Video> {
    return this.appService.findVideoById(id)
  }
}
