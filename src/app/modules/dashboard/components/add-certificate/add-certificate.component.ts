import { Specialty } from './../../../../store/lookups/specialities/model';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss']
})
export class AddCertificateComponent implements OnInit {
  form = this.fb.group({
    title:[],
    description: [],
    specialties: []
  })

  fileList: NzUploadFile[] = []
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  add(){
    
  }

  change(e){
    console.log(e)
  }

  onSpecialtyChange(specialties: Array<Specialty>){
    this.form.get('specialties').setValue(specialties)
  } 
}
