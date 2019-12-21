import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACK_END } from 'backend';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadFiles(formData:FormData){
    return this.httpClient.post(BACK_END+"images/uploadMultipleFiles",formData) as Observable<String[]>;
  }

  downloadFile(id:String){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    });
    return (this.httpClient.get<Blob>(BACK_END+"images/downloadFile/"+id,
      {headers: headers, responseType: 'blob' as 'json' }) as Observable<File>)
      .pipe(map(blob=>this.createImageFromBlob(blob)));  
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    // let imageBlobUrl="";
    // reader.addEventListener("load", () => {
    //   imageBlobUrl = reader.result.toString();
    // }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
    return reader;
  }
}
