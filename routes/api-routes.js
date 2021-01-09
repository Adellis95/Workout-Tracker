const db = require("../models");

module.exports = function(app) {

    app.get("/api/workouts", (req, res) => {

        db.Workout.find({}).then(dbWorkout => {
            dbWorkout.forEach(workout => {
                let total = 0;
                workout.exercise.forEach(e => {
                    console.log("Exercise");
                    console.log(e);
                    total += e.duration;
                });
                workout.totalDuration = total;
            });
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    app.post("/api/workouts", ({ body }, res) => {
        console.log("Workout to be added!!");
        console.log(body);

        db.Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

    
}