import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import uid from 'uid';
import { AngularFireStorage } from '@angular/fire/storage'

@Injectable({
	providedIn: 'root'
})
export class UploadFilesService {

	constructor(
		private httpClient: HttpClient,
		private storage: AngularFireStorage
	) { }

	uploadFile(files: File[]) {
		const taskRefs = [];
		files.forEach((file, i) => {
			if(file) {
				const filePath = `products/${uid(32)}.${file.type.split('/')[1]}`;
				const ref = this.storage.ref(filePath);
				const task = this.storage.upload(filePath, file);
				taskRefs.push({ task, ref });
			}
			else if(!file && i === 0){
				taskRefs.push('');
			}
		});
		return taskRefs;
	}
}
