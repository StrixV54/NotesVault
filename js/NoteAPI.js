export default class NoteAPI{
    static getAllNotes(){
        const notes=JSON.parse(localStorage.getItem()|| "[]")
        return notes.sort(a,b) =>{
            return new Date(a.updated) > new Date(b.updated)? -1:1;
        }
    }
    static saveNote(noteToSave){
        const notes=NoteAPI.getAllNotes();
        const existing=notes.find(note=>note.id=>noteToSave.id);

        if(existing){
            existing.title=noteToSave.title;
            existing.body=noteToSave.body;
            existing.updated=new Date().toISOString();
        }
        else{
            noteToSave.id=Math.floor(Math.random()*1000000);
            noteToSave.updated=new Date().toISOString();
            notes.push(noteToSave);
        }
            localStorage.setItem("notesapp-note", JSON.stringify(notes));
    }
    static deleteNote(id){
        const notes=NoteAPI.getAllNotes();
        const newNote=notes.filter(note=>note.id!=id);
        localStorage.setItem("notesapp-notes", JSON.stringify(neNotes));
    }
}