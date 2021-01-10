const db = require("../models");

module.exports = function(app) {

    // comment in to prepopulate the database
    // db.Workout.find({}).then(function (res) {
    //     console.log("Checking if db is populated");
    //     if (res.length === 0) {
    //         console.log("Database is empty!");
    //         require("./seeders/seed.js");
    //     }
    // });

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

        db.Workout.create(body).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    app.put("/api/workouts/:id", (req, res) => {

        db.Workout.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { totalDuration: req.body.duration },
                $push: { exercises: req.body }
            },
            { new: true }
        ).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/range", (req, res) => {

        db.Workout.find({}).then(dbWorkout => {
            console.log("All Workouts");
            console.log("dbWorkout");

            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });
}