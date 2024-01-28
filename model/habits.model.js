export default class HabitModel {
  constructor(habitName, totalTargetDays, weeklyTargetDays, _id) {
    this.id = _id;
    this.habitName = habitName;
    this.totalTargetDays = totalTargetDays;
    this.weeklyTargetDays = weeklyTargetDays;
  }
}
