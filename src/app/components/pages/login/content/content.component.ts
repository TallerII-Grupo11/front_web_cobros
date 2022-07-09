import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  closeResult: string;
  public incorrectUserOrPassword = false;

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  open(content: any) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-min' });
  } 
  loginForm: FormGroup;

  ngOnInit(): void {
    // Login Form
    this.loginForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(99)
      ])
    });
  }

  onSubmit() {
    this.incorrectUserOrPassword = false;
    this.userService.signInWithUsernameAndPassword(this.loginForm.value.Email, this.loginForm.value.Password);
  }

}