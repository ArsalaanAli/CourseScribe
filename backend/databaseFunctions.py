import asyncio
from prisma import Prisma
prisma = Prisma()


async def add_notes_to_database(user, notes, noteName):
    print("adding")
    new_note = await prisma.notes.create(
        data={
            "noteData": notes,
            "userId": user,
            "noteName": noteName
        }
    )
    print(new_note)
    print(notes)
