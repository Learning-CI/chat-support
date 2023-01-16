import { InvalidNameError } from '../../../@shared/error/invalid-name-error';
import { InvalidAskerIdError } from '../../../@shared/error/invalid-number-error';

export class Asker {
  private readonly MIN_NAME_LENGTH = 5;
  private readonly MAX_NAME_LENGTH = 50;

  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.setId(id);
    this.setName(name);
  }

  private setId(id: number): void {
    if (!id || id <= 0) {
      throw new InvalidAskerIdError(id);
    }
    this.id = id;
  }

  private setName(name: string) {
    if (
      !name ||
      name.length < this.MIN_NAME_LENGTH ||
      name.length > this.MAX_NAME_LENGTH
    ) {
      throw new InvalidNameError(
        name,
        this.MIN_NAME_LENGTH,
        this.MAX_NAME_LENGTH,
      );
    }
    this.name = name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}
