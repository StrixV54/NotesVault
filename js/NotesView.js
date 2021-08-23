export default class NotesView{
    constructor(root, {onNoteSelect, onNoteAdd, onNoteEdit,onNoteDelete}={}){
        this.root=root;
        this.onNoteAdd=onNoteAdd;
        this.onNoteDelete=onNoteDelete;
        this.onNoteEdit=onNoteEdit;
        this.onNoteSelect=onNoteSelect;
        this.root.innerHTML=`
            <div class="notes-sidebar">
                <button class="notes-add-button" type="button">Add New Note</button>
                <div class="notes-list"></div>
                </div>
            <div class="notes-preview ">
                <input class="notes-title" type="text" placeholder="Enter a text">
                <textarea class="notes-body">Here is the notes body..</textarea>
            </div>
        `;
        const btnAddNote=this.root.querySelector(".notes-add");
        const inpTitle=this.root.querySelector(".notes-title");
        const inpbBody=this.root.querySelector(".notes-body");
        btnAddNote.addEventListener ("click", ()=>{
            this
        });
    }
}