# Mercado autônomo

## Introdução

Recebemos uma demanda para realizar a criação de uma API REST. Essa API será utilizada para organização do estoque de uma startup em processo de testes que pretende se transformar em uma rede de mercados autônomos (Smart Store). Hoje o mercado trabalha com apenas dois tipos de produtos: **comida** e **limpeza**.

Como iremos controlar o estoque do mercado, nossa aplicação deverá ter rotas para a **_criação_**, **_listagem_**, **_atualização_** e **_deleção_** de produtos.

Vamos colocar a mão <s>na massa</s> no código!

#

    O repositório da entrega conta com o arquivo chamado *market_workspace*. Esse arquivo é um documento de design utilizado no *insomnia*.
    Ele contém todas as rotas necessárias para que a aplicação esteja de acordo com as regras impostas.
    Esse arquivo também será utilizado por instrutores e monitores na correção das entregas.

    O workspace em questão possui duas páginas:
      * Pagina para Debug:
        - pode ser utilizado a vontade e ter seus valores para criação, listagem, atualização ou deleção, alterados sem problemas.

      * Pagina para Testes:
        - ***NUNCA ALTERE NENHUM TESTE OU ROTA DA PÁGINA DE TESTES***;
        - para executar os testes é importante ressaltar:
          - você precisa utilizar a enviroment **test**;
          - você deve realizar ao menos uma requisição em cada uma das rotas de debug da pagina *Rotas para Testes*, antes de executar os testes.
          - ATENÇÃO: sempre REINICIE o servidor a cada novo teste ou bateria de testes, que for executar;

#

## Regras da entrega

A entrega deve seguir as seguintes regras ou será zerada:

-   O código deve estar em TypeScript.
-   Não deve ser utilizada nenhuma outra tecnologia além das apresentadas e utilizadas nessa sprint.
-   A organização de arquivos deve seguir o que foi visto previamente (**_app.ts_**, **_interfaces.ts_**, **_logics.ts_**, **_database.ts_**, **_middlewares.ts_**).
-   Uma constante **market** deve ser criada em seu arquivo database.ts.
    -   Deverá ser um array vazio utilizado para simular o banco de dados.
-   Todas as **funções** e **atributos** devem ser nomeados **de acordo com o solicitado**.
    -   **_Caso não esteja de acordo com o estabelecido, será descontado nota._**

#

## Interfaces da aplicação

Irão existir dois tipos de produtos, **_Food Product_** e **_Cleaning Product_**. Ambos terão as mesmas informações, contando apenas com uma adição do atributo **_calories_** nos produtos do tipo **_food_**.

Para a tipagem dos produtos, deverão ser criadas 3 interfaces:

-   **IProduct** representando os dados em comum entre os dois tipo de produtos;
-   **ICleaningProduct** extendendo de IProduct;
-   **IFoodProduct** também extendendo de IProduct e contendo os dados a mais que os produtos alimentícios tem.

### **IProduct**

#### Atributos

-   **id**:
    -   Tipo: **number**;
    -   Representa o número de identificação **único** do produto;
-   **name**:
    -   Tipo **string**;
    -   Representa o **nome** do produto.
-   **price**:
    -   Tipo: **number**;
    -   Representa o **preço** do produto;
    -   Será enviado na menor casa possível, ou seja, em **centavos**.
-   **weight**:
    -   Tipo: **number**;
    -   Representa o **peso** do produto;
    -   Será enviado na menor casa possível, ou seja, em **gramas**.
-   **section**:
    -   Tipo: **_"food"_** ou **_"cleaning"_**;
    -   Representa a **seção** que o produto pertence
-   **expirationDate**:
    -   Tipo: **Date**;
    -   Esse atributo deverá ser gerado automáticamente, pela função de criação do produto;
    -   Representa a **data de expiração** do produto;

### **ICleaningProduct**

Estende a interface **IProduct** e não acrescenta nenhum atributo a mais.

### **IFoodProduct**

Deve estender da interface **IProduct** acrescentando o seguinte atributo:

#### Atributo

-   **calories**:
    -   Tipo: **number**;
    -   Representa as **calorias** do produto.

#

## Endpoints da aplicação

| Método | Endpoint      | Responsabilidade                                                        |
| ------ | ------------- | ----------------------------------------------------------------------- |
| POST   | /products     | Criar e adicionar os produtos ao mercado                                |
| GET    | /products     | Listar todos os produtos do mercado, sendo possível listar pela section |
| GET    | /products/:id | Listar um produto específico através do seu id                          |
| PATCH  | /products/:id | Atualizar os dados de um produto através do seu id                      |
| DELETE | /products/:id | Deletar o produto a partir do seu id                                    |

#

## Middlewares da aplicação

### **Verificação de nome existente**

-   Esse middleware deverá verificar se o **_name_** enviado pelo **_request.body_** já existe no banco.
-   Deverá ser utilizado nas rotas:
    -   POST /products;
    -   PATCH /products/:id.
-   Pode ser criado um único middleware para as rotas **POST** e **PATCH**, ou podem ser criados middlewares separados, um para a rota de **POST** e outro para a rota de **PATCH**.
-   Caso o produto **já exista** deverá ser retorando um erro com status code **_409 CONFLICT_**.

| Resposta do servidor:                |
| ------------------------------------ |
| **Formato Json**                     |
| **Status code:** **_409 CONFLICT._** |

```json
{
    "error": "Product already registered"
}
```

### **Verificação se o id buscado existe**

-   Esse middleware deverá verificar se o **_id_** enviado por **_route params_** existe de fato no banco;
-   Deverá ser criado apenas um middleware e utilizado nas rotas:
    -   GET /products/:id;
    -   PATCH /products/:id;
    -   DELETE /products/:id.
-   Caso o produto não exista deverá ser um erro com status code **_404 NOT FOUND_**.

| Resposta do servidor:                 |
| ------------------------------------- |
| **Formato Json**                      |
| **Status code:** **_404 NOT FOUND._** |

```json
{
    "error": "Product not found"
}
```

#

## Regras da aplicação

### **POST /products**

### Envio:

-   Deverá ser possível criar vários produtos de uma só vez, portanto, o envio dessa rota deve ser um array de objetos contendo todos os produtos que deverão ser cadastrados.
-   O **id** não deve ser enviado e sim criado de forma automática. Deve ser um número sequencial e não deve ser repetir.
-   O **expirationDate** não deve ser enviado e sim criado de forma automática pelo servidor. O valor deverá ser de 365 dias a partir da data de criação do produto.

### Retorno:

-   Um objeto contendo duas chaves:
    -   **total**:
        -   Tipo: number;
        -   Deve ser a soma do preço de todos os produtos adicionados ao mercado;
    -   **marketProducts**:
        -   Tipo: array;
        -   Deve conter **TODOS** os produtos adiconados ao market no momento da criação.

## Exemplos de envio da requisição

| **Corpo de envio da requisição:** |
| --------------------------------- |
| **Formato Json**                  |

```json
[
    {
        "name": "Queijo",
        "price": 10,
        "weight": 30,
        "calories": 300,
        "section": "food"
    },
    {
        "name": "Presunto",
        "price": 100,
        "weight": 40,
        "calories": 1100,
        "section": "food"
    },
    {
        "name": "Detergente",
        "price": 10,
        "weight": 1000,
        "section": "cleaning"
    }
]
```

| **Resposta do servidor:**           |
| ----------------------------------- |
| **Formato Json**                    |
| **Status code:** **_201 CREATED._** |

```json
{
 "total": 120,
 "marketProducts": [
  {
   "id": 1,
   "name": "Queijo",
   "price": 10,
   "weight": 30,
   "calories": 300,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  },
  {
   "id": 2,
   "name": "Presunto",
   "price": 100,
   "weight": 40,
   "calories": 1100,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
  {
   "id": 3,
   "name": "Detergente",
   "price": 10,
   "weight": 1000,
   "section": "cleaning",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
 ]
}
```

### **GET /products**

-   Deverá ser possível listar todos os produtos do mercado;

### Retorno:

-   Um objeto contendo duas chaves:
    -   **total**:
        -   Tipo: number;
        -   Deve ser a soma do preço de todos os produtos no market;
    -   **marketProducts**:
        -   Tipo: array;
        -   Deve conter **todos** os produtos encontrados no market.

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: **/products**.
| Resposta do servidor: |
| - |
| **Formato Json** |
| **Status code:** **_200 OK._** |

```json
{
 "total": 120,
 "marketProducts": [
  {
   "id": 1,
   "name": "Queijo",
   "price": 10,
   "weight": 30,
   "calories": 300,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  },
  {
   "id": 2,
   "name": "Presunto",
   "price": 100,
   "weight": 40,
   "calories": 1100,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
  {
   "id": 3,
   "name": "Detergente",
   "price": 10,
   "weight": 1000,
   "section": "cleaning",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
 ]
}
```

### **GET /products/:id**

-   Deve ser possível listar as informações de um produto com base em seu **_id_**;
-   O **_id_** do produto deverá ser coletado através do **_route param_**.

### Exemplo de retorno:

#### Sucesso:

O exemplo abaixo foi realizado na seguinte rota: **/products/1**.
| Resposta do servidor: |
| - |
| **Formato Json** |
| **Status code:** **_200 OK._** |

```json
{
    "id": 1,
    "name": "Queijo",
    "price": 10,
    "weight": 30,
    "calories": 300,
    "section": "food",
    "expirationDate": "2024-03-06T12:12:32.431Z"
}
```

#### Falha:

-   Caso seja enviado um id inexistente no banco, não deverá ser possível listar o produto. Deverá ser retornado um objeto contendo a seguinte chave:
    -   **error**:
        -   Tipo: string;
        -   Deve ser uma mensagem informando que o produto não foi encontrado.

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: `/products/242123` informando um id inexistente.
| Resposta do servidor: |
|-|
|**Status code:** **_404 NOT FOUND._**|

```json
{
    "error": "Product not found"
}
```

### **PATCH /products/:id**

-   Deve ser possível atualizar os dados de um produto de forma opcional.
-   Não deve ser possível atualizar os valores de **_id_**, **_expirationDate_** e **_section_**.
    -   **Esses dados não devem ser enviados**

#### Sucesso:

## Exemplos de envio da requisição

| **Corpo de envio da requisição:** |
| --------------------------------- |
| **Formato Json**                  |

```json
{
    "name": "Presunto defumado",
    "price": 100,
    "weight": 30,
    "calories": 300
}
```

| **Resposta do servidor:**      |
| ------------------------------ |
| **Formato Json**               |
| **Status code:** **_200 OK._** |

```json
{
    "id": 2,
    "name": "Presunto defumado",
    "price": 100,
    "weight": 30,
    "calories": 300,
    "section": "food",
    "expirationDate": "2024-03-06T12:12:32.431Z"
}
```

#### Falha:

-   Caso seja enviado um id inexistente no banco, não deverá ser possível atualizar o produto. Deverá ser retornado um objeto contendo a seguinte chave:
    -   **error**:
        -   Tipo: string;
        -   Deve ser uma mensagem informando que o produto não foi encontrado.

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: `/products/242123` informando um id inexistente.
| Resposta do servidor: |
|-|
|**Status code:** **_404 NOT FOUND._**|

```json
{
    "error": "Product not found"
}
```

### **DELETE /products/:id**

-   Deve ser possível deletar um produto informando o seu **_id_**.

#### Sucesso:

-   Não deve ser retornada nenhuma mensagem, apenas o status code **_204 NO CONTENT._**

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: `/products/1`.
| Resposta do servidor: |
|-|
|**Status code:** **_204 NO CONTENT._**|

#### Falha:

-   Caso seja enviado um id inexistente no banco, não deverá ser possível deletar o produto. Deverá ser retornado um objeto contendo a seguinte chave:
    -   **error**:
        -   Tipo: string;
        -   Deve ser uma mensagem informando que o produto não foi encontrado.

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: `/products/242123` informando um id inexistente.
| Resposta do servidor: |
|-|
|**Status code:** **_404 NOT FOUND._**|

```json
{
    "error": "Product not found"
}
```

**Não** altere nenhum dado do readme.

repository uid: ee984c7a-2a5f-4375-baef-e8c39fece34b
