import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Address, AddressFormComponent } from './address-form/address-form.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ReactiveFormsModule, JsonPipe, AddressFormComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	form = new FormGroup({
		name: new FormControl<string>(''),
		email: new FormControl<string>(''),
		primaryAddress: new FormControl<Address | null>(null),
		otherAddresses: new FormArray<FormControl<Address | null>>([])
	});

	addAddress(): void {
		this.form.controls.otherAddresses.push(new FormControl<Address | null>(null));
	}

	addPredefinedAddress(): void {
		this.form.controls.otherAddresses.push(
			new FormControl<Address | null>({
				street: '123 Fake St',
				city: 'Springfield',
				postcode: '12345'
			})
		);
	}
}
