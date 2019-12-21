import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACK_END } from 'backend';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadFiles(formData:FormData){
    return this.httpClient.post(BACK_END+"images/uploadMultipleFiles",formData);
  }
}
