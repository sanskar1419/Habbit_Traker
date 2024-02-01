// Importing and creating instances of module and npm packages
import Habit from "../schema/habit.schema.js";
import Status from "../schema/habitStatus.schema.js";

// Defining HabitRepository class
export default class HabitRepository {
  // Method for returning all month name
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

  // Method for returning all day name
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

  // Method for return all the habit from DB
  async get() {
    try {
      let habits = await Habit.find({}).populate("habitStatus");
      return habits;
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  // Method for add new data to the DB
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

  // Method to delete a habit DB
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

  // Method to return current Date
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

  // Method to save the toggle data in DB
  async toggleDateStatus(data) {
    let currentDate = new Date();
    let habitPassedStatus = await Status.findOne({ _id: data[1] });

    let habitCurrentDate = habitPassedStatus.date.split("-");

    const habitCurrentDateIndex = this.getMonths().findIndex(
      (monthName) => monthName == habitCurrentDate[1]
    );

    let newHabitCurrentDate = new Date(
      habitCurrentDate[2],
      habitCurrentDateIndex,
      habitCurrentDate[0]
    );

    console.log(currentDate);
    console.log(newHabitCurrentDate);

    if (newHabitCurrentDate <= currentDate) {
      const result = await Status.updateOne(
        { _id: data[1] },
        { dateStatus: data[0] }
      );
    } else {
      return "Can't modify upcoming date. Please come on same date";
    }

    try {
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  // Method to return habit based on ID
  async pastHistory(id) {
    try {
      let habit = await Habit.findOne({ _id: id }).populate("habitStatus");
      return habit;
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }

  // Method to return seven days
  async getSevenDays(createdAt) {
    try {
      let sevenDays = [];
      for (let i = 0; i < 7; i++) {
        let currentYear = createdAt.getFullYear();
        let currentMonth = createdAt.getMonth();
        let currentDate = createdAt.getDate() + i;
        let totalDaysInMonth = new Date(
          currentYear,
          currentMonth + 1,
          0
        ).getDate();

        // console.log(currentYear, currentDate, currentMonth, totalDaysInMonth);
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
        let currentDay = createdAt.getDay() + i;
        if (currentDay >= 7) {
          currentDay = currentDay % 7;
        }
        let currentDayName = this.getDay()[currentDay];
        let currentMonthName = this.getMonths()[currentMonth];
        let formatDate = `${currentDate}-${currentMonthName}-${currentYear}`;

        let day = {
          formatDate: formatDate,
          year: currentYear,
          date: currentDate,
          month: currentMonth,
          totalDaysInMonth: totalDaysInMonth,
          dayName: currentDayName,
          monthName: currentMonthName,
        };

        sevenDays.push(day);
      }
      return sevenDays;
    } catch (err) {
      console.log(err);
      throw new Error("Something Went Wrong");
    }
  }
}
