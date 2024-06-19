import { JsonPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
	ValidationErrors,
	Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';

export interface Address {
	street: string;
	city: string;
	postcode: string;
}

@Component({
	selector: 'app-address-form',
	standalone: true,
	imports: [ReactiveFormsModule, JsonPipe],
	templateUrl: './address-form.component.html',
	styleUrl: './address-form.component.css',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: AddressFormComponent
		},
		{
			provide: NG_VALIDATORS,
			multi: true,
			useExisting: AddressFormComponent
		}
	]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy, Validator {
	form = new FormGroup({
		street: new FormControl<string>(''),
		city: new FormControl<string>(''),
		postcode: new FormControl<string>('')
	});

	onTouched: Function = () => {};
	onChangeSubs: Subscription[] = [];

	ngOnDestroy(): void {
		this.onChangeSubs.forEach(sub => sub.unsubscribe());
	}

	writeValue(value: Partial<Address>): void {
		if (value) {
			this.form.patchValue(value, { emitEvent: false });
		}
	}

	registerOnChange(fn: any): void {
		console.log('registerOnChange');
		const sub = this.form.valueChanges.subscribe(val => fn(val));
		this.onChangeSubs.push(sub);
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(disabled: boolean) {
		if (disabled) {
			this.form.disable();
		} else {
			this.form.enable();
		}
	}

	validate(control: AbstractControl<any, any>): ValidationErrors | null {
		if (this.form.valid) return null;
		return { address: 'Invalid' };
	}
}
