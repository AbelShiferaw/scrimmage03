import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// GET /api/traits?groupId=...
export async function GET(request: Request) {
  // Get the groupId query parameter
  const { searchParams } = new URL(request.url);
  const groupId = searchParams.get('groupId');

  if (!groupId) {
    return NextResponse.json({ error: 'groupId is required' }, { status: 400 });
  }

  // Open the SQLite database (adjust the path if needed)
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  // Query to get the trait counts for the group
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
