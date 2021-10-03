import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { validateID } from 'ytdl-core';

@ValidatorConstraint({ name: 'Youtube ID', async: false })
export class YoutubeIDValidator implements ValidatorConstraintInterface {
	validate(text: string, args: ValidationArguments): boolean {
		return validateID(text);
	}
}
