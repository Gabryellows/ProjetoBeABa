CREATE TABLE IF NOT EXISTS permissions (
  id SERIAL PRIMARY KEY,
  permission_lvl INT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  login TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  permission_id INT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS persons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  birth_dt DATE,
  phone TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  user_id INT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  registry TEXT,
  person_id INT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  FOREIGN KEY (person_id) REFERENCES persons(id)
);

CREATE TABLE IF NOT EXISTS adresses (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  house_number TEXT NOT NULL,
  complement TEXT NOT NULL,
  district TEXT NOT NULL,
  city TEXT NOT NULL,
  states TEXT NOT NULL,
  zipcode TEXT NOT NULL,
  person_id INT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  FOREIGN KEY (person_id) REFERENCES persons(id)
);


CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS providers (
  id SERIAL PRIMARY KEY,
  name TEXT,
  cnpj TEXT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  quantity_in_stock INT,
  price FLOAT,
  img_src TEXT,
  description TEXT,
  sale FLOAT,
  category_id INT,
  provider_id INT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (provider_id) REFERENCES providers(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  credit_card BOOLEAN,
  debit_card BOOLEAN,
  bank_clip BOOLEAN,
  pix BOOLEAN,
  installment INT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS shop_cart (
  id SERIAL PRIMARY KEY,
  person_id INT,
  transport INT,
  final_price FLOAT,
  order_status TEXT,
  payment_id INT,
  closed BOOLEAN,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  FOREIGN KEY (person_id) REFERENCES persons(id),
  FOREIGN KEY (payment_id) REFERENCES  payments(id)
);

CREATE TABLE IF NOT EXISTS shop_cart_products (
  id SERIAL PRIMARY KEY,
  shop_cart_id INT,
  product_id INT,
  quantity INT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,

  FOREIGN KEY (shop_cart_id) REFERENCES shop_cart(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
