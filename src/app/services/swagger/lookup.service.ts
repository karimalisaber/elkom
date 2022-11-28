import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LookupService {
    constructor(private http: HttpClient){}

    fetchLectures(subject_id: string, level_id: string){
        return of([{title: 'test', id: '1'},{title: 'test', id: '1'},{title: 'test', id: '1'},{title: 'test', id: '1'},{title: 'test', id: '1'},{title: 'test', id: '1'},{title: 'test', id: '1'},{title: 'test', id: '1'},{title: 'test', id: '1'},{title: 'test', id: '1'}])
    }

    fetchSubjects(level_id: string){
        return of([{id: '1', title: 'test'}])


    }
    
    fetchLevels(){
        return of([{id: '1', title: 'test'}])

    }

}