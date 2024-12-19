import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'file-dropper',
  templateUrl: './file-dropper.component.html',
  styleUrl: './file-dropper.component.scss'
})
export class FileDropperComponent {

  public isHovering? : boolean;

  @Output() file : EventEmitter<File>;

  constructor() {
    this.file = new EventEmitter<File>();
  }

  ngOnInit(): void {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  
  onDrop(files: FileList) {
    let file : File = files.item(0)!;
    this.file.emit(file);
  }

  uploadFromButton($event : Event){
    let file : File = ($event.target as HTMLInputElement)?.files![0]
    this.file.emit(file);
  }

  clickButton(){
    let item = document.getElementById("fileLoader");
    item?.click()
  }
}
