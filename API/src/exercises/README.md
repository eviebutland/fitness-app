
CREATE TABLE exercises (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description VARCHAR(500) NOT NULL,
	restTime VARCHAR(150) NOT NULL, 
	recommendedRepRange BIGINT NOT NULL,
	catergory VARCHAR(30) NOT NULL,
	intensity BIGINT NOT NULL,
	isCompound BOOLEAN NOT NULL,
	exerciseTime BIGINT NOT NULL,
	video VARCHAR(200) NOT NULL,
	variations VARCHAR(500)
)