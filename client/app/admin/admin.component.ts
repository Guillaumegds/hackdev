import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { Cat } from '../shared/models/cat.model';
import { CatService } from '../services/cat.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  isLoading = true;
  cat = new Cat();
  cats: Cat[] = [];
  isEditing = false;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);


  constructor(public auth: AuthService,
    private catService: CatService,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.addCatForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
    });
  }

  addCat() {
    this.catService.addCat(this.addCatForm.value).subscribe(
      (res) => {
        this.cats.push(res);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        data => this.toast.setMessage('user deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getUsers(),
      );
    }
  }


  // export class CatsComponent implements OnInit {

  //   cat = new Cat();
  //   cats: Cat[] = [];
  //   isLoading = true;
  //   isEditing = false;

  //   addCatForm: FormGroup;
  //   name = new FormControl('', Validators.required);
  //   age = new FormControl('', Validators.required);
  //   weight = new FormControl('', Validators.required);

  //   constructor(private catService: CatService,
  //               private formBuilder: FormBuilder,
  //               public toast: ToastComponent) { }

  //   ngOnInit() {
  //     this.getCats();
  //     this.addCatForm = this.formBuilder.group({
  //       name: this.name,
  //       age: this.age,
  //       weight: this.weight,
  //     });
  //   }

  //   getCats() {
  //     this.catService.getCats().subscribe(
  //       data => this.cats = data,
  //       error => console.log(error),
  //       () => this.isLoading = false,
  //     );
  //   }

  //   addCat() {
  //     this.catService.addCat(this.addCatForm.value).subscribe(
  //       (res) => {
  //         this.cats.push(res);
  //         this.addCatForm.reset();
  //         this.toast.setMessage('item added successfully.', 'success');
  //       },
  //       error => console.log(error),
  //     );
  //   }

  //   enableEditing(cat: Cat) {
  //     this.isEditing = true;
  //     this.cat = cat;
  //   }

  //   cancelEditing() {
  //     this.isEditing = false;
  //     this.cat = new Cat();
  //     this.toast.setMessage('item editing cancelled.', 'warning');
  //     // reload the cats to reset the editing
  //     this.getCats();
  //   }

  editCat(cat: Cat) {
    this.catService.editCat(cat).subscribe(
      () => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteCat(cat: Cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.catService.deleteCat(cat).subscribe(
        () => {
          const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}

