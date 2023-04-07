```
CREATE TABLE workoutPlans (
    id integer NOT NULL DEFAULT nextval('workoutPlan_id_seq'::regclass) UNIQUE,
    title VARCHAR(200),
    workout jsonb,
    plan_name VARCHAR(100)
)
```
