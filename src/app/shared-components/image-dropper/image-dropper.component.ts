import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'image-dropper',
  templateUrl: './image-dropper.component.html',
  styleUrl: './image-dropper.component.scss'
,
  standalone: false})
export class ImageDropperComponent {

  public isHovering? : boolean;

  @Output() file : EventEmitter<File>;
  @Input() id? : string;

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
    let item = document.getElementById(this.id? this.id: "fileLoader");
    item?.click()
  }
}
