import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BehaviorSubject, combineLatest, filter, finalize, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LookupService } from 'src/app/services/swagger/lookup.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

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
  form = this.fb.group({
    text: ["", Validators.required],
    lectureId: ["", Validators.required],
    subjectId: [''],
    levelId: [''],
    description: [""],
    files: []
  })

  subject$ = new BehaviorSubject<string>('')
  level$ = new BehaviorSubject<string>('')

  lectures$ = combineLatest([this.subject$, this.level$.pipe(filter(res => !!res))])
    .pipe(switchMap(([subject, level]) => {
      return this.lookupService.fetchLectures(subject, level)
    }))

  subscription: Subscription = new Subscription();;

  subjects$ = this.level$.pipe(filter(res => !!res), switchMap(level => this.lookupService.fetchSubjects(level)));

  levels$ = this.lookupService.fetchLevels().pipe(tap(res => { this.form.get('levelId')?.setValue(res[0].id); this.level$.next(res[0].id) }));


  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef<AskQuestionComponent>,
    private auth: AuthService,
    private lookupService: LookupService,
  ) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubjectChange(e: string) {
    this.form.get('lectureId')?.reset()
    this.subject$.next(e)
  }

  onLevelChange(e: any) {
    this.form.get('lectureId')?.reset()
    this.form.get('subjectId')?.reset()

    this.level$.next(e)
  }

  ngOnInit(): void {
    this.observeForm()

    this.modalRef.updateConfig({
      nzOnOk: () => {
        this.onSubmit()
        return false
      },
    })
  }

  observeForm() {
    let form = this.form.valueChanges;

    this.subscription = form.subscribe(res => {

      // if ((res.text && res.lectureId) || res.files?.length > 0) {
      //   this.modalRef.updateConfig({
      //     nzOkDisabled: false
      //   })
      // } else {
      //   this.modalRef.updateConfig({
      //     nzOkDisabled: true
      //   })
      // }

    })

  }


  onUploadChange({ file, fileList }: NzUploadChangeParam): void {
    // this.form.get('files')?.setValue(fileList)
  }

  setLoading(state: boolean) {
    this.modalRef.updateConfig({
      nzOkLoading: state,
      nzCancelDisabled: state,
      nzMaskClosable: !state
    })
  }


  onSubmit() {

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


  // onCkeditorChange(e:string){
  //   this.form.get('description').setValue(e)
  // }

}
