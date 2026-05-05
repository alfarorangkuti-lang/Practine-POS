-- =========================================
-- POS DATABASE SCHEMA
-- =========================================

-- ======================
-- 1. CATEGORIES
-- ======================
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================
-- 2. PRODUCTS
-- ======================
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    current_stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE CASCADE
);

-- ======================
-- 3. STOCK ENTRIES (MODAL MASUK)
-- ======================
CREATE TABLE stock_entries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    qty INT NOT NULL,
    cost_price DECIMAL(14,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_stock_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);

-- ======================
-- 4. TRANSACTIONS
-- ======================
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_code VARCHAR(50) NOT NULL UNIQUE,
    total_amount DECIMAL(14,2) NOT NULL,
    payment_method ENUM('cash','qris','transfer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================
-- 5. TRANSACTION ITEMS
-- ======================
CREATE TABLE transaction_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,

    qty INT NOT NULL,
    sell_price DECIMAL(14,2) NOT NULL,
    cost_price DECIMAL(14,2) NOT NULL,

    subtotal DECIMAL(14,2) NOT NULL,

    CONSTRAINT fk_ti_transaction
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_ti_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);

-- ======================
-- INDEXES (PERFORMA)
-- ======================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_stock_product ON stock_entries(product_id);
CREATE INDEX idx_transactions_date ON transactions(created_at);
CREATE INDEX idx_ti_transaction ON transaction_items(transaction_id);
CREATE INDEX idx_ti_product ON transaction_items(product_id);

-- =========================================
-- END OF SCHEMA
-- =========================================