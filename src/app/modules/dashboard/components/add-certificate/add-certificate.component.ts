import { addCertificate } from './../../../../store/session/session.actions';
import { Store } from '@ngrx/store';
import { Specialty } from './../../../../store/lookups/specialities/model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss']
})
export class AddCertificateComponent implements OnInit {
  form = this.fb.group({
    Title:[null, Validators.required],
    Description: [null, Validators.required],
    SpecialtyId: ['', Validators.required]
  })

  formData = this

  fileList: NzUploadFile[] = []
  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit(): void {
  }

  add(){
    let file = new FormData();
    // body.append('files', file)
    file.append('file' , this.fileList[0]?.originFileObj)
    // body.append('SpecialtyId', )
    // body.append('Title', this.form.value.Title)
    // body.append('Description', this.form.value.Description)
    
  
    this.store.dispatch(addCertificate({file, SpecialtyId: this.form.value.SpecialtyId, Title : this.form.value.Title, Description: this.form.value.Description}))
  }

  change(e){
    console.log(e)
  }

  onSpecialtyChange(specialties: Specialty){
    this.form.get('SpecialtyId').setValue(specialties.id)
    

  }

}
