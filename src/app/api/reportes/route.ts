import { NextResponse } from 'next/server'
import { getDashboardKpis } from '@/services/reportes/reportes.service'

export async function GET() {
  try {
    const kpis = await getDashboardKpis()
    return NextResponse.json(kpis)
  } catch {
    return NextResponse.json({ error: 'Error al obtener reportes' }, { status: 500 })
  }
}
