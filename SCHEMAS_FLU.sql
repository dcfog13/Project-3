CREATE TABLE clinical (
	region_type VARCHAR(255) NOT NULL,
	region VARCHAR (255) NOT NULL,
	year INT NOT NULL,
	week INT NOT NULL,
	total_specimens VARCHAR (255) NOT NULL,
	total_a VARCHAR (255) NOT NULL,
	total_b VARCHAR (255) NOT NULL,
	percent_positive VARCHAR (255) NOT NULL,
	percent_a VARCHAR (255) NOT NULL,
	percent_b VARCHAR (255) NOT NULL
	);
	
SELECT * FROM clinical;
	
UPDATE clinical
	SET total_specimens = '0', 
		total_a = '0', 
		total_b = '0', 
		percent_positive = '0', 
		percent_a = '0', 
		percent_b = '0'
	WHERE total_specimens = 'X';
	
ALTER TABLE clinical
	ALTER COLUMN total_specimens TYPE INT USING total_specimens::integer,
	ALTER COLUMN total_a TYPE INT USING total_a::integer,
	ALTER COLUMN total_b TYPE INT USING total_b::integer,
	ALTER COLUMN percent_positive TYPE FLOAT USING percent_positive::float,
	ALTER COLUMN percent_a TYPE FLOAT USING percent_a::float,
	ALTER COLUMN percent_b TYPE FLOAT USING percent_b::float;
	
SELECT * FROM clinical WHERE total_specimens = 0
	
CREATE TABLE public_health (
	region_type VARCHAR(255) NOT NULL,
	region VARCHAR (255) NOT NULL,
	season_description VARCHAR (255) NOT NULL,
	total_specimens VARCHAR (255),
	a_h1n1 VARCHAR (255),
	a_h3 VARCHAR (255),
	a_no_subtype VARCHAR (255),
	b VARCHAR (255),
	bvic VARCHAR (255),
	byam VARCHAR (255),
	h3n2v VARCHAR (255)
	);

SELECT * FROM public_health	

Create table ili (
	region_type VARCHAR(255) NOT NULL,
	region VARCHAR (255) NOT NULL,
	year INT NOT NULL,
	week INT NOT NULL,
	percent_weighted VARCHAR (255),
	percent_unweighted VARCHAR (255),
	age_0_4 VARCHAR (255),
	age_25_49 VARCHAR (255),
	age_25_64 VARCHAR (255),
	age_5_24 VARCHAR (255),
	age_50_64 VARCHAR (255),
	age_65 VARCHAR (255),
	ilitotal VARCHAR (255),
	num_of_providers VARCHAR (255),
	total_patients VARCHAR (255)
	);
	
SELECT * FROM ili
	