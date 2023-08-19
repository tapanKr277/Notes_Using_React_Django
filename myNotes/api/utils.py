from .models import Note
from .serializer import NoteSerializer
from rest_framework.response import Response

def createNote(request):
    data = request.data 
    note = Note.objects.create(
    body = data['body']
        )
    serializer = NoteSerializer(note)
    return Response(serializer.data)

def getNotess(request):
    note = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(note, many=True)
    return Response(serializer.data)

def updateNote(request, pk):
    data = request.data 
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()

def getNote(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note)
    return Response(serializer.data)