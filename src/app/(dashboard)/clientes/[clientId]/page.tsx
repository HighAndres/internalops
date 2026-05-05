import { redirect } from 'next/navigation'

export default async function ClientePage({
  params,
}: {
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  redirect(`/clientes/${clientId}/resumen`)
}
