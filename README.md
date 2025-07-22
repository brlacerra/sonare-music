This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Algoritmos do Módulo 1

<ul>
    <li><a href="https://github.com/brlacerra/sonare-music/blob/master/lib/algoritmos/buscaBinaria.ts">Busca Binária</a></li>
    <li><a href="https://github.com/brlacerra/sonare-music/blob/master/lib/algoritmos/buscaSequencial.ts">Busca Sequencial</a></li>
    <li><a href="https://github.com/brlacerra/sonare-music/blob/master/lib/algoritmos/hashing.ts">Hashing</a></li>
    <li><a href="https://github.com/brlacerra/sonare-music/blob/master/lib/algoritmos/huffmanCompress.ts">Compressão Huffman</a></li>
    <li><a href="https://github.com/brlacerra/sonare-music/blob/master/lib/algoritmos/rabinKarp.ts">Rabin Karp</a></li>
</ul>

<p>Sem o BD, as API's e os algoritmos não vão funcionar, mas acredite, eles funcionam :)</p>
<p>Os algoritmos foram implementados em uma lista fictícia de usuários, criada com MySQL + Prisma</p>

# Algoritmos do Módulo 2

<ul>
    <li><a href="https://github.com/brlacerra/sonare-music/blob/master/lib/algoritmos/buscaBinaria.ts">
    Hashing com enlaçamento deslocado e multiplicação</a></li>
</ul>

### Complexidade (Big O)

```bash
Melhor caso:
# 0(1) (Inserção/Busca direta sem colisões)
Pior caso:
# O(1 + α) α = fator de carga (elementos/tamanho da tabela)
Processamento inicial:
# O(m) para carregar `m` usuários do banco de dados
# Operação única ao iniciar o sistema
Taxa de Colisão observada
# TAMANHO_TABELA 31 (>35% - 7 colisões em 20 insercões)
# TAMANHO_TABELA 61 (20% - 4 colisões em 20 inserções)
```

<p>O algoritmo não é a definição perfeita de "enlaçamento deslocado" pois esse tipo é mais usado em
estrutura de dados encadeada (de preferencia circular), como peguei os dados de uma tabela sql
a única diferença é que ao invés de referenciar o ponteiro para ->prox usei MOD para percorrer a lista, 
e com uma lista encadeada existiria uma função para calcular seu tamanho.</p>
 
<p>Os arquivos do módulo 1 estão com a data alterada, apenas mudei eles de diretório, não foram alterados.</p>