## Creating a new user

In order to create a new user, I needed to create a new type as was unable to find a data type for my object workoutPreferences

```
const workoutPreferences = {
    monday: 'LEGS',
    tuesday: 'UPPER',
    wednesday: 'CARDIO',
    thursday: 'FULL_BODY',
    friday: 'REST',
    saturday: 'CARDIO',
    sunday: 'REST',
}
```

In order to allow this format of data, I created a new type and added a new column to the table with that type:

```
CREATE TYPE weekdayPreference AS (
	monday varChar(150),
	tuesday varChar(150),
	wednesday varChar(150),
	thursday varChar(150),
	friday varChar(150),
	saturday varChar(150),
	sunday varChar(150)
)

ALTER TABLE users
ADD workoutPreference weekdayPreference

```

```

```
