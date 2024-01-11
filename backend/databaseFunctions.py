import asyncio
from prisma import Prisma


async def prisma_create_note(user, notes, noteName):
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


async def prisma_update_note(noteId, notes):
    prisma = Prisma()
    await prisma.connect()
    new_note = await prisma.notes.update(
        where={"noteId": noteId},
        data={
            "noteData": notes,
        }
    )
    return new_note


def create_note_in_database(user, notes, noteName):
    created_note = asyncio.run(prisma_create_note(
        user=user, notes=notes, noteName=noteName))
    return created_note


def update_note_in_database(noteId, notes):
    created_note = asyncio.run(prisma_update_note(
        noteId=noteId, notes=notes))
    return created_note
