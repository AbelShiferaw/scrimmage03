// app/api/topFive/route.ts
import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db");

export async function POST(request: Request) {
  try {
    const { group } = await request.json();
    if (!group) {
      return NextResponse.json({ error: "Missing group number" }, { status: 400 });
    }

    // Wrap your database queries in a Promise.
    const topTraits = await new Promise<{ trait: string; count: number }[]>((resolve, reject) => {
      // Example query: join people and traits, group by trait, count occurrences, filter by group, and order descending.
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
