-- seed.sql
-- Optional: insert sample rows for development.
-- psql -U postgres -d dpmc_db -f seed.sql

INSERT INTO deposit_codes (name, id_number, code) VALUES
  ('Sihan Udayaratna', '200434100891', 'Sihan00891'),
  ('Kamal Perera',     '198756234512', 'Kamal34512'),
  ('Nimal Silva',      '197023456789', 'Nimal56789');
