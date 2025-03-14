import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const group = searchParams.get("group");

    if (!group) {
      return NextResponse.json({ error: "Missing group number" }, { status: 400 });
    }

    const topTraits = await new Promise<{ trait: string; count: number }[]>((resolve, reject) => {
      const query = `
        SELECT t.trait, COUNT(*) as count 
        FROM traits t
        INNER JOIN people p ON t.person_id = p.id
        WHERE p.group_id = ?
        GROUP BY t.trait
        ORDER BY count DESC
        LIMIT 5
      `;
      db.all(query, [group], (err, rows) => {
        if (err) {
          console.error("Error querying top traits:", err);
          reject(err);
        } else {
          resolve(rows as { trait: string; count: number }[]);
        }
      });
    });

    return NextResponse.json({ topTraits });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
