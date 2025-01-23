import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Image } from '../../core/entities/image';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'image-form',
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.scss'
})
export class ImageFormComponent implements OnChanges {

  @Input() uploading? : boolean;
  @Input() image?: Image;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() saveImage: EventEmitter<Partial<Image>> = new EventEmitter();
  @Output() file: EventEmitter<File> = new EventEmitter(); 

  form: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', []],
      available: [true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['image'] && this.image){
      const {name, description, available} = this.image;
      this.form.setValue({name, description, available});
    }
  }

  cancelForm() {
    this.cancel.emit()
  }

  submitForm() {
    this.saveImage.emit({...this.image, ...this.form.value});
  }

}
