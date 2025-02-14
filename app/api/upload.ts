import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

// Open or create your SQLite database
const db = new sqlite3.Database("./database.db");

interface ProcessedRow {
  group: string | number;
  name: string;
  traits: string[];
}

export async function POST(request: Request) {
  try {
    const { rows } = await request.json();

    if (!rows || !Array.isArray(rows)) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // Wrap database operations in a promise
    await new Promise<void>((resolve, reject) => {
      db.serialize(() => {
        db.run("BEGIN TRANSACTION");

        rows.forEach((row: ProcessedRow) => {
          const { group, name, traits } = row;

          db.run(
            "INSERT OR IGNORE INTO groups (id) VALUES (?)",
            [group],
            function (err) {
              if (err) {
                console.error("Error inserting group:", err);
                reject(err);
              }
              db.run(
                "INSERT INTO people (group_id, name) VALUES (?, ?)",
                [group, name],
                function (err) {
                  if (err) {
                    console.error("Error inserting person:", err);
                    reject(err);
                  }
                  const personId = this.lastID;
                  traits.forEach((trait: string) => {
                    db.run(
                      "INSERT INTO traits (person_id, trait) VALUES (?, ?)",
                      [personId, trait],
                      (err) => {
                        if (err) {
                          console.error("Error inserting trait:", err);
                          reject(err);
                        }
                      }
                    );
                  });
                }
              );
            }
          );
        });

        db.run("COMMIT", (err) => {
          if (err) {
            console.error("Error committing transaction:", err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    return NextResponse.json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
