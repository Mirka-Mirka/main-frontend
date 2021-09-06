import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationService } from 'src/app/services/accommodation.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  accommodationId;
  form: FormGroup | undefined;
  files: any[] = [];
  formData = new FormData();
  numberOfUploadedFiles: number = 0;
  public accFiles: string[] = [];

  constructor(public router: Router,
    public accommodationService: AccommodationService, 
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) {
      this.accommodationId = this.activatedRoute.snapshot.params.id;
      const navigation = this.router.getCurrentNavigation();
      const data = navigation?.extras.state;
      if (data) {
        if (data.hasOwnProperty('files')) {
        this.files = data.files;
       }
      }
    }

  ngOnInit(): void {
  }
  isDisabled(){
      return this.numberOfUploadedFiles == 0;
  }
  // addImages(accomodationId : string){
 addImages(){
  const formData = new FormData();
  console.log(this.files);
  this.files.forEach((file: any)=> {
    formData.append('images', file, file.name);
  });
  console.log("###########");
  console.log(formData);
  this.accommodationService.addManyImages(this.accommodationId, formData)
      .subscribe((res: any) => {
         if(res){
            console.log(res);
            if (res !== false) {
                this.snackBar.open("Slike su uspešno dodate", "", { duration: 3000,});
                this.router.navigate(['/accommodation']);
            }
          }
      });
  }

  onFilesUploaded($event: any) {
    this.files = $event;
    this.numberOfUploadedFiles = this.files.length;
  }
}
