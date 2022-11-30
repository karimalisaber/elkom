import { askQuestion } from './../../../../store/lookups/questions/actions';
import { loadTags } from './../../../../store/lookups/tags/actions';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BehaviorSubject, combineLatest, filter, finalize, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { SelectLookup } from 'src/app/store/lookups';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {
  tags$ = this.store.pipe(select((SelectLookup().tags.all)))

  form = this.fb.group({
    text: ["", Validators.required],
    tags: [],
    description: [""],
    files: []
  })







  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef<AskQuestionComponent>,
    private auth: AuthService,
    private store: Store<any>
  ) {
  }

  dispatcher() {
    this.store.dispatch(loadTags())
  }


  ngOnInit(): void {
    this.dispatcher()

    this.modalRef.updateConfig({
      nzOnOk: () => {
        this.onSubmit()
        return false
      },
    })
  }



  onUploadChange({ file, fileList }: NzUploadChangeParam): void {
    this.form.get('files')?.setValue(fileList)
  }

  setLoading(state: boolean) {
    this.modalRef.updateConfig({
      nzOkLoading: state,
      nzCancelDisabled: state,
      nzMaskClosable: !state
    })
  }


  onSubmit() {
    this.setLoading(true)

    let body: any = {}

    for (let key in this.form.value) {
      if (key !== 'files') {
        body[key] = this.form.value[key]
      }
    }

    if (this.form.value.files?.length) {
      body.hasAttachments = true;
    } else {
      body.hasAttachments = false
    }

    this.store.dispatch(
      askQuestion({
        payload: body,
        files: this.form?.value?.files?.map((res: any) => res.originFileObj)
      })
    )
  }

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };


}
