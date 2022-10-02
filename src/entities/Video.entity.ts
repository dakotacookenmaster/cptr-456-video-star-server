import { ApiProperty } from "@nestjs/swagger"

export class Video {
    @ApiProperty({
        name: "id",
        type: "number",
        example: 12,
        description: "A unique, numeric, identifier for the video."
    })
    id: number

    @ApiProperty({
        name: "name",
        type: "string",
        example: "Willow Tree Sways in the Wind",
        description: "The name of the video."
    })
    name: string

    @ApiProperty({
        name: "duration",
        type: "string",
        example: "00:01:13.12",
        description: "The duration of the video as a time-formatted string."
    })
    duration: string

    @ApiProperty({
        name: "size",
        type: "number",
        example: 45020014,
        description: "The size of the video in bytes."
    })
    size: number

    @ApiProperty({
        name: "isPurchased",
        type: "boolean",
        example: false,
        description: "Whether this video is marked as purchased or not."
    })
    isPurchased: boolean

    @ApiProperty({
        name: "isFree",
        type: "boolean",
        example: false,
        description: "Whether this video is marked as free or paid content."
    })
    isFree: boolean

    @ApiProperty({
        name: "price",
        type: "number",
        example: 1.99,
        description: "The price of this video, if paid, in US Dollars."
    })
    price: number

    @ApiProperty({
        name: "url",
        type: "string",
        example: "https://example-site.com/videos/abc123.mp4",
        description: "The URL for the statically-hosted video file."
    })
    url: string
}