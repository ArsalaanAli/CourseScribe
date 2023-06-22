import asyncio
from prisma import Prisma


async def prisma_post_notes(user, notes, noteName):
    prisma = Prisma()
    await prisma.connect()
    new_note = await prisma.notes.create(
        data={
            "noteData": notes,
            "userId": user,
            "noteName": noteName
        }
    )
    return new_note


def add_notes_to_database(user, notes, noteName):
    created_note = asyncio.run(prisma_post_notes(
        user=user, notes=notes, noteName=noteName))
    return created_note
