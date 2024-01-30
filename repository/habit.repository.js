import mongoose from "mongoose";
import Habit from "../schema/habit.schema.js";
import Status from "../schema/habitStatus.schema.js";

export default class HabitRepository {
  getMonths() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames;
  }
  getDay() {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayNames;
  }
  async get() {
    try {
      let habits = await Habit.find({}).populate("habitStatus");
      return habits;
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async add(newHabit) {
    try {
      let existingHabit = await Habit.findOne({
        habitName: newHabit.habitName,
      });

      if (existingHabit) {
        return;
      }
      const createdHabit = new Habit(newHabit);
      // console.log(createdHabit);

      let dates = [];

      for (let i = 0; i < createdHabit.totalTargetDays; i++) {
        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth();
        let currentDate = new Date().getDate() + i;
        let totalDaysInMonth = new Date(
          currentYear,
          currentMonth + 1,
          0
        ).getDate();
        if (currentDate > totalDaysInMonth) {
          currentDate = currentDate - totalDaysInMonth;
          if (currentMonth != 11) {
            currentMonth++;
            totalDaysInMonth = new Date(
              currentYear,
              currentMonth + 1,
              0
            ).getDate();
          } else {
            currentMonth = 0;
            currentYear++;
            totalDaysInMonth = new Date(
              currentYear,
              currentMonth + 1,
              0
            ).getDate();
          }
        }

        let currentDay = new Date().getDay() + i;
        if (currentDay >= 7) {
          currentDay = currentDay % 7;
        }
        let currentDayName = this.getDay()[currentDay];
        let isDay;
        for (let day = 0; day < createdHabit.weeklyTargetDays.length; day++) {
          if (createdHabit.weeklyTargetDays[day] == currentDayName) {
            isDay = true;
            break;
          }
        }
        // console.log(isDay);
        if (!isDay) {
          continue;
        }

        let currentMonthName = this.getMonths()[currentMonth];
        const fullDate = `${currentDate}-${currentMonthName}-${currentYear}`;

        let createdHabitStatus = await Status.create({
          date: fullDate,
          dateStatus: "Not Yet Started",
          habitId: createdHabit._id,
        });
        createdHabit.habitStatus.push(createdHabitStatus);
      }
      await createdHabit.save();
      return createdHabit;
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async delete(id) {
    try {
      console.log(id);
      await Habit.deleteOne({ _id: id });
      await Status.deleteMany({ habitId: id });
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async getCurrentDate() {
    try {
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth();
      let currentDate = new Date().getDate();
      let currentMonthName = this.getMonths()[currentMonth];
      const TodayDate = `${currentDate}-${currentMonthName}-${currentYear}`;
      return TodayDate;
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async toggleDateStatus(data) {
    const result = await Status.updateOne(
      { _id: data[1] },
      { dateStatus: data[0] }
    );
    console.log(result);
    try {
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  async pastHistory(id) {
    try {
      let habit = await Habit.findOne({ _id: id }).populate("habitStatus");
      return habit;
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }
}
