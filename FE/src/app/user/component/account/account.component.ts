import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account-service/account.service';
import { Address } from 'src/app/models/address';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	user: User;
	addAddressForm: FormGroup;
	profileForm: FormGroup;
	addressesForm: FormGroup[] = [];
	showAddressForm = false;
	constructor(
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private accountService: AccountService
		) { }

	ngOnInit() {
		this.accountService.loadCurrentUser();
		this.accountService.getCurrentUser().subscribe(user => {
			this.user = user;
			this.updateProfileForm();
		});

		this.createOrClearAddressForm();
	}

	private createOrClearAddressForm() {
		this.addAddressForm = this.formBuilder.group({
			firstLine: [''],
			secondLine: [''],
			city: [''],
			state: [''],
			country: [''],
			zipCode: ['']
		});
	}

	private updateProfileForm() {
		this.profileForm = this.formBuilder.group({
			userName: [this.user.userName],
			firstName: [this.user.firstName],
			lastName: [this.user.lastName],
			phoneNumber: [this.user.phoneNumber]
		});
	}

	updateProfile() {
		this.updateUser();
		this.accountService.updateUserProfile(this.user).pipe(take(1)).subscribe(user => {
			this.accountService.loadCurrentUser();
			console.log(user);
			this.snackBar.open('updated success', 'OK', {
				duration: 2000
			});
		}, error => {
			console.log(error);
			this.snackBar.open('error try later', 'OK', {
				duration: 2000
			});
		});
	}

	private updateUser() {
		this.user.firstName = this.profileForm.get('firstName').value;
		this.user.lastName = this.profileForm.get('lastName').value;
		this.user.userName = this.profileForm.get('userName').value;
		this.user.phoneNumber = this.profileForm.get('phoneNumber').value;
	}

	saveAddress() {
		if (this.showValidationMessage()) {
			return;
		} else {
			const address = new Address(
				0,
				this.addAddressForm.get('firstLine').value,
				this.addAddressForm.get('secondLine').value,
				this.addAddressForm.get('city').value,
				this.addAddressForm.get('state').value,
				this.addAddressForm.get('country').value,
				this.addAddressForm.get('zipCode').value
			);

			this.accountService.addAddress(this.user.id, address).pipe(take(1)).subscribe(address => {
				this.snackBar.open('address added', 'Ok', {duration: 2000});
				this.createOrClearAddressForm();
				this.accountService.loadCurrentUser();
			}, error => {
				this.snackBar.open('Error try later', 'Ok', {duration: 2000});
				console.log(error);
		});
		}
	}

	private showValidationMessage() {
		if (!(this.addAddressForm.get('firstLine').value as string).trim()) {
			this.snackBar.open('first line address is required', 'ok', {
				duration: 2000
			});
			return true;
		}
		if (!(this.addAddressForm.get('city').value as string).trim()) {
			this.snackBar.open('city is required', 'ok', {
				duration: 2000
			});
			return true;
		}
		if (!(this.addAddressForm.get('state').value as string).trim()) {
			this.snackBar.open('state is required', 'ok', {
				duration: 2000
			});
			return true;
		}
		if (!(this.addAddressForm.get('country').value as string).trim()) {
			this.snackBar.open('country is required', 'ok', {
				duration: 2000
			});
			return true;
		}
		if (!(this.addAddressForm.get('zipCode').value as string).trim()) {
			this.snackBar.open('zip code is required', 'ok', {
				duration: 2000
			});
			return true;
		}
		return false;
	}

	deleteAddress(id: number) {
		this.accountService.deleteAddress(id).pipe(take(1)).subscribe(address => {
			this.accountService.loadCurrentUser();
			this.snackBar.open('deleted succes', 'OK', {duration: 2000});
		}, error => this.snackBar.open('error try later', 'OK', {duration: 2000}));

	}

	toggleAddressForm() {
		this.showAddressForm = !this.showAddressForm;
	}
}

