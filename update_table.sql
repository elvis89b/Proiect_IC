ALTER TABLE fridge
    ADD COLUMN Ingredient TEXT   DEFAULT '(unknown)',
    ADD COLUMN Calories  INT     DEFAULT 0;