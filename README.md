# controle-estoque-e-solicitacoes
Sistema de Controle de Estoque, Equipamentos, Notas Fiscais e Solicitações de Compras do setor de TI.

Comandos para a criação do banco de dados no arquivo "sql.txt".

Módulos de licenças, Notas Fiscais e Solicitações ainda não implementados.

Lembre-se de alterar a senha do arquivo config/database para o do seu banco de dados, assim como no ultimo comando do arquivo slq.txt

===================================================================================================

Para começar a cadastrar os itens do depósito, deve-se primeiro cadastrar suas dependências, que são categoria, unidade de medida e modelo. 
Vale lembrar que o modelo é diretamente e instriscicamente conectados a categoria. Uma categoria pode ter varios modelos atrelados a ela.

Para cadastrar os computadores, também deve-se cadastrar suas dependências, que são localização e setor. O setor é diretamente ligado a localização. Um local pode ter diversos setores.


Basta acessar o endreço "/administrador" e fazer o login para acessar a área administrativa.
login: Administrador
senha: senhaDeposito
