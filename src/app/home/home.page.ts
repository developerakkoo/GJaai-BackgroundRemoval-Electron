import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  file: File;
  imageUrl: string;


  uploadSub: Subscription;
  constructor(private http: HttpClient,
              private loadingCtrl: LoadingController) {}


  fileEvent(event){
    console.log(event);
    
    this.file = event.target.files[0];
  }

  async upload(){
    let formdata = new FormData();
    formdata.append('image', this.file, this.file.name);

    let loading = this.loadingCtrl.create({
      message: 'Uploading....'
    })

    await (await loading).present();
    this.uploadSub = this.http.post(environment.API + 'bgremove', formdata)
    .subscribe(async (data) =>{
      console.log(data);
      await (await loading).dismiss();
      this.imageUrl = data['file'];
      
    },async (error) =>{
      console.log(error);
      await (await loading).dismiss();
      
    })
  }

  download(){
    saveAs(this.imageUrl, "remove.png");
  }
}
