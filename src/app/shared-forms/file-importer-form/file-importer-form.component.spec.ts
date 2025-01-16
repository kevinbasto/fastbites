import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImporterFormComponent } from './file-importer-form.component';

describe('FileImporterFormComponent', () => {
  let component: FileImporterFormComponent;
  let fixture: ComponentFixture<FileImporterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileImporterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileImporterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
