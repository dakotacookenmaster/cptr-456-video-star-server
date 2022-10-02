import { Injectable, NotFoundException } from '@nestjs/common'
import { Video } from './entities/Video.entity'
import * as fs from "fs/promises"
import ffmpeg = require("ffmpeg")

@Injectable()
export class AppService {
    async getVideos(): Promise<Video[]> {
        let videos = []
        for(let i = 0; i < 25; i++) {
            const video = await this.findVideoById(i)
            videos.push(video)
        }

        return videos
    }

    async findVideoById(id: number): Promise<Video> {
        const assetsDirectory = await fs.readdir("./assets")

        if (id >= 0 && id < assetsDirectory.length) {
            const fileName = `${assetsDirectory[id]}`
            const fileLocation = `./assets/${fileName}`
            const videoAsMpeg = await new ffmpeg(fileLocation)
            const video = new Video()
            video.id = +(id)
            video.name = `${fileName
                .replaceAll("-", " ")
                .replaceAll(".mp4", "")
                .split(" ")
                .map(
                    (word, index) => {
                        if (index !== 0) {
                            if (!["in", "a", "for", "an", "the", "on", "of", "is"].includes(word)) {
                                return word[0].toUpperCase() + word.substring(1)
                            } else {
                                return word
                            }
                        } else {
                            return word[0].toUpperCase() + word.substring(1)
                        }
                    }
                )
                .join(" ")
            }`
            video.isFree = video.name.length % 2 === 0
            video.isPurchased = video.isFree
            video.duration = videoAsMpeg.metadata?.duration?.raw
            video.size = (await fs.stat(fileLocation)).size
            video.price = video.isFree ? 0 : +(video.size / (1024 * 1024)).toFixed(2)
            video.url = `http://localhost:3000/videos/${fileName}`

            return video
        }

        throw new NotFoundException()
    }
}
