import { Client, Databases, Storage } from 'appwrite'

export const useAppwrite = () => {
  const config = useRuntimeConfig()

  const client = new Client()
    .setEndpoint(config.public.appwriteEndpoint)
    .setProject(config.public.appwriteProjectId)

  return {
    databases: new Databases(client),
    storage: new Storage(client),
  }
}
