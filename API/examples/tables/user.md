```
CREATE TABLE users_archive (
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass) UNIQUE,
    name VARCHAR(30),
    email VARCHAR(30) UNIQUE NOT NULL,
    age BIGINT NOT NULL,
    password VARCHAR(30000),
    levelofaccess VARCHAR(150),
    premium VARCHAR(150),
    completedworkouts jsonb,
    permissions VARCHAR(50),
    workoutpreference VARCHAR(1000),
    token VARCHAR(500),
    status VARCHAR(50)
);
```

```
INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference, token, status)
  VALUES ('Evie', '23', 'evie.butland@gmail.com', '$2b$10$8a5wB4EZ1GYyrzN52K64EeVY28RbXczy7Kefobphfgtv4AhumX07C', 'subscriber', 'monthly', '[
  {
    "name": "lower",
    "workoutId": "3"
  },
  {
    "name": "glutes",
    "workoutId": "6"
  },
  {
    "name": "glutes",
    "workoutId": "7"
  },
  {
    "name": "upper",
    "workoutId": "4"
  },
  {
    "name": "full body",
    "workoutId": "5"
  },
  {
    "name": "full body",
    "workoutId": "2"
  },
  {
    "name": "full body",
    "workoutId": "5"
  },
  {
    "name": "full body",
    "workoutId": "2"
  },
  {
    "name": "full body",
    "workoutId": "5"
  },
  {
    "name": "glutes",
    "workoutId": "6"
  },
  {
    "name": "glutes",
    "workoutId": "7"
  },
  {
    "name": "glutes",
    "workoutId": "7"
  },
  {
    "name": "glutes",
    "workoutId": "6"
  },
  {
    "name": "glutes",
    "workoutId": "7"
  },
  {
    "name": "glutes",
    "workoutId": "6"
  },
  {
    "name": "glutes",
    "workoutId": "7"
  },
  {
    "name": "upper",
    "workoutId": "4"
  },
  {
    "name": "full body",
    "workoutId": "5"
  },
  {
    "name": "full body",
    "workoutId": "2"
  },
  {
    "name": "full body",
    "workoutId": "2"
  },
  {
    "name": "full body",
    "workoutId": "5"
  },
  {
    "name": "full body",
    "workoutId": "2"
  },
  {
    "name": "full body",
    "workoutId": "5"
  },
  {
    "name": "full body",
    "workoutId": "2"
  }
]', 'rw:user', '{"monday":"FULL BODY","tuesday":"FULL BODY","wednesday":"LOWER","thursday":"GLUTES","friday":"UPPER","saturday":"GLUTES","sunday":"FULL BODY"}', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoiZXZpZS5idXRsYW5kQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiUGFzc3dvcmQiLCJpYXQiOjE2ODA1OTA4NDUsImV4cCI6MTY4MDU5NDQ0NX0.mPWQkfTMDJdpCDW3aY54xyCiBFK3wE0NUlHu2Fl16QI', 'active')
  ON CONFLICT (id) DO NOTHING
```
