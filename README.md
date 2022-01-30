# controle-estoque-e-solicitacoes
Sistema de Controle de Estoque, Equipamentos, Notas Fiscais e Solicitações de Compras do setor de TI.

Comandos para a criação do banco de dados no arquivo "sql.txt".

Módulos de licenças, Notas Fiscais e Solicitações ainda não implementados.

Para o Controle de Estoque e Computadores, falta apenas a paginação que sera adiciona em breve
===================================================================================================

Para começar a cadastrar os itens do depósito, deve-se primeiro cadastrar suas dependências, que são categoria, unidade de medida e modelo. 
Vale lembrar que o modelo é diretamente e instriscicamente conectados a categoria. Uma categoria pode ter varios modelos atrelados a ela.

Para cadastrar os computadores, também deve-se cadastrar suas dependências, que são localização e setor. O setor é diretamente ligado a localização. Um local pode ter diversos setores.

Use o seguinte comando para criar o primeiro usuário Administrador:
"INSERT INTO tb_usuarios (nome, usuario, senha, cargo) VALUES ('Administrador', 'Administrador', md5('senha'), 'Administrador');

Após isso, basta acessar o endreço "/administrador" e fazer o login para acessar a área administrativa.
