-- drop table statements
DROP TABLE fuel_source;
DROP TABLE industries;
DROP TABLE states;

DROP TABLE state_production;
DROP TABLE state_consumption;
DROP TABLE state_productivity;
DROP TABLE industry_consumption;

-- create tables OUTER

CREATE TABLE states (
	state TEXT PRIMARY KEY
);

CREATE TABLE financial_year (
	year_id INT PRIMARY KEY,
	financial_year TEXT NOT NULL
);

CREATE TABLE fuel_source (
	fuel_id INT PRIMARY KEY,
	fuel_source TEXT NOT NULL,
	renewable BOOLEAN NOT NULL
);

CREATE TABLE industries (
	industry_id INT PRIMARY KEY,
	industry TEXT NOT NULL
);

-- create tables INNER

CREATE TABLE state_production (
	year_id INT REFERENCES financial_year (year_id),
	state TEXT REFERENCES states (state),
	fuel_id INT REFERENCES fuel_source (fuel_id),
	energy_production_gwh NUMERIC,
	PRIMARY KEY (year_id, state)
);

CREATE TABLE state_consumption (
	year_id INT REFERENCES financial_year (year_id),
	state TEXT REFERENCES states (state),
	population INT,
	gsp_$_million INT,
	energy_consumption_pj NUMERIC,
	PRIMARY KEY (year_id, state)
);

CREATE TABLE state_productivity (
	year_id INT REFERENCES financial_year (year_id),
	state TEXT REFERENCES states (state),
	consumption_per_capita_gj_person NUMERIC,
	energy_intensity_gj_$_million NUMERIC,
	energy_productivity_$_million_pj NUMERIC,
	PRIMARY KEY (year_id, state)
);

CREATE TABLE industry_consumption (
	year_id INT REFERENCES financial_year (year_id),
	state TEXT REFERENCES states (state),
	industry_id INT REFERENCES industries (industry_id),
	energy_consumption_pj NUMERIC,
	PRIMARY KEY (year_id, state)
);


