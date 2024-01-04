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
	total_specimens VARCHAR (255) NOT NULL,
	a_h1n1 VARCHAR (255) NOT NULL,
	a_h3 VARCHAR (255) NOT NULL,
	a_no_subtype VARCHAR (255) NOT NULL,
	b VARCHAR (255) NOT NULL,
	bvic VARCHAR (255) NOT NULL,
	byam VARCHAR (255) NOT NULL,
	h3n2v VARCHAR (255) NOT NULL
	);

SELECT * FROM public_health;

UPDATE public_health
	SET total_specimens = '0',
		a_h1n1 = '0',
		a_h3 = '0',
		a_no_subtype = '0',
		b = '0',
		bvic = '0',
		byam = '0',
		h3n2v = '0'
	WHERE total_specimens = 'X';
	
ALTER TABLE public_health
	ALTER COLUMN total_specimens TYPE INT USING total_specimens::integer,
	ALTER COLUMN a_h1n1 TYPE INT USING a_h1n1::integer,
	ALTER COLUMN a_h3 TYPE INT USING a_h3::integer,
	ALTER COLUMN a_no_subtype TYPE INT USING a_no_subtype::integer,
	ALTER COLUMN b TYPE INT USING b::integer,
	ALTER COLUMN bvic TYPE INT USING bvic::integer,
	ALTER COLUMN byam TYPE INT USING byam::integer,
	ALTER COLUMN h3n2v TYPE INT USING h3n2v::integer;
	
SELECT * FROM public_health WHERE total_specimens = 0

CREATE TABLE ili (
	region_type VARCHAR(255) NOT NULL,
	region VARCHAR (255) NOT NULL,
	year INT NOT NULL,
	week INT NOT NULL,
	percent_unweighted VARCHAR (255) NOT NULL,
	ilitotal VARCHAR (255) NOT NULL,
	num_of_providers VARCHAR (255) NOT NULL,
	total_patients VARCHAR (255) NOT NULL
	);

SELECT * FROM ili;

UPDATE ili
	SET percent_unweighted = '0',
		ilitotal = '0',
		num_of_providers = '0',
		total_patients = '0'
	WHERE percent_unweighted = 'X';
	
ALTER TABLE ili
	ALTER COLUMN percent_unweighted TYPE FLOAT8 USING percent_unweighted::double precision,
	ALTER COLUMN ilitotal TYPE INT USING ilitotal::integer,
	ALTER COLUMN num_of_providers TYPE INT USING num_of_providers::integer,
	ALTER COLUMN total_patients TYPE INT USING total_patients::integer;
	
SELECT * FROM ili WHERE percent_unweighted = 0

COPY (
	SELECT json_agg(row_to_json(clinical))
	FROM clinical
	) TO 'C:\Users\Public\project_3_table_jsons'
	