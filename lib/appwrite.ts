import { Client, Databases, Storage } from 'appwrite'

export function useAppwrite() {
  const config = useRuntimeConfig()

  const client = new Client()
    .setEndpoint(config.public.appwriteEndpoint)
    .setProject(config.public.appwriteProjectId)

  return {
    databases: new Databases(client),
    storage: new Storage(client),
  }
}
