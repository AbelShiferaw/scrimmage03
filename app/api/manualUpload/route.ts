import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db");

interface GroupRow {
  id: number;
}

export async function POST(request: Request) {
  try {
    const { group, name, traits } = await request.json();

    if (!group || !name || !traits || !Array.isArray(traits)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await new Promise<void>((resolve, reject) => {
      db.serialize(() => {
       
        db.get("SELECT id FROM groups WHERE id = ?", [group], (err, groupRow) => {
          if (err) {
            console.error("Error selecting group:", err);
            reject("Database error while selecting group");
            return;
          }

      
          const insertPersonAndTraits = (groupId: number) => {
           
            db.get(
              "SELECT id FROM people WHERE group_id = ? AND name = ?",
              [groupId, name],
              (err, personRow) => {
                if (err) {
                  console.error("Error selecting person:", err);
                  reject("Database error while selecting person");
                  return;
                }

                const continueWithPerson = (personId: number) => {
            
                  let completed = 0;
                  const totalTraits = traits.length;
                  if (totalTraits === 0) {
                    resolve();
                    return;
                  }
                  traits.forEach((trait: string) => {
                    db.get(
                      "SELECT id FROM traits WHERE person_id = ? AND trait = ?",
                      [personId, trait],
                      (err, traitRow) => {
                        if (err) {
                          console.error("Error selecting trait:", err);
                          reject("Database error while selecting trait");
                          return;
                        }
                        if (traitRow) {
                       
                          completed++;
                          if (completed === totalTraits) resolve();
                        } else {
                     
                          db.run(
                            "INSERT INTO traits (person_id, trait) VALUES (?, ?)",
                            [personId, trait],
                            function (err) {
                              if (err) {
                                console.error("Error inserting trait:", err);
                                reject("Database error while inserting trait");
                                return;
                              }
                              completed++;
                              if (completed === totalTraits) resolve();
                            }
                          );
                        }
                      }
                    );
                  });
                };

                if (personRow) {
           
                  const existingPerson = personRow as { id: number };
                  continueWithPerson(existingPerson.id);
                } else {
         
                  db.run(
                    "INSERT INTO people (group_id, name) VALUES (?, ?)",
                    [group, name],
                    function (err) {
                      if (err) {
                        console.error("Error inserting person:", err);
                        reject("Database error while inserting person");
                        return;
                      }
                      const personId = this.lastID;
                      continueWithPerson(personId);
                    }
                  );
                }
              }
            );
          };

          if (groupRow) {
       
            const existingGroup = groupRow as GroupRow;
            insertPersonAndTraits(existingGroup.id);
          } else {

            db.run("INSERT OR IGNORE INTO groups (id) VALUES (?)", [group], function (err) {
              if (err) {
                console.error("Error inserting group:", err);
                reject("Database error while inserting group");
                return;
              }

              insertPersonAndTraits(group);
            });
          }
        });
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", responseError: error },
      { status: 500 }
    );
  }
}
