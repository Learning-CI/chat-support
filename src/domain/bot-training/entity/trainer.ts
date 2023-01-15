import { InvalidNameError } from "../../../@shared/error/invalid-name-error";

export class Trainer {

  private readonly MIN_NAME_LENGTH = 3;
  private readonly MAX_NAME_LENGTH = 20;

  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.setName(name);
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public changeName(newName: string): void {
    this.setName(newName);
  }

  private setName(name: string): void {
    if (!name || name.length < this.MIN_NAME_LENGTH || name.length > this.MAX_NAME_LENGTH) {
      throw new InvalidNameError(name, this.MIN_NAME_LENGTH, this.MAX_NAME_LENGTH)
    }
    this.name = name
  }

}
