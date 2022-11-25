### Fitness App

## Database

PostgreSQL is the database for this project. I have decided to use postgreSQL to build my knowledge of relational databases. It is free to use and [links well](https://insights.stackoverflow.com/survey/2020#correlated-technologies) to Python which I would like to learn soon. Postgres is a general purpose object-relational database

I have created a single client instead of creating a pool to ensure ACID transcations. A pool means there are multiple clients that can be used, this is the default use of node-postgres.

## node-postgres

[Transcations](https://node-postgres.com/features/transactions).
[pg-pool](https://www.npmjs.com/package/pg-pool)

Dummy data from: [Mockeroo](https://www.mockaroo.com/)

### Tables

Create a table for workout preferences. This will be referenced by Users table, but has a relation to the workout table. To create this table, I ran this command

```
CREATE TABLE workoutPreference (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	monday INT,
	tuesday INT,
	wednesday INT,
	thursday INT,
	friday INT,
	saturday INT,
	sunday  INT,
	CONSTRAINT fk_monday FOREIGN KEY(monday) REFERENCES workouts(id),
	CONSTRAINT fk_tuesday FOREIGN KEY(tuesday) REFERENCES workouts(id),
	CONSTRAINT fk_wednesday FOREIGN KEY(wednesday) REFERENCES workouts(id),
	CONSTRAINT fk_thursday FOREIGN KEY(thursday) REFERENCES workouts(id),
	CONSTRAINT fk_friday FOREIGN KEY(friday) REFERENCES workouts(id),
	CONSTRAINT fk_saturday FOREIGN KEY(saturday) REFERENCES workouts(id),
	CONSTRAINT fk_sunday FOREIGN KEY(sunday) REFERENCES workouts(id)
)

CREATE TABLE workouts (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(20),
	set_1 INT,
	set_2 INT,
	set_3 INT
)


// To alter the table once made
ALTER TABLE workouts
ADD CONSTRAINT fk_set_3 FOREIGN KEY(set_3) REFERENCES exercises(id)

```

Joins
This platform has lots of relating tables. For example, the workout table is built from a list of exercises which lives in the exercise table. Below we are using a LEFT JOIN to match the id within the set_1 column of the workout table to find the name of this exercise.

```
SELECT workouts.name as workoutName, set_1, exercises.name AS name FROM workouts
LEFT JOIN exercises ON workouts.set_1 = exercises.id
```
