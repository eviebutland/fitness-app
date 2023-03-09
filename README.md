### Fitness App

Requirements:

- Create an bank of exercises that can be used to make up workouts
- Send a daily email to the user based off their workout preferences
- Restrict users access based on their permissions or level of cover (as if it was a subscription model)
- Build IOS app to be freely available on App store

<details>
  <summary>Backend</summary>

## Database

PostgreSQL is the database for this project. I have decided to use postgreSQL to build my knowledge of relational databases. It is free to use and [links well](https://insights.stackoverflow.com/survey/2020#correlated-technologies) to Python which I would like to learn soon. Postgres is a general purpose object-relational database

I have created a single client instead of creating a pool to ensure ACID transcations. A pool means there are multiple clients that can be used, this is the default use of node-postgres.

After starting to build out various tables and join these where needed, I have found that I need the shape of the workout table to be more flexible to fit the requirements. In this case, I believe a document database would provide a more flexible structure for a group of data that does not follow a strict pattern.

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

### API

The purpose of this API is to provide daily workouts to users via email based off their preferences. The users with level of access set to 'subscriber' will be able to provide their workout preference (Monday: LOWER) and be sent an email with a lower body workout.

Currently, these workouts are hardcoded for specific exercises but would like to evolve this in the future to generate its own workouts based of type, intensity, time range etc.

#### Authentication

I have looked into using the google OAuth2 stratergy offered by [PassportJS](https://www.passportjs.org/) but soon realised that this required a front end to allow the users to enter the google account information in. I then moved to use passport-http-bearer instead which allowed me to authenticate by using a bearer token, generated using [JWT](https://www.npmjs.com/package/jsonwebtoken)

I learnt that OAuth2 is about allowing a service to make use of another service for authentication on behalf of the user. This can be helful for users that don't want to make a new account per website, but make use of an existing one such as Facebook or Google. For example, this is made use of on ASOS website. I have decided this is functionality I would like to add once I have a UI. [OAuth2orize](https://github.com/jaredhanson/oauth2orize)

#### Email providers

I am using [courier](https://www.courier.com/), this is an API that can manage multiple communications in one place. Initially, I have set up for Gmail API to send my daily emails. However, it can allow for intergrations to allow for SMS, push notifications, slack messages and more. This was relatively simple to set up and can be updated easily to use a different provider if needed. I intend to customise the templates to provide the workouts in a simple but effective style.

Generating workouts:
My initial thoughts on this project was to have the workouts generate themselves based off of exercise types (i.e select 3 upper body exercises and this would be a workout). However, since researching more into existing workout guides available, I have found that most, if not all, are structured in a plan. This is where there are 8/12 weeks worth of exercises premade and ready to use. However, since I have collected user data on workout preference, I will continue to use the current set up.

</details>

<details>
	<summary>Front end</summary>

## Design

I used [colours](https://coolors.co/palettes/trending) to help come up with a theme for the app.
In order to come up with the app design, I used figma. The (design)[https://www.figma.com/file/59aPmG1T2pi5FI4jkeCiCb/Fitness-app?node-id=0%3A1&t=7VFoLryLTXKuyfNq-0] was inspired by a fitness app I currently use and pay a subscription for. I also used (Dribbble)[https://dribbble.com/] to help my idea come to life. For the logo/main icon, I used (Humaaans)[https://www.humaaans.com/]

## Framework

When deciding what framework to use, I had 3 in mind.

1. [Capacitor](https://capacitorjs.com/docs/ios) -
   I have used capacitor at my work place to wrap up a nuxt SPA into a mobile app. This seemed like the most natural option as already have experience using it. However, I wanted to try something new and experiment
2. [Native script and Vue](https://nativescript-vue.org/) -
   My next option would to make use of a Nativescript plugin that allows you to use Vue.js.
3. React Native -
   I decided on using React native as they have a large support and lots of documentation.

## State management

In order to provide some state management across the app, I looked into redux, using the [context API](https://beta.reactjs.org/reference/react/useContext) and [Recoil](https://recoiljs.org/docs/introduction/getting-started).

I decided against using Redux as felt it was too heavy duty for this size of application.
Recoil uses 'Atoms', these are unique functions that return an object containing state. They must have a unique key. In order to get and set this, we use useRecoilState().

```
const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});
...
 const [text, setText] = useRecoilState(textState);
```

Selectors are similar to computed functions in Vue, where we can transform and manipulate data. In order to access this, we call useRecoilValue().

```
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState); // refrences the atom here

    return text.length;
  },
});
...
const count = useRecoilValue(charCountState)
```

</details>

## Form validation

For form validation, I decided to go with [React hook form](https://react-hook-form.com/).

## Future features

I currently have a hard coded step count within the app, however, i would like to be able to pull in health data already recorded within Apple.[ Health data integration](https://github.com/agencyenterprise/react-native-health)
