import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import {z} from 'zod'
import { request } from 'http'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })
    return memories.map(memory => {
      return {
        id: memory.id,
        coverurl: memory.coverUrl,
        except:memory.content.substring(0, 115 ).concat("...")
      }
    })
  })

  //Rota get memoria do Id de usuário específico. 
  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(request.params) // id: id,ma.parse(request.params)

    const memory = prisma.memory.findUniqueOrThrow({
      where: {
        id, // = id: id,
      }
    })
    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const {content, coverUrl, isPublic} = bodySchema.parse(request.body)

    const memory = prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: "c15abb49-9caf-4a63-9434-18c321c5acd6"
      },
    })
    return memory
  })
  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const {content, coverUrl, isPublic} = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id,
      }, 
      data: {
        content,
        coverUrl,
        isPublic,
      }
    })
    return memory
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(request.params) // id: id

    await prisma.memory.delete({
      where: {
        id, // = id: id,
      }
    })
  })
}
