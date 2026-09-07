CREATE TABLE IF NOT EXISTS pontoTuristico(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cidade VARCHAR(155) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    categoria VARCHAR(155) NOT NULL,
    preco DECIMAL(10,2) NOT NULL DEFAULT 0
);

INSERT INTO pontoTuristico (nome, cidade, categoria, preco, descricao)
VALUES ('Cristo Redentor', 'Rio de Janeiro', 'Monumento', 0.00,
        'Uma das sete maravilhas do mundo moderno, localizado no topo do Corcovado.');