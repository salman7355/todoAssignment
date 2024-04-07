export class task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public date: String,
    public isCompleted: boolean = false,
    public isEditing: boolean = false
  ) {}
}
