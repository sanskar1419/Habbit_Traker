export default class HabitModel {
  constructor(habitName, totalTargetDays, weeklyTarget, _id) {
    this.id = _id;
    this.habitName = habitName;
    this.totalTargetDays = totalTargetDays;
    this.weeklyTarget = weeklyTarget;
  }

  static get() {
    return products;
  }
}
