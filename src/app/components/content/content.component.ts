import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  form: FormGroup;

  // rangesss = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });

  // range = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });


  hideRequiredControl = new FormControl(false);
  wifi = false;
  pool = false;
  spa = false;
  teretana = false;


  constructor(fb: FormBuilder) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    
    this.form = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 15)),
      numberOfPerson: new FormControl('person1'),
      numberOfChildren: new FormControl('one'),
      accommondationType: new FormControl('all'),
    })
    // this.range = new FormGroup({
    //   start: new FormControl(new Date(year, month, 13)),
    //   end: new FormControl(new Date(year, month, 15))
    // });
    // this.rangesss = new FormGroup({
    //   start: new FormControl(new Date(year, month, 13)),
    //   end: new FormControl(new Date(year, month, 15))
    // });
    // this.options = fb.group({
    //   hideRequired: this.hideRequiredControl
    // });
  }

  ngOnInit(): void {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.form = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 15)),
      numberOfPerson: new FormControl('person1'),
      numberOfChildren: new FormControl('one'),
      accommondationType: new FormControl('all'),
    })
  }

}
