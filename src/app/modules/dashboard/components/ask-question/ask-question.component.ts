import { Question } from './../../../../store/lookups/questions/model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { take } from 'rxjs';
import { SelectLookup } from 'src/app/store/lookups';
import { getBase64 } from 'src/app/utils/help';
import { ToastrService } from './../../../../services/toastr.service';
import { askQuestion, askQuestionSuccess, editQuestion } from './../../../../store/lookups/questions/actions';
import { loadTags } from './../../../../store/lookups/tags/actions';


@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {
  question: Question;

  tags$ = this.store.pipe(select((SelectLookup().tags.all)))

  form

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef<AskQuestionComponent>,
    private store: Store<any>,
    private actions: Actions,
    private toastr: ToastrService
  ) {
  }

  dispatcher() {
    this.store.dispatch(loadTags())
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      text: [ this.question?.text, Validators.required],
      tags: [this.question?.tags],
      description: [this.question?.description],
      files: []
    })

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
    if (this.question?.id) {
      this.editQuestion()
    } else {
      this.askQuestion()
    }
  }

  editQuestion() {
    this.setLoading(true)

    let body: any = {}


    for (let key in this.form.value) {
      if (key !== 'files') {
        body[key] = this.form.value[key]
      }
    }


    this.store.dispatch(
      editQuestion({
        payload: body
      })
    )

    this.actions.pipe(ofType(askQuestionSuccess), take(1)).subscribe(res => {
      this.modalRef.close();
      this.toastr.success(res.type)
    })
  }

  askQuestion() {
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

    this.actions.pipe(ofType(askQuestionSuccess), take(1)).subscribe(res => {
      this.modalRef.close();
      this.toastr.success(res.type)
    })
  }



  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };


}
