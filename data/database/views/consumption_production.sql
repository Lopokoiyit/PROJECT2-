DROP VIEW IF EXISTS consumption_production;
CREATE VIEW consumption_production AS
SELECT a.state, MAX(c.financial_year) AS financial_year, SUM(a.energy_production_gwh) AS energy_production_gwh, ROUND(AVG(b.energy_consumption_pj),2) energy_consumption_pj
FROM state_production a
RIGHT JOIN state_consumption b
ON a.state = b.state AND a.year_id = b.year_id
LEFT JOIN financial_year c
ON a.year_id = c.year_id
GROUP BY a.state, a.year_id
ORDER BY a.year_id, a.state;
SELECT * FROM consumption_production