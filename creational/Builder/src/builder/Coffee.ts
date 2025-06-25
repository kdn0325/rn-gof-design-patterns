export class Coffee {
  size?: string;
  type?: string;
  milk?: string;
  extraShots: number = 0;

  describe(): string {
    return `${this.size} ${this.milk} ${this.type} with ${this.extraShots} extra shot(s)`.replace(
      / undefined/g,
      ""
    );
  }
}
