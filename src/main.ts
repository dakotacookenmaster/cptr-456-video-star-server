import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from "helmet"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors()
  app.use(helmet())
  console.log(__dirname)
  app.useStaticAssets(join(__dirname, "..", "assets"), {
    prefix: "/videos/"
  })

  const config = new DocumentBuilder()
    .setTitle("VideoStar Web API")
    .setDescription("An interface to retrieve video and informational data about customer video data.")
    .setVersion("0.0.1")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
