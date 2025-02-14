import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupId = searchParams.get('groupId');

  if (!groupId) {
    return NextResponse.json({ error: 'groupId is required' }, { status: 400 });
  }

  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  const rows = await db.all(
    `SELECT t.trait, COUNT(*) as count
     FROM traits t
     JOIN people p ON t.person_id = p.id
     WHERE p.group_id = ?
     GROUP BY t.trait`,
    [groupId]
  );

  return NextResponse.json({ data: rows });
}
